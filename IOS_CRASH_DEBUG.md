# iOS Production Crash — Debug One Pager

**App:** Opening Playbook (`com.killaskt.openingplaybook`)  
**Stack:** Expo 55, React Native 0.83.2, EAS Build, iOS production/preview profiles  
**Distribution:** TestFlight / EAS Preview  
**Device:** iPhone 16 Pro Max, **iOS 26.1 (23B85)**, ARM-64 Native  

---

## The Problem

The app crashes immediately on launch — white/black flash then closes to home screen. **Production and preview builds only.** Development builds work fine. **This has never worked** — not a regression.

---

## Confirmed Crash Details (from crash JSON + Xcode Organizer)

**Exception:** `EXC_CRASH (SIGABRT)` — `abort() called`  
**Faulting thread:** `com.meta.react.turbomodulemanager.queue`

**Full crash stack:**
```
__pthread_kill
pthread_kill
abort()
__abort_message
demangling_terminate_handler()       ← unhandled C++ exception
_objc_terminate()
std::__terminate
__cxa_rethrow
objc_exception_rethrow
ObjCTurboModule::performVoidMethodInvocation   ← CRASH SITE
_dispatch_workloop_worker_thread
```

**Other threads at crash time:**
- `com.facebook.react.runtime.JavaScript` — alive, waiting on RunLoop (Hermes loaded)
- `hades` — Hermes GC thread alive
- `com.apple.main-thread` — alive

---

## Critical Correction

**JS IS loading.** Hermes is running, the JS thread exists. The crash is NOT before JS loads — it happens during JS initialization, when JS calls into a native TurboModule via a background dispatch queue. Something the JS renders or initializes immediately is calling a native method that throws an NSException.

---

## Troubleshooting Log

| # | Action | Outcome |
|---|---|---|
| 1 | Suspected signing issue | EAS credentials valid until 2027. Not the issue. |
| 2 | Confirmed crash type | ObjCTurboModule crash, faulting thread is turbomodulemanager queue |
| 3 | Reviewed commit history | Never worked — not a regression. First EAS config added Mar 24. |
| 4 | Removed turbomodule patch | Patch only covered async void calls, crash is on sync path. Removed. |
| 5 | Read Xcode crash screenshots | Confirmed stack: `performVoidMethodInvocation` → `objc_exception_rethrow` |
| 6 | Analyzed phone crash JSON | JS IS loading (Hermes thread alive). Crash happens during JS init calling native. |
| 7 | Removed Sentry | Removed from all config files and rebuilt. |
| 8 | Removed AdMob entirely | **Still crashes. AdMob is ruled out.** |

---

## Ruled Out

| Suspect | Why Ruled Out |
|---|---|
| Signing / provisioning | Credentials valid, builds succeed |
| AdMob | Removed entirely — crash persists unchanged |
| Sentry | Removed — crash predates Sentry being added |
| Turbomodule patch | Was never fixing this — patch covered async path, crash is sync |

---

## Ruled Out (Updated)

| Suspect | Why Ruled Out |
|---|---|
| iOS 26 incompatibility | Crashes identically on iOS 17.7.1 (stable release). Not an OS issue. |

---

## Active Suspects

| Suspect | Reasoning |
|---|---|
| **`newArchEnabled: false` arch mismatch** | RN 0.83.2 defaults to new architecture. Forcing old arch via `newArchEnabled: false` while the crash is on `com.meta.react.turbomodulemanager.queue` (a new arch component) suggests a mismatch. Some modules may be compiled for new arch but runtime is configured for old. Dev client masks this. |
| **react-native-svg** | Only remaining third-party native module. Could be making a sync TurboModule call that throws. |

---

## Current Hypothesis

**`newArchEnabled: false` is likely causing an architecture mismatch.** RN 0.83.2 has new arch as default and all dependencies are compiled against it. Forcing old arch causes a conflict at the TurboModule layer, throwing an unhandled C++ exception on the turbomodule manager queue.

Dev builds don't crash because `expo-dev-client` uses a different initialization path.

---

## Next Steps (in order)

1. ~~Remove `newArchEnabled: false`~~ — Done, still crashes. Ruled out.
2. ~~Replace `BlurView` with plain `View`~~ — Done, still crashes. expo-blur ruled out.
3. **Replace SVG tab icons with plain text** — `react-native-svg` renders 3 icons at startup via tab bar. TurboModule calls on mount. Building now.
4. If still crashing — check RN 0.83.2 GitHub issues for TurboModule crashes on bundled builds
