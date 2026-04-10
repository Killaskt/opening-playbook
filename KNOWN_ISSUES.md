# Known Issues

## package.json Trailing Comma (recurring)

**Symptom:** `npm error EJSONPARSE Expected double-quoted property name in JSON`  
**Cause:** JSON does not allow trailing commas. When removing a dependency or script entry that is the last item in a block, the comma on the previous line must also be removed.  
**When it happens:** Any time a line is deleted from `package.json` scripts or dependencies without checking the line above it.  
**Fix:** Open `package.json`, find the last entry in the affected block, remove the trailing comma.  
**Prevention:** Always rewrite the full block cleanly when removing entries rather than deleting a single line.
