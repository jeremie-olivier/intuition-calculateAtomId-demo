# Intuition SDK Type Signature Issue Demo

🎯 **Purpose:** Demonstrate that `calculateAtomId` should accept `string | Hex` instead of just `Hex`

This repository provides evidence for a PR to fix the type signature mismatch in the [Intuition SDK](https://www.npmjs.com/package/@0xintuition/sdk).

## The Problem

**Current type signature:**
```typescript
function calculateAtomId(atomData: Hex): string
```

**Runtime behavior:**
```typescript
// Both work identically at runtime:
calculateAtomId('Alice')                    // ✅ Works but TypeScript errors
calculateAtomId(stringToHex('Alice'))      // ✅ Works, TypeScript happy
// → Same result: 0x05bb6d28ed5ca3c5206f33f5818da27b3b0bbf6401cd40f082e8db7fcf481787
```

**The issue:** Types don't match runtime behavior!

## Run the Demo

```bash
npm install
npm test
```

## What This Demo Proves

✅ **Runtime accepts both formats:** String and hex inputs both work  
✅ **Identical results:** Both approaches produce the same atom IDs  
✅ **Internal conversion:** SDK handles string-to-hex conversion automatically  
✅ **Edge cases work:** Unicode, JSON objects, long strings all handled  
❌ **Unnecessary friction:** Current types force verbose `stringToHex()` calls  

## Proposed Solution

**Update the type signature to match runtime behavior:**

```typescript
// Current (restrictive)
function calculateAtomId(atomData: Hex): string

// Proposed (matches reality)  
function calculateAtomId(atomData: string | Hex): string
```

## Developer Experience Impact

**Current (unnecessarily verbose):**
```typescript
calculateAtomId(stringToHex('Alice'))
calculateAtomId(stringToHex('ipfs://bafyrei...'))
calculateAtomId(stringToHex(JSON.stringify(metadata)))
```

**With proposed fix (clean and intuitive):**
```typescript
calculateAtomId('Alice')
calculateAtomId('ipfs://bafyrei...')
calculateAtomId(JSON.stringify(metadata))
calculateAtomId(existingHexData)  // Still works!
```

## Benefits of the Fix

- ✅ **Types match runtime behavior** - No more lying types
- ✅ **Better developer experience** - Less boilerplate
- ✅ **Backward compatible** - Existing hex usage still works  
- ✅ **More approachable** - Lower barrier to entry
- ✅ **Follows web3 best practices** - Like ethers.js and viem patterns

## Algorithm Reference

The `calculateAtomId` function implements:

```typescript
function calculateAtomId(atomData: Hex) {
  const salt = keccak256(toHex('ATOM_SALT'))
  return keccak256(
    encodePacked(['bytes32', 'bytes'], [salt, keccak256(atomData)])
  )
}
```

1. Create salt from `'ATOM_SALT'` string
2. Hash the input atom data  
3. Pack salt + hashed data
4. Hash the packed result = final atom ID

## Files in This Repo

- **`test-calculate-atom-id.ts`** - Main demonstration of the typing issue
- **`test-comparison.ts`** - Side-by-side string vs hex comparison  
- **`test-json-simple.ts`** - JSON object handling demonstration

## Ready for PR

This demo provides comprehensive evidence that the type signature should be updated to `string | Hex` for better developer experience while maintaining full backward compatibility.

## Learn More

- [Intuition SDK on npm](https://www.npmjs.com/package/@0xintuition/sdk)
- [Intuition Protocol Documentation](https://docs.intuition.systems)
- [GitHub Repository](https://github.com/0xIntuition/intuition-ts)