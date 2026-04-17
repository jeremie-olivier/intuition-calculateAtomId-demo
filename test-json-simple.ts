import { calculateAtomId } from '@0xintuition/sdk'
import { stringToHex } from 'viem'

// Test JSON object
const nexuraObject = {
  "@context": "https://schema.org",
  "@type": "Thing",
  "description": "The engagement engine for Intuition ecosystem ",
  "image": "https://res.cloudinary.com/dfpwy9nyv/image/upload/v1765619877/remix/knuqwmm3cl9jvjerelwl.png",
  "name": "NEXURA ",
  "url": "null"
}

console.log('🧪 Testing JSON object: stringify vs stringify+hex\n')

const jsonString = JSON.stringify(nexuraObject)

console.log('📋 Scenario 1: Stringify JSON → calculateAtomId')
const result1 = calculateAtomId(jsonString)
console.log(`   Input: JSON string`)
console.log(`   Result: ${result1}`)

console.log()

console.log('📋 Scenario 2: Stringify JSON → stringToHex → calculateAtomId')
const hexString = stringToHex(jsonString)
const result2 = calculateAtomId(hexString)
console.log(`   Input: Hex-encoded JSON string`)
console.log(`   Result: ${result2}`)

console.log()

console.log(`🎯 Same result: ${result1 === result2 ? '✅' : '❌'}`)

if (result1 === result2) {
  console.log('   → SDK handles both formats identically!')
} else {
  console.log('   → Different results - format matters!')
}