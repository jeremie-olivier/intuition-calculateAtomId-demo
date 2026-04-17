# Test calculateAtomId Function

A simple TypeScript script to test the `calculateAtomId` function from the Intuition Protocol.

## Setup

```bash
npm install
```

## Run

```bash
npm test
```

## What it does

The script tests the `calculateAtomId` function with various input types:

- **IPFS URIs** - For rich metadata atoms (most common)
- **CAIP-10 addresses** - For blockchain addresses  
- **Text concepts** - Simple string-based atoms
- **Predicates** - Relationship labels
- **User handles** - Social identifiers

The function takes arbitrary bytes data and returns a deterministic `bytes32` ID for each atom.

## Key Points

- **Deterministic**: Same input always produces same ID
- **Pure function**: No state changes, can be called off-chain
- **Hex encoding**: String inputs must be converted to hex bytes first
- **Network agnostic**: Function works on both mainnet and testnet

## Networks

The script defaults to **Intuition Testnet** (chain 13579). To use mainnet, change the variables in the script:

```typescript
const chain = intuitionMainnet
const multivaultAddress = MULTIVAULT_MAINNET
```