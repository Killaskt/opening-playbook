# Codemagic + App Store Connect Setup Guide

> Complete, repeatable runbook. Do these steps once per new app. After setup, CI/CD is fully automated.

---

## Overview of what you're setting up

```
GitHub PR / push to main
    ├→ GitHub Actions "validate" (typecheck + build + web tests)   ← fast web check
    └→ GitHub webhook  →  Codemagic  (triggered by push + pull_request events)
            → Codemagic builds signed IPA (auto-increments build number)
                → submits to TestFlight
```

Two independent lanes: GitHub Actions validates the **web** side on every PR; the
GitHub **webhook** drives Codemagic to build and publish the **iOS** side. They do
not call each other — Codemagic is triggered by the webhook, not by GitHub Actions.

> **The single most important gotcha:** the `triggering:` block in `codemagic.yaml`
> only *filters* events GitHub sends. Without a GitHub webhook subscribed to **both**
> Pushes and Pull requests, nothing builds automatically — see
> [Build triggering](#build-triggering-webhook--branch-patterns) below and
> `KNOWN_ISSUES.md`.

---

## Step 1: Apple Developer Account

### 1a. Register a Bundle ID
1. Go to [developer.apple.com](https://developer.apple.com) → **Certificates, Identifiers & Profiles** → **Identifiers**
2. Click **+** → **App IDs** → **App**
3. Set **Bundle ID** to explicit (not wildcard): e.g. `com.habbitos.app`
4. Enable any capabilities needed (Push Notifications, etc.)
5. Click **Register**

### 1b. Create App Store Connect App Record
1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → **My Apps** → **+** → **New App**
2. Platform: **iOS**
3. Bundle ID: select the one you just registered
4. Fill in name, SKU, language
5. Click **Create**

### 1c. Create an App Store Connect API Key
1. Go to [appstoreconnect.apple.com/access/integrations/api](https://appstoreconnect.apple.com/access/integrations/api)
2. Click **+** → set name (e.g. `Codemagic`), role: **Admin**
3. Download the `.p8` file — **you can only download it once**
4. Note the **Key ID** (shown in the key list, e.g. `ABC123XYZ`)
5. Note the **Issuer ID** (shown at the top of the API Keys page)

### 1d. Generate a Certificate Private Key (one-time, save permanently)
This is an RSA key used to create a CSR when Codemagic fetches signing files. Nothing to do with your Apple account directly.

```bash
openssl genrsa 2048 > certificate_private_key.pem
```

**Store this in 1Password / your password manager now.** If you lose it, your distribution certificate becomes unusable — you'll need to revoke it and redo this step.

Add to `.gitignore`:
```
certificate_private_key.pem
```

---

## Step 2: Codemagic Account Setup

### 2a. Create account & connect GitHub
1. Go to [codemagic.io](https://codemagic.io) → **Sign up with GitHub**
2. Authorize the GitHub OAuth app — grant access to your repos

### 2b. Add your app
1. Click **Add application** → **GitHub**
2. Select **habbitOS** repo
3. Select **Flutter/React Native/Other** framework → choose **Other** (YAML-based)
4. Codemagic will detect `codemagic.yaml` automatically

### 2c. Get your App ID
From the Codemagic app URL after adding:
```
https://codemagic.io/app/XXXXXXXXXXXXXXXXXXXXXXXX/builds
                         ^^^^^^^^^^^^^^^^^^^^^^^^
                         this is your CODEMAGIC_APP_ID
```

### 2d. Get your API Token
1. Click avatar (top-right) → **User settings**
2. Scroll to **Integrations** → **Codemagic API**
3. Click **Show** (or **Generate** if none exists) — copy the token

---

## Step 3: Codemagic Variable Group

All secrets live in a named variable group referenced by `codemagic.yaml`.

1. In Codemagic, go to your app → **Environment variables** (or team-level: avatar → **Teams** → your team → **Global variables**)
2. Create a group named **`ShazamApps`** (matches the name in `codemagic.yaml`)
3. Add these variables (all marked **Secure**):

| Variable name | Value | Where to get it |
|---|---|---|
| `APP_STORE_CONNECT_KEY_IDENTIFIER` | `ABC123XYZ` | App Store Connect API key → Key ID |
| `APP_STORE_CONNECT_PRIVATE_KEY` | Full contents of the `.p8` file (including `-----BEGIN PRIVATE KEY-----` header/footer) | The downloaded `.p8` file |
| `APP_STORE_CONNECT_ISSUER_ID` | UUID | Top of App Store Connect API Keys page |
| `CERTIFICATE_PRIVATE_KEY` | Full contents of `certificate_private_key.pem` | The file you generated in Step 1d |

> **Variable name is exact** — `codemagic-cli-tools` reads `APP_STORE_CONNECT_KEY_IDENTIFIER` (not `KEY_ID`). Wrong name = silent failure.

---

## Step 4: GitHub Secrets

These let GitHub Actions call the Codemagic API.

1. Go to **GitHub repo → Settings → Secrets and variables → Actions**
2. Add two secrets:

| Secret name | Value |
|---|---|
| `CODEMAGIC_API_TOKEN` | The token from Step 2d |
| `CODEMAGIC_APP_ID` | The app ID from Step 2c |

---

## Build triggering (webhook + branch patterns)

Codemagic builds are driven by a **GitHub webhook**, not by GitHub Actions. This is
the part that most often silently fails to work, so set it up deliberately.

### 5a. Create the webhook

1. In Codemagic, open the app → **right sidebar → Create webhook**. Copy the URL,
   which looks like `https://api.codemagic.io/hooks/<id>`.
2. In GitHub → **repo Settings → Webhooks → Add webhook**:
   - **Payload URL:** the Codemagic hook URL (exact)
   - **Content type:** `application/json`  ← **not** the default `x-www-form-urlencoded`
   - **SSL verification:** Enabled
   - **Events:** *Let me select individual events* → check **Pushes** and **Pull requests** (only these two)
   - **Active:** checked
3. Save, then open **Recent Deliveries** and confirm the `ping` returns **200**.

> If the app was connected via the Codemagic **GitHub App**, this webhook is created
> automatically — but verify it's subscribed to **Pull requests**, not just Pushes.
> A push-only webhook is why `main` builds while PRs never do.

### 5b. Match the right branch in `codemagic.yaml`

`branch_patterns` **default to matching a pull request's source (head) branch**, so a
bare `pattern: main` never matches a PR *into* main. Always set `source` explicitly:

```yaml
triggering:
  events:
    - push
    - pull_request
  branch_patterns:
    - pattern: main
      include: true
      source: false   # match the PR TARGET (main), not the source branch
```

- **push** to `main` → matches (merge builds).
- **pull_request** into `main` from any feature branch → matches because `source: false`.

### 5c. Verify the full pipeline

1. Open or push to a PR targeting `main`.
2. GitHub Actions runs `validate` (typecheck + build + web tests).
3. The webhook fires a `pull_request` delivery → **Codemagic → Builds** shows a new
   build for the feature branch → IPA published to TestFlight for on-device testing.
4. On merge, the `push` to `main` fires again → a fresh TestFlight build of merged code.

If GitHub Actions runs but no Codemagic build appears, the problem is the webhook or the
branch pattern — see the troubleshooting table and `KNOWN_ISSUES.md`.

---

## Checklist (before first build)

- [ ] Bundle ID registered at developer.apple.com (explicit, not wildcard)
- [ ] App record created in App Store Connect with matching Bundle ID
- [ ] App Store Connect API key created with **Admin** role — `.p8` file downloaded
- [ ] `certificate_private_key.pem` generated and saved to password manager
- [ ] `certificate_private_key.pem` in `.gitignore`
- [ ] Codemagic account created and GitHub repo connected
- [ ] Codemagic **`ShazamApps`** variable group created with all 4 vars
- [ ] GitHub secrets `CODEMAGIC_API_TOKEN` and `CODEMAGIC_APP_ID` added
- [ ] `codemagic.yaml` references group name (`ShazamApps`) under `environment.groups`
- [ ] PR opened → GitHub Actions check runs → Codemagic build fires

---

## Troubleshooting quick reference

| Symptom | Cause | Fix |
|---|---|---|
| `curl` exits 22, empty `x-auth-token` header | `CODEMAGIC_API_TOKEN` secret missing or fork PR | Add secret to GitHub repo; fork PRs are skip-guarded |
| Codemagic build never starts after merge | Webhook not wired | GH Actions uses API-driven trigger in `deploy.yml` — no webhook needed |
| `Cannot save Signing Certificates without certificate private key` | `CERTIFICATE_PRIVATE_KEY` missing from variable group | Add key contents from Step 1d |
| `Missing value KEY_IDENTIFIER` | Variable named `APP_STORE_CONNECT_KEY_ID` instead of `APP_STORE_CONNECT_KEY_IDENTIFIER` | Rename in Codemagic variable group |
| `No matching profiles found` | `ios_signing` declarative block used without OAuth integration | Use script-based signing (already done in `codemagic.yaml`) |
| TestFlight never receives build | `submit_to_testflight: true` missing in publishing block | Add to `codemagic.yaml` publishing section |
