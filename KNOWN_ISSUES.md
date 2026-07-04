# Known Issues

## package.json Trailing Comma (recurring)

**Symptom:** `npm error EJSONPARSE Expected double-quoted property name in JSON`  
**Cause:** JSON does not allow trailing commas. When removing a dependency or script entry that is the last item in a block, the comma on the previous line must also be removed.  
**When it happens:** Any time a line is deleted from `package.json` scripts or dependencies without checking the line above it.  
**Fix:** Open `package.json`, find the last entry in the affected block, remove the trailing comma.  
**Prevention:** Always rewrite the full block cleanly when removing entries rather than deleting a single line.

---

## Codemagic: PR builds never trigger even though `triggering:` is set (recurring, high-impact)

**Symptom:** Pushing to a PR branch runs GitHub Actions but no Codemagic build ever starts. The webhook shows a green `ping`, pushes to `main` build fine, but PRs never do.
**Cause:** In `codemagic.yaml`, `branch_patterns` **default to matching a pull request's *source* (head) branch**. A bare `pattern: main` therefore only matches PRs *originating from* a branch literally named `main` — which never happens. The PR's target being `main` is irrelevant unless you say so.
**When it happens:** Any workflow that should build on `pull_request` into `main` but omits `source` on the pattern.
**Fix:** Add `source: false` to the pattern so it matches the PR **target** branch:
```yaml
branch_patterns:
  - pattern: main
    include: true
    source: false   # match the PR TARGET (main), not the source branch
```
Push events still match the pushed branch against the same pattern, so pushes to `main` continue to build.
**Prevention:** Whenever a workflow lists `pull_request`, always set `source: false` (target match) or `source: true` (source match) explicitly — never rely on the default.

---

## Codemagic: `triggering:` in yaml does nothing without a webhook (recurring)

**Symptom:** `codemagic.yaml` has a correct `triggering:` block but no build ever fires automatically on push or PR. Editing the yaml changes nothing.
**Cause:** The `triggering:` rules are only *filters* applied to events GitHub delivers. If no GitHub webhook points at the app's Codemagic hook URL — or the webhook exists but isn't subscribed to the right events — Codemagic never receives anything to filter, so nothing builds. A common variant: the auto-created webhook is subscribed to **Pushes only**, which makes `main` builds work while PR builds silently never fire.
**When it happens:** Repo connected to Codemagic without the GitHub App, or webhook created without the **Pull requests** event.
**Fix:** In Codemagic, open the app → right sidebar → **Create webhook** to get the hook URL (`https://api.codemagic.io/hooks/<id>`). In GitHub → **Settings → Webhooks**, ensure a webhook to that URL exists with **Content type `application/json`** and both **Pushes** and **Pull requests** events checked. Verify under **Recent Deliveries** that events return **200**.
**Prevention:** Treat "yaml triggering + GitHub webhook (push + PR, application/json)" as two halves of one setup — neither works alone. No repo code change can fix a missing/misconfigured webhook.

---

## Codemagic: iOS build number always resets to 1 → "Redundant Binary Upload" (recurring)

**Symptom:** Upload fails with `90189 Redundant Binary Upload. You've already uploaded a build with build number '1' for version '1.0.0'.`
**Cause:** The CI regenerates the native iOS project every run via `npx cap add ios`, so `CFBundleVersion` resets to `1` each build. App Store Connect rejects any re-upload of a version+build pair it has already seen.
**When it happens:** Every Capacitor build after the first successful upload, because the iOS project is not committed (it's gitignored) and is recreated fresh.
**Fix:** Before building the IPA, fetch the last-used build number and increment it:
```yaml
- name: Set build number
  script: |
    APP_APPLE_ID=$(app-store-connect apps list --bundle-id-identifier "$BUNDLE_ID" --json | jq -r '.[0].id')
    LATEST_BUILD_NUMBER=$(app-store-connect get-latest-build-number "$APP_APPLE_ID" --platform IOS --all-versions)
    cd ios/App
    agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
```
**Prevention:** Any workflow that publishes to TestFlight must run this step; `get-latest-build-number` takes the numeric Apple ID, which `apps list --bundle-id-identifier` derives from the bundle ID.

---

## Codemagic: TestFlight submission fails "Build is missing export compliance" (recurring)

**Symptom:** The IPA uploads and processes, but the TestFlight beta-review submission fails with `422: The build is missing export compliance.`
**Cause:** The generated `Info.plist` lacks `ITSAppUsesNonExemptEncryption`. Because `npx cap add ios` regenerates the project each build, a committed plist value would be wiped anyway.
**When it happens:** Every Capacitor build, once uploads otherwise succeed.
**Fix:** After `npx cap sync ios`, inject the key (apps using only standard HTTPS/TLS are exempt):
```yaml
- name: Set export compliance
  script: |
    plutil -replace ITSAppUsesNonExemptEncryption -bool false ios/App/App/Info.plist
```
**Prevention:** Keep this step in every workflow that publishes; if the app ever adds non-exempt encryption, this declaration must change to `true` and you'll need to file self-classification reports.

---

## Codemagic: 403 "PLA Update available" when fetching signing files (account-level, not code)

**Symptom:** `Fetch signing files` fails: `403 ... PLA Update available - You currently don't have access to this membership resource. ... your team's Account Holder must agree to the latest Program License Agreement.`
**Cause:** Apple periodically updates the Program License Agreement. Until the **Account Holder** accepts it, **all** App Store Connect API access for the team is blocked — every repo/CI using that Apple account fails identically.
**When it happens:** After Apple publishes a new agreement; unrelated to any code or CI change.
**Fix:** The Account Holder signs in at [developer.apple.com/account](https://developer.apple.com/account), accepts the updated agreement (usually shown on login or under *Agreements, Tax, and Banking*), then re-run the build. **No code fix exists** — this is purely an Apple-account action.
**Prevention:** None from the codebase side; if multiple repos on the same Apple team fail signing at once with a 403, suspect a pending PLA before touching CI config.
