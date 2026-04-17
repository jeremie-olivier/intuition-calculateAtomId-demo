import { calculateAtomId, calculateTripleId } from '@0xintuition/sdk'

async function testCalculateAtomId() {
  console.log('🧪 Testing calculateAtomId using Intuition SDK')
  console.log('📦 Package: @0xintuition/sdk v2.0.2')
  console.log('🎯 Function: calculateAtomId (direct import)')
  console.log()

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
    },
    {
      name: 'Custom Label',
      data: 'TypeScript Developer'
    },
    {
      name: 'URL',
      data: 'https://github.com/0xintuition/intuition-ts'
    },
    {
      name: 'Email',
      data: 'alice@example.com'
    }
  ]

  console.log('🔍 Testing calculateAtomId with different inputs:\n')

  for (const testCase of testCases) {
    try {
      // Use SDK's calculateAtomId function directly
      const atomId = await calculateAtomId(testCase.data)

      console.log(`📋 ${testCase.name}:`)
      console.log(`   Input: "${testCase.data}"`)
      console.log(`   ID:    ${atomId}`)
      console.log()
    } catch (error) {
      console.error(`❌ Error calculating atom ID for "${testCase.data}":`, error)
      console.log()
    }
  }

  // Test deterministic behavior
  console.log('🔄 Testing deterministic behavior (same input should give same ID):')
  const testData = 'test-atom-consistency'

  try {
    const id1 = await calculateAtomId(testData)
    const id2 = await calculateAtomId(testData)

    console.log(`Input: "${testData}"`)
    console.log(`First call:  ${id1}`)
    console.log(`Second call: ${id2}`)
    console.log(`Match: ${id1 === id2 ? '✅' : '❌'}`)
    console.log()
  } catch (error) {
    console.error('❌ Error testing deterministic behavior:', error)
    console.log()
  }

  // Test with various atom data types
  console.log('🛠️  Testing additional atom types:')

  const additionalTests = [
    { name: 'Numeric String', data: '12345' },
    { name: 'Special Characters', data: 'hello@world#2024' },
    { name: 'Unicode', data: '🚀 Space Mission' },
    { name: 'JSON-like', data: '{"type": "concept", "value": "test"}' }
  ]

  for (const test of additionalTests) {
    try {
      const atomId = await calculateAtomId(test.data)
      console.log(`✅ ${test.name}: "${test.data}" → ${atomId.slice(0, 10)}...`)
    } catch (error) {
      console.error(`❌ ${test.name}: Error with "${test.data}"`)
    }
  }

  console.log()

  // Bonus: Test calculateTripleId if available
  console.log('🔗 Testing calculateTripleId (bonus):')
  try {
    // Create some test atoms first
    const subjectId = await calculateAtomId('Alice')
    const predicateId = await calculateAtomId('trusts')
    const objectId = await calculateAtomId('Bob')

    const tripleId = await calculateTripleId(subjectId, predicateId, objectId)

    console.log(`Subject: "Alice" → ${subjectId}`)
    console.log(`Predicate: "trusts" → ${predicateId}`)
    console.log(`Object: "Bob" → ${objectId}`)
    console.log(`Triple: (Alice, trusts, Bob) → ${tripleId}`)
  } catch (error) {
    console.error('❌ Error testing calculateTripleId:', error)
  }
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