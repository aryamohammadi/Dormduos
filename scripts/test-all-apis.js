#!/usr/bin/env node

/**
 * Comprehensive API Endpoint Test
 * Tests all backend API endpoints to ensure they work correctly
 */

const API_BASE_URL = process.env.API_URL || 'http://localhost:3001/api';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(method, endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };
  
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }
  
  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));
    
    return {
      success: response.ok,
      status: response.status,
      data,
      error: response.ok ? null : data.error || `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: {},
      error: error.message
    };
  }
}

async function main() {
  log('\n🧪 COMPREHENSIVE API ENDPOINT TEST', 'blue');
  log('='.repeat(60), 'blue');
  log(`Testing API at: ${API_BASE_URL}\n`, 'cyan');
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };
  
  // Test 1: Health Check
  log('📋 Test 1: Health Check Endpoints', 'yellow');
  const health1 = await testEndpoint('GET', '/health');
  if (health1.success) {
    log('  ✅ GET /api/health - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ GET /api/health - FAILED: ${health1.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Health Check', ...health1 });
  
  const health2 = await testEndpoint('GET', '/health/detailed');
  if (health2.success) {
    log('  ✅ GET /api/health/detailed - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ GET /api/health/detailed - FAILED: ${health2.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Health Detailed', ...health2 });
  
  // Test 2: Auth - Registration
  log('\n📋 Test 2: Authentication Endpoints', 'yellow');
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  
  const register = await testEndpoint('POST', '/auth/register', {
    body: {
      email: testEmail,
      password: testPassword,
      name: 'Test User',
      phone: '555-1234'
    }
  });
  
  let token = null;
  if (register.success && register.data.token) {
    log('  ✅ POST /api/auth/register - PASSED', 'green');
    token = register.data.token;
    results.passed++;
  } else {
    log(`  ❌ POST /api/auth/register - FAILED: ${register.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Register', ...register });
  
  // Test 3: Auth - Login
  const login = await testEndpoint('POST', '/auth/login', {
    body: {
      email: testEmail,
      password: testPassword
    }
  });
  
  if (login.success && login.data.token) {
    log('  ✅ POST /api/auth/login - PASSED', 'green');
    token = login.data.token; // Use login token
    results.passed++;
  } else {
    log(`  ❌ POST /api/auth/login - FAILED: ${login.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Login', ...login });
  
  if (!token) {
    log('\n⚠️  Cannot continue API tests without authentication token', 'yellow');
    logSummary(results);
    process.exit(1);
  }
  
  // Test 4: Auth - Get Current User
  const me = await testEndpoint('GET', '/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (me.success) {
    log('  ✅ GET /api/auth/me - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ GET /api/auth/me - FAILED: ${me.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Get Current User', ...me });
  
  // Test 5: Listings - Get All (Public)
  log('\n📋 Test 3: Listings Endpoints', 'yellow');
  const getAll = await testEndpoint('GET', '/listings');
  if (getAll.success && Array.isArray(getAll.data.listings)) {
    log('  ✅ GET /api/listings - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ GET /api/listings - FAILED: ${getAll.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Get All Listings', ...getAll });
  
  // Test 6: Listings - Get My Listings (Protected)
  const getMy = await testEndpoint('GET', '/listings/my', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (getMy.success && Array.isArray(getMy.data.listings)) {
    log('  ✅ GET /api/listings/my - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ GET /api/listings/my - FAILED: ${getMy.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Get My Listings', ...getMy });
  
  // Test 7: Listings - Create (Protected)
  const createListing = await testEndpoint('POST', '/listings', {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      title: 'Test Listing - API Test',
      description: 'This is a test listing created by the API test script',
      price: 1200,
      bedrooms: 2,
      bathrooms: 1,
      address: '123 Test Street, Riverside, CA 92507',
      distance_from_campus: '0.5 miles',
      parking_type: 'street',
      amenities: ['wifi', 'parking'],
      lease_terms: ['semester']
    }
  });
  
  let listingId = null;
  if (createListing.success && createListing.data.listing) {
    log('  ✅ POST /api/listings - PASSED', 'green');
    listingId = createListing.data.listing._id;
    results.passed++;
  } else {
    log(`  ❌ POST /api/listings - FAILED: ${createListing.error}`, 'red');
    log(`     Details: ${JSON.stringify(createListing.data)}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Create Listing', ...createListing });
  
  // Test 8: Listings - Get Single (Public)
  if (listingId) {
    const getSingle = await testEndpoint('GET', `/listings/${listingId}`);
    if (getSingle.success && getSingle.data.listing) {
      log('  ✅ GET /api/listings/:id - PASSED', 'green');
      results.passed++;
    } else {
      log(`  ❌ GET /api/listings/:id - FAILED: ${getSingle.error}`, 'red');
      results.failed++;
    }
    results.tests.push({ name: 'Get Single Listing', ...getSingle });
    
    // Test 9: Listings - Update (Protected)
    const updateListing = await testEndpoint('PUT', `/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
      body: {
        title: 'Updated Test Listing',
        price: 1300
      }
    });
    if (updateListing.success) {
      log('  ✅ PUT /api/listings/:id - PASSED', 'green');
      results.passed++;
    } else {
      log(`  ❌ PUT /api/listings/:id - FAILED: ${updateListing.error}`, 'red');
      results.failed++;
    }
    results.tests.push({ name: 'Update Listing', ...updateListing });
    
    // Test 10: Listings - Delete (Protected)
    const deleteListing = await testEndpoint('DELETE', `/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (deleteListing.success) {
      log('  ✅ DELETE /api/listings/:id - PASSED', 'green');
      results.passed++;
    } else {
      log(`  ❌ DELETE /api/listings/:id - FAILED: ${deleteListing.error}`, 'red');
      results.failed++;
    }
    results.tests.push({ name: 'Delete Listing', ...deleteListing });
  }
  
  // Test 11: Listings - Filtering
  log('\n📋 Test 4: Listings Filtering', 'yellow');
  const filterTest = await testEndpoint('GET', '/listings?minPrice=1000&maxPrice=1500&bedrooms=2');
  if (filterTest.success) {
    log('  ✅ GET /api/listings with filters - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ GET /api/listings with filters - FAILED: ${filterTest.error}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Filter Listings', ...filterTest });
  
  // Test 12: Error Handling
  log('\n📋 Test 5: Error Handling', 'yellow');
  const invalidAuth = await testEndpoint('GET', '/listings/my', {
    headers: { Authorization: 'Bearer invalid-token' }
  });
  if (!invalidAuth.success && invalidAuth.status === 401) {
    log('  ✅ Invalid token rejection - PASSED', 'green');
    results.passed++;
  } else {
    log(`  ❌ Invalid token rejection - FAILED: Expected 401, got ${invalidAuth.status}`, 'red');
    results.failed++;
  }
  results.tests.push({ name: 'Invalid Token Handling', ...invalidAuth });
  
  // Summary
  logSummary(results);
  
  if (results.failed === 0) {
    log('\n🎉 ALL API TESTS PASSED!', 'green');
    process.exit(0);
  } else {
    log(`\n❌ ${results.failed} TEST(S) FAILED`, 'red');
    process.exit(1);
  }
}

function logSummary(results) {
  log('\n' + '='.repeat(60), 'blue');
  log('📊 API TEST SUMMARY', 'blue');
  log('='.repeat(60), 'blue');
  log(`Total Tests: ${results.passed + results.failed}`, 'cyan');
  log(`✅ Passed: ${results.passed}`, 'green');
  log(`❌ Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  
  if (results.failed > 0) {
    log('\nFailed Tests:', 'red');
    results.tests.forEach(test => {
      if (!test.success) {
        log(`  - ${test.name}: ${test.error} (Status: ${test.status})`, 'red');
      }
    });
  }
}

main().catch((error) => {
  log(`\n💥 Test suite crashed: ${error.message}`, 'red');
  log(error.stack, 'red');
  process.exit(1);
});

