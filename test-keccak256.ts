import { keccak256, toHex } from 'viem'

console.log('🧪 Testing keccak256 with string vs hex input:\n')

const testString = 'Alice'
const hexString = toHex(testString)

console.log(`Original string: "${testString}"`)
console.log(`Hex version: ${hexString}`)
console.log()

try {
  console.log('❓ Testing keccak256 with plain string:')
  // @ts-expect-error - testing if it accepts strings
  const hashFromString = keccak256(testString)
  console.log(`   Input: "${testString}"`)
  console.log(`   Hash:  ${hashFromString}`)
} catch (error) {
  console.log(`   Input: "${testString}"`)
  console.log(`   Error: ${error.message}`)
}

console.log()

try {
  console.log('✅ Testing keccak256 with hex:')
  const hashFromHex = keccak256(hexString)
  console.log(`   Input: ${hexString}`)
  console.log(`   Hash:  ${hashFromHex}`)
} catch (error) {
  console.log(`   Input: ${hexString}`)
  console.log(`   Error: ${error.message}`)
}

console.log()

// Test with a few more examples
const examples = ['Bob', 'implements', 'ATOM_SALT']

console.log('🔍 Testing multiple examples:\n')

for (const str of examples) {
  const hex = toHex(str)

  try {
    // @ts-expect-error - testing string input
    const hashStr = keccak256(str)
    const hashHex = keccak256(hex)

    console.log(`String: "${str}"`)
    console.log(`  Hash from string: ${hashStr}`)
    console.log(`  Hash from hex:    ${hashHex}`)
    console.log(`  Same result: ${hashStr === hashHex ? '✅' : '❌'}`)
    console.log()
  } catch (error) {
    console.log(`String: "${str}" - Error: ${error.message}`)
  }
}