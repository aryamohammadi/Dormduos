#!/usr/bin/env node

/**
 * DormDuos Production Smoke Test
 * 
 * This script tests critical production endpoints to ensure
 * the Sign Up flow works after our CORS and environment fixes.
 */

const https = require('https');

const API_BASE = 'https://backend-api-production-cc33.up.railway.app/api';
const FRONTEND_ORIGIN = 'https://dormduos.com';

// Test configuration
const tests = [
  {
    name: 'Health Check',
    method: 'GET',
    path: '/health',
    expectStatus: 200
  },
  {
    name: 'CORS Preflight',
    method: 'OPTIONS',
    path: '/auth/register',
    headers: {
      'Origin': FRONTEND_ORIGIN,
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type'
    },
    expectStatus: 200,
    expectHeaders: ['access-control-allow-origin']
  },
  {
    name: 'Registration (Bad Request)',
    method: 'POST',
    path: '/auth/register',
    headers: {
      'Content-Type': 'application/json',
      'Origin': FRONTEND_ORIGIN
    },
    body: JSON.stringify({ email: 'invalid' }),
    expectStatus: 400
  },
  {
    name: 'Get Listings',
    method: 'GET',
    path: '/listings',
    expectStatus: 200
  }
];

// Test runner
async function runTest(test) {
  return new Promise((resolve) => {
    const url = new URL(API_BASE + test.path);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: test.method,
      headers: {
        'User-Agent': 'DormDuos-SmokeTest/1.0',
        ...test.headers
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = {
          name: test.name,
          status: res.statusCode,
          headers: res.headers,
          body: data,
          success: res.statusCode === test.expectStatus
        };
        
        // Check expected headers
        if (test.expectHeaders) {
          result.headerChecks = test.expectHeaders.map(header => ({
            header,
            present: !!res.headers[header],
            value: res.headers[header]
          }));
          
          result.headersValid = result.headerChecks.every(check => check.present);
          result.success = result.success && result.headersValid;
        }
        
        resolve(result);
      });
    });

    req.on('error', (error) => {
      resolve({
        name: test.name,
        error: error.message,
        success: false
      });
    });

    if (test.body) {
      req.write(test.body);
    }
    
    req.end();
  });
}

// Main test execution
async function runSmokeTests() {
  console.log('🧪 DormDuos Production Smoke Test');
  console.log('=====================================');
  console.log(`API Base: ${API_BASE}`);
  console.log(`Origin: ${FRONTEND_ORIGIN}`);
  console.log('');

  const results = [];
  
  for (const test of tests) {
    process.stdout.write(`⏳ ${test.name}... `);
    const result = await runTest(test);
    results.push(result);
    
    if (result.success) {
      console.log('✅ PASS');
    } else {
      console.log('❌ FAIL');
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      } else {
        console.log(`   Expected: ${test.expectStatus}, Got: ${result.status}`);
      }
      
      if (result.headerChecks) {
        result.headerChecks.forEach(check => {
          const status = check.present ? '✅' : '❌';
          console.log(`   Header ${check.header}: ${status} ${check.value || 'missing'}`);
        });
      }
    }
  }
  
  console.log('');
  console.log('📊 Test Results:');
  console.log('================');
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('');
    console.log('🎉 All tests passed! Production is healthy.');
    process.exit(0);
  } else {
    console.log('');
    console.log('🚨 Some tests failed. Check the output above.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runSmokeTests().catch(console.error);
}

module.exports = { runSmokeTests }; 