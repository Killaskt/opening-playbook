# iOS Build Test Results

## Dev Build
**Command:** `eas build --platform ios --profile development`  
**Build ID:**  
**Date:**  

| Test | Result | Notes |
|---|---|---|
| App launches | | |
| Navigation works | | |
| Openings tab | | |
| Learn tab | | |
| Ad banner loads | | |
| Dark mode | | |

**Overall:** Pass   
**Notes:**

EVERYTHING WORKS

---

## Preview Build — Attempt 1 (with AdMob)
**Command:** `eas build --platform ios --profile preview`  
**Build ID:** `cd407123-f1e9-4328-8fa2-384ee716a04f`  
**Commit:** `c334946`  
**Date:** 2026-04-09  

| Test | Result | Notes |
|---|---|---|
| App launches | FAIL | Crashes immediately on open |

**Overall:** Fail  
**Notes:** Same ObjCTurboModule crash. AdMob with placeholder iOS ID present.

---

## Preview Build — Attempt 2 (AdMob removed entirely)
**Command:** `eas build --platform ios --profile preview`  
**Build ID:** `2c04e773-c2f6-4114-9f1e-1724eb1805a5`  
**Commit:** `1237f88`  
**Date:** 2026-04-09  

| Test | Result | Notes |
|---|---|---|
| App launches | FAIL | Same crash, same behavior |

**Overall:** Fail  
**Notes:** Removing AdMob entirely did NOT fix the crash. AdMob is ruled out as root cause. Tested on iOS 17.7.1 (iPhone 15 Pro Max) — same crash. iOS 26 is also ruled out. Crash is fundamental.

---

## Preview Build — Attempt 3 (BlurView replaced with plain View)
**Command:** `eas build --platform ios --profile preview`  
**Build ID:**  
**Commit:** (pending)  
**Date:** 2026-04-10  

| Test | Result | Notes |
|---|---|---|
| App launches | | |
| Navigation works | | |
| Tab bar renders | | |
| Dark mode | | |

**Overall:** Pass / Fail  
**Notes:** Testing hypothesis that `expo-blur` BlurView in LiquidTabBar causes TurboModule crash at startup in light mode. Still crashed — expo-blur ruled out.

---

## Preview Build — Attempt 4 (SVG tab icons replaced with plain text)
**Command:** `eas build --platform ios --profile preview`  
**Build ID:**  
**Commit:** (pending)  
**Date:** 2026-04-10  

| Test | Result | Notes |
|---|---|---|
| App launches | | |
| Navigation works | | |
| Tab bar renders | | |

**Overall:** Pass / Fail  
**Notes:** Testing hypothesis that react-native-svg TurboModule calls from tab bar icons cause crash at startup.

---

## Production Build
**Command:** `eas build --platform ios --profile production`  
**Build ID:**  
**Date:**  

| Test | Result | Notes |
|---|---|---|
| App launches | | |
| Navigation works | | |
| Openings tab | | |
| Learn tab | | |
| Ad banner loads | | |
| Dark mode | | |

**Overall:** Pass / Fail  
**Notes:**
