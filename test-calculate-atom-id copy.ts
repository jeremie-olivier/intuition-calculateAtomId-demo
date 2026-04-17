import { calculateAtomId, calculateTripleId } from '@0xintuition/sdk'

async function testCalculateAtomId() {
  console.log('🧪 Testing calculateAtomId using Intuition SDK')
  console.log('📦 Package: @0xintuition/sdk v2.0.2')
  console.log('🎯 Function: calculateAtomId (direct import)')
  console.log()

  // Test cases - just raw strings as expected by calculateAtomId
  const testCases = [
    'ipfs://bafkreifqptyn7vjtw3mywn3uyr33kadlpfmxkafw47xsz6i34z5pywjueq',
    'caip10:eip155:1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    'AI Agent Framework',
    'implements',
    '@alice',
    'TypeScript Developer',
    'https://github.com/0xintuition/intuition-ts',
    'alice@example.com'
  ]

  console.log('🔍 Testing calculateAtomId with different inputs:\n')

  for (const atomData of testCases) {
    try {
      // Use SDK's calculateAtomId function directly with raw string
      const atomId = await calculateAtomId(atomData)

      // Determine the type for display
      let type = 'Text'
      if (atomData.startsWith('ipfs://')) type = 'IPFS URI'
      else if (atomData.startsWith('caip10:')) type = 'CAIP-10 Address'
      else if (atomData.startsWith('https://')) type = 'URL'
      else if (atomData.includes('@') && atomData.includes('.')) type = 'Email'
      else if (atomData.startsWith('@')) type = 'Handle'

      console.log(`📋 ${type}:`)
      console.log(`   Input: "${atomData}"`)
      console.log(`   ID:    ${atomId}`)
      console.log()
    } catch (error) {
      console.error(`❌ Error calculating atom ID for "${atomData}":`, error)
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
    '12345',
    'hello@world#2024',
    '🚀 Space Mission',
    '{"type": "concept", "value": "test"}'
  ]

  for (const atomData of additionalTests) {
    try {
      const atomId = await calculateAtomId(atomData)
      let type = 'Text'
      if (/^\d+$/.test(atomData)) type = 'Numeric String'
      else if (atomData.includes('🚀')) type = 'Unicode'
      else if (atomData.includes('#')) type = 'Special Characters'
      else if (atomData.startsWith('{')) type = 'JSON-like'

      console.log(`✅ ${type}: "${atomData}" → ${atomId.slice(0, 10)}...`)
    } catch (error) {
      console.error(`❌ Error with "${atomData}"`)
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