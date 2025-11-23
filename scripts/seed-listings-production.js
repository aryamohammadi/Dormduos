#!/usr/bin/env node

/**
 * Production seed script - connects to production database
 * Run this on Railway or with production MongoDB URI
 * 
 * Usage on Railway:
 *   railway run node backend/scripts/seed-listings.js
 * 
 * Usage locally with production URI:
 *   MONGODB_URI="mongodb+srv://..." node backend/scripts/seed-listings.js
 */

console.log('📝 To seed listings in production, run:');
console.log('');
console.log('Option 1 - On Railway (recommended):');
console.log('  railway run node backend/scripts/seed-listings.js');
console.log('');
console.log('Option 2 - Locally with production URI:');
console.log('  MONGODB_URI="your-production-uri" node backend/scripts/seed-listings.js');
console.log('');
console.log('The script will:');
console.log('  - Create admin@test.com landlord account (if not exists)');
console.log('  - Delete existing listings from admin@test.com');
console.log('  - Create 8 sample listings with realistic UCR area addresses');
console.log('  - All listings will be active and visible on the website');

