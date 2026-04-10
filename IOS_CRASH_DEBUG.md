# iOS Production Crash — Debug One Pager

**App:** Opening Playbook (`com.killaskt.openingplaybook`)  
**Stack:** Expo 55, React Native 0.83.2, EAS Build, iOS production/preview profiles  
**Distribution:** TestFlight  
**Device:** iPhone 16 Pro Max, iOS 26.1 (23885), ARM-64 Native  

---

## The Problem

The app crashes immediately on launch — white/black flash then closes to home screen. **Production and preview builds only.** Development builds work fine. **This has never worked in production** — not a regression, a first-time setup issue.

---

## Confirmed Crash Details (from Xcode Organizer)

**Crash type:** `NO_CRASH_STACK` / `facebook::react::RCTNativeModule::invoke`

**Exception Backtrace (both crashes point to the same location):**
```
facebook::react::RCTNativeModule::invoke(unsigned int, folly::dynamic&&, int)::$_0::operator()() const
```

Both Thread 6 and Thread 9 show the crash originating in:
- `ObjCTurboModule::performVoidMethodInvocation`
- `facebook::react::RCTNativeModule::invoke`
- `objc_exception_rethrow`

**Two separate crash reports:**
- `OpeningPlaybook 3 (1.0.0)` — Thread 6, `$_0::operator()() const + 56`
- `OpeningPlaybook 2 (1.0.0)` — Thread 9, `NO_CRASH_STACK`, 1 device (100%)

---

## Key Difference: Dev vs Production

- **Dev** uses `expo-dev-client` — a native shell that loads JS over the network, defers/skips some native module initialization
- **Production** is fully bundled — all native modules initialize at startup synchronously
- The crash is **runtime, before JS loads** — not a build-time issue

---

## Critical Finding

The crash is happening inside `ObjCTurboModule::performVoidMethodInvocation` — the exact method the `patches/react-native+0.83.2.patch` targets. The patch swallows exceptions for **async** void calls (logs instead of rethrowing), but still rethrows for **sync** calls (`shouldVoidMethodsExecuteSync_ = true`).

The crash is still occurring, which means the offending native module is invoking synchronously — the patch doesn't cover this path and never did.

---

## Troubleshooting Log

| # | Action | Outcome |
|---|---|---|
| 1 | Suspected signing issue (tip from Xcode dev) | Checked EAS credentials — Distribution cert and App Store provisioning profile both valid until 2027. Not the issue. |
| 2 | Confirmed crash type | White/black flash then closes = native crash before JS loads. Not a JS error. |
| 3 | Compared dev vs production credentials | Dev uses Ad Hoc profile, production uses App Store profile. Both present and valid. |
| 4 | Reviewed commit history | `eas.json` and EAS project ID were first added in commit `1954c7b` (Mar 24). Production has never worked. Not a regression. |
| 5 | Identified turbomodule patch | Commit `5a5dd01` added `patches/react-native+0.83.2.patch` — a patch to suppress NSExceptions in `ObjCTurboModule::performVoidMethodInvocation`. This is the exact crash site from Xcode. |
| 6 | Read Xcode crash screenshots | Confirmed crash stack: `ObjCTurboModule::performVoidMethodInvocation` → `objc_exception_rethrow`. Two reports, same location. |
| 7 | Audited native modules | Only two high-suspect native modules: `@sentry/react-native` and `react-native-google-mobile-ads` |
| 8 | Removed Sentry | Removed from `metro.config.js`, `package.json`, `eas.json`. **Not yet committed or rebuilt.** |
| 9 | Clarified AdMob timing | AdMob was added after the crash started — not the root cause, but placeholder iOS App ID still needs fixing for App Store submission |

---

## Suspects

| Suspect | Reasoning | Status |
|---|---|---|
| **Native module calling synchronously** | Patch only covers async void calls. Sync calls still rethrow. The crashing module is invoking on the sync path — patch never fixed this. | **Root cause path — need to identify which module** |
| **Sentry** | Hooks into Metro and native layer. Missing DSN env var in production could cause a native throw at startup. | **Removed — needs rebuild to test** |
| **AdMob placeholder iOS ID** | `ca-app-pub-XXXXXXXXXX~XXXXXXXXXX` — invalid ID could cause native AdMob init to throw. | **Still present — next to test after Sentry** |

---

## Current Hypothesis

A native module is calling a void TurboModule method synchronously at startup, triggering an NSException inside `performVoidMethodInvocation` which rethrows and kills the app before JS loads. The turbomodule patch was the first attempt to fix this but is either not applying in EAS builds or not covering the sync execution path (`shouldVoidMethodsExecuteSync_ = true`).

Dev builds don't crash because `expo-dev-client` defers or skips certain native module initialization.

---

## Next Steps (in order)

1. **Commit Sentry removal** and do a clean production build — verify if this resolves the crash
2. **Check EAS build logs** for `postinstall` / `patch-package` output — confirm the turbomodule patch is actually being applied
3. If crash persists — **remove AdMob plugin** entirely and rebuild to isolate
4. Set up **Firebase Crashlytics** for ongoing native crash visibility with stack traces
5. Fix **AdMob iOS App ID** regardless — required for App Store submission
