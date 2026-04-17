# Intuition SDK calculateAtomId Demo

A simple TypeScript script demonstrating the `calculateAtomId` function from the official [Intuition SDK](https://www.npmjs.com/package/@0xintuition/sdk).

## Setup

```bash
npm install
```

## Run

```bash
npm test
```

## What it does

This demo uses the **official Intuition SDK** to test the `calculateAtomId` function with various input types:

- **IPFS URIs** - For rich metadata atoms (most common)
- **CAIP-10 addresses** - For blockchain addresses  
- **Text concepts** - Simple string-based atoms
- **Predicates** - Relationship labels
- **User handles** - Social identifiers
- **Custom labels** - Any arbitrary concept

## Key Features

✅ **Uses Official SDK**: Leverages `@0xintuition/sdk` package  
✅ **Simple API**: Just call `sdk.calculateAtomId(data)`  
✅ **Deterministic**: Same input always produces same ID  
✅ **Network Support**: Works with both mainnet and testnet  
✅ **Type Safety**: Full TypeScript support  

## SDK Usage

```typescript
import { calculateAtomId } from '@0xintuition/sdk'
import { stringToHex } from 'viem'

// calculateAtomId expects hex-encoded bytes, not plain strings
const atomId = await calculateAtomId(stringToHex('your-concept-here'))
console.log(atomId) // 0x...

// Convert strings to hex first:
await calculateAtomId(stringToHex('ipfs://bafybeigdyrzt...'))    // IPFS URI
await calculateAtomId(stringToHex('caip10:eip155:1:0x1234...')) // CAIP-10 address
await calculateAtomId(stringToHex('Alice'))                      // Simple text
await calculateAtomId(stringToHex('https://example.com'))       // URL
await calculateAtomId(stringToHex('@username'))                  // Handle
```

## Networks

The script defaults to **testnet**. To use mainnet, change the network in the script:

```typescript
const sdk = new IntuitionSDK({
  network: 'mainnet'
})
```

## Learn More

- [Intuition SDK on npm](https://www.npmjs.com/package/@0xintuition/sdk)
- [Intuition Protocol Documentation](https://docs.intuition.systems)
- [GitHub Repository](https://github.com/0xIntuition/intuition-ts)