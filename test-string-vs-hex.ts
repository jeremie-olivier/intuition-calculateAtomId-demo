import { calculateAtomId } from '@0xintuition/sdk'
import { stringToHex } from 'viem'

// Test what happens when we pass a plain string vs hex-encoded
const testString = 'Alice'

console.log('🧪 Testing string vs hex input to calculateAtomId:\n')

try {
  console.log('❌ Trying with plain string:')
  // @ts-expect-error - intentionally passing wrong type to see what happens
  const resultString = calculateAtomId(testString)
  console.log(`   Input: "${testString}"`)
  console.log(`   Result: ${resultString}`)
} catch (error) {
  console.log(`   Input: "${testString}"`)
  console.log(`   Error: ${error.message}`)
}

console.log()

try {
  console.log('✅ Trying with hex-encoded:')
  const hexString = stringToHex(testString)
  const resultHex = calculateAtomId(hexString)
  console.log(`   Input: ${hexString}`)
  console.log(`   Result: ${resultHex}`)
} catch (error) {
  console.log(`   Input: ${hexString}`)
  console.log(`   Error: ${error.message}`)
}