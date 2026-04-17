import { calculateAtomId } from '@0xintuition/sdk'
import { keccak256, stringToHex } from 'viem'

// Test JSON object as atom data
const nexuraObject = {
  "@context": "https://schema.org",
  "@type": "Thing",
  "description": "The engagement engine for Intuition ecosystem ",
  "image": "https://res.cloudinary.com/dfpwy9nyv/image/upload/v1765619877/remix/knuqwmm3cl9jvjerelwl.png",
  "name": "NEXURA ",
  "url": "null"
}

console.log('🧪 Testing calculateAtomId with JSON object data:\n')

console.log('📋 Original object:')
console.log(JSON.stringify(nexuraObject, null, 2))
console.log()

// Test 1: Try to pass object directly (should fail)
try {
  console.log('❌ Test 1: Passing object directly')
  // @ts-expect-error - testing what happens with object
  const resultDirect = calculateAtomId(nexuraObject)
  console.log(`   Result: ${resultDirect}`)
} catch (error) {
  console.log(`   Error: ${error.message}`)
}

console.log()

// Test 2: JSON.stringify the object first
try {
  console.log('✅ Test 2: JSON.stringify first')
  const jsonString = JSON.stringify(nexuraObject)
  const resultString = calculateAtomId(jsonString)

  console.log(`   JSON string: ${jsonString.slice(0, 100)}...`)
  console.log(`   Atom ID: ${resultString}`)
} catch (error) {
  console.log(`   Error: ${error.message}`)
}

console.log()

// Test 3: Test if property order matters
console.log('🔄 Test 3: Does property order affect the hash?')

const sameObjectDifferentOrder = {
  "name": "NEXURA ",
  "@context": "https://schema.org",
  "url": "null",
  "@type": "Thing",
  "image": "https://res.cloudinary.com/dfpwy9nyv/image/upload/v1765619877/remix/knuqwmm3cl9jvjerelwl.png",
  "description": "The engagement engine for Intuition ecosystem "
}

const json1 = JSON.stringify(nexuraObject)
const json2 = JSON.stringify(sameObjectDifferentOrder)

const hash1 = calculateAtomId(json1)
const hash2 = calculateAtomId(json2)

console.log(`Original order hash:  ${hash1}`)
console.log(`Different order hash: ${hash2}`)
console.log(`Same result: ${hash1 === hash2 ? '✅' : '❌'}`)
console.log()

// Test 4: Deterministic JSON (sorted keys)
console.log('🎯 Test 4: Using deterministic JSON (sorted keys)')

function deterministicStringify(obj: any): string {
  return JSON.stringify(obj, Object.keys(obj).sort())
}

const deterministicJson1 = deterministicStringify(nexuraObject)
const deterministicJson2 = deterministicStringify(sameObjectDifferentOrder)
const deterministicHash1 = calculateAtomId(deterministicJson1)
const deterministicHash2 = calculateAtomId(deterministicJson2)

console.log(`Deterministic JSON 1: ${deterministicJson1.slice(0, 80)}...`)
console.log(`Deterministic JSON 2: ${deterministicJson2.slice(0, 80)}...`)
console.log(`Hash 1: ${deterministicHash1}`)
console.log(`Hash 2: ${deterministicHash2}`)
console.log(`Same result: ${deterministicHash1 === deterministicHash2 ? '✅' : '❌'}`)
console.log()

// Test 5: Compare with simple string
console.log('📊 Test 5: Compare with simple string atom')

const simpleName = 'NEXURA'
const simpleHash = calculateAtomId(simpleName)
const complexHash = calculateAtomId(deterministicJson1)

console.log(`Simple string: "${simpleName}" → ${simpleHash}`)
console.log(`Complex object: → ${complexHash}`)
console.log(`Different IDs (expected): ${simpleHash !== complexHash ? '✅' : '❌'}`)