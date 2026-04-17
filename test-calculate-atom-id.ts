import { createPublicClient, http, parseAbi, stringToHex } from 'viem'
import { defineChain } from 'viem'

// Define Intuition networks
const intuitionMainnet = defineChain({
  id: 1155,
  name: 'Intuition',
  nativeCurrency: { decimals: 18, name: 'Intuition', symbol: 'TRUST' },
  rpcUrls: { default: { http: ['https://rpc.intuition.systems/http'] } },
  blockExplorers: {
    default: { name: 'Intuition Explorer', url: 'https://explorer.intuition.systems' }
  },
})

const intuitionTestnet = defineChain({
  id: 13579,
  name: 'Intuition Testnet',
  nativeCurrency: { decimals: 18, name: 'Test Trust', symbol: 'tTRUST' },
  rpcUrls: { default: { http: ['https://testnet.rpc.intuition.systems/http'] } },
  blockExplorers: {
    default: { name: 'Intuition Testnet Explorer', url: 'https://testnet.explorer.intuition.systems' }
  },
})

// MultiVault contract addresses
const MULTIVAULT_MAINNET = '0x6E35cF57A41fA15eA0EaE9C33e751b01A784Fe7e'
const MULTIVAULT_TESTNET = '0x2Ece8D4dEdcB9918A398528f3fa4688b1d2CAB91'

// ABI for calculateAtomId function
const abi = parseAbi([
  'function calculateAtomId(bytes data) pure returns (bytes32)',
])

async function testCalculateAtomId() {
  // Choose network (change to intuitionMainnet if desired)
  const chain = intuitionTestnet
  const multivaultAddress = MULTIVAULT_TESTNET

  console.log(`🧪 Testing calculateAtomId on ${chain.name}`)
  console.log(`📍 MultiVault: ${multivaultAddress}`)
  console.log()

  // Create client
  const client = createPublicClient({
    chain,
    transport: http(),
  })

  // Test cases
  const testCases = [
    {
      name: 'IPFS URI',
      data: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'
    },
    {
      name: 'Ethereum Address (CAIP-10)',
      data: 'caip10:eip155:1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
    },
    {
      name: 'Simple Text Concept',
      data: 'AI Agent Framework'
    },
    {
      name: 'Predicate',
      data: 'implements'
    },
    {
      name: 'User Handle',
      data: '@alice'
    }
  ]

  console.log('🔍 Testing calculateAtomId with different inputs:\n')

  for (const testCase of testCases) {
    try {
      // Convert string to hex bytes
      const atomData = stringToHex(testCase.data)

      // Call calculateAtomId
      const atomId = await client.readContract({
        address: multivaultAddress as `0x${string}`,
        abi,
        functionName: 'calculateAtomId',
        args: [atomData],
      })

      console.log(`📋 ${testCase.name}:`)
      console.log(`   Input: "${testCase.data}"`)
      console.log(`   Hex:   ${atomData}`)
      console.log(`   ID:    ${atomId}`)
      console.log()
    } catch (error) {
      console.error(`❌ Error calculating atom ID for "${testCase.data}":`, error)
      console.log()
    }
  }

  // Test duplicate calculation
  console.log('🔄 Testing deterministic behavior (same input should give same ID):')
  const sameData = stringToHex('test-atom')

  const id1 = await client.readContract({
    address: multivaultAddress as `0x${string}`,
    abi,
    functionName: 'calculateAtomId',
    args: [sameData],
  })

  const id2 = await client.readContract({
    address: multivaultAddress as `0x${string}`,
    abi,
    functionName: 'calculateAtomId',
    args: [sameData],
  })

  console.log(`First call:  ${id1}`)
  console.log(`Second call: ${id2}`)
  console.log(`Match: ${id1 === id2 ? '✅' : '❌'}`)
}

// Run the test
testCalculateAtomId()
  .then(() => {
    console.log('\n✨ Test completed!')
  })
  .catch((error) => {
    console.error('💥 Test failed:', error)
    process.exit(1)
  })