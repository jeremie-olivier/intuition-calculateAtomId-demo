import { calculateAtomId } from '@0xintuition/sdk'
import { stringToHex } from 'viem'

async function testComparison() {
  console.log('🔍 Testing if calculateAtomId handles both string and hex inputs:\n')

  const testStrings = [
    'Alice',
    'ipfs://bafkreifqptyn7vjtw3mywn3uyr33kadlpfmxkafw47xsz6i34z5pywjueq',
    'implements'
  ]

  for (const str of testStrings) {
    console.log(`Testing: "${str}"`)

    try {
      // Try with plain string
      const resultWithString = await calculateAtomId(str as any)
      console.log(`  Plain string: ${resultWithString}`)
    } catch (error) {
      console.log(`  Plain string: ERROR - ${error.message}`)
    }

    try {
      // Try with hex-encoded
      const hexStr = stringToHex(str)
      const resultWithHex = await calculateAtomId(hexStr)
      console.log(`  Hex encoded:  ${resultWithHex}`)
    } catch (error) {
      console.log(`  Hex encoded:  ERROR - ${error.message}`)
    }

    console.log()
  }
}

testComparison()
  .then(() => console.log('✨ Comparison complete!'))
  .catch((error) => console.error('💥 Error:', error))