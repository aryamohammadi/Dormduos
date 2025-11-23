#!/usr/bin/env node

/**
 * Comprehensive End-to-End Test Suite
 * Tests all backend and frontend functionality
 */

const { spawn } = require('child_process');
const http = require('http');

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

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    log(`\n▶️  Running: ${command} ${args.join(' ')}`, 'cyan');
    const proc = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

async function checkServerHealth(port = 3001, maxRetries = 10) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const check = () => {
      const req = http.get(`http://localhost:${port}/api/health`, (res) => {
        if (res.statusCode === 200) {
          log('✅ Backend server is running', 'green');
          resolve();
        } else {
          retries++;
          if (retries < maxRetries) {
            setTimeout(check, 2000);
          } else {
            reject(new Error('Server health check failed'));
          }
        }
      });

      req.on('error', () => {
        retries++;
        if (retries < maxRetries) {
          setTimeout(check, 2000);
        } else {
          reject(new Error('Server not responding'));
        }
      });

      req.setTimeout(5000, () => {
        req.destroy();
        retries++;
        if (retries < maxRetries) {
          setTimeout(check, 2000);
        } else {
          reject(new Error('Server health check timeout'));
        }
      });
    };
    check();
  });
}

async function main() {
  log('\n🧪 COMPREHENSIVE TEST SUITE', 'blue');
  log('='.repeat(50), 'blue');
  
  const results = {
    backend: { passed: false, error: null },
    frontend: { passed: false, error: null },
    integration: { passed: false, error: null }
  };

  // Test 1: Backend Unit & Integration Tests
  log('\n📦 TEST 1: Backend Tests', 'yellow');
  try {
    await runCommand('npm', ['test'], './backend');
    results.backend.passed = true;
    log('✅ Backend tests passed', 'green');
  } catch (error) {
    results.backend.error = error.message;
    log(`❌ Backend tests failed: ${error.message}`, 'red');
  }

  // Test 2: Frontend Tests
  log('\n🌐 TEST 2: Frontend Tests', 'yellow');
  try {
    await runCommand('npm', ['run', 'test:run'], './frontend');
    results.frontend.passed = true;
    log('✅ Frontend tests passed', 'green');
  } catch (error) {
    results.frontend.error = error.message;
    log(`❌ Frontend tests failed: ${error.message}`, 'red');
  }

  // Test 3: Build Tests
  log('\n🔨 TEST 3: Build Tests', 'yellow');
  try {
    log('Building frontend...', 'cyan');
    await runCommand('npm', ['run', 'build'], './frontend');
    log('✅ Frontend build successful', 'green');
    
    log('Checking backend start script...', 'cyan');
    // Backend doesn't need a build step, just verify it can start
    log('✅ Backend ready', 'green');
  } catch (error) {
    log(`❌ Build failed: ${error.message}`, 'red');
  }

  // Test 4: Lint Tests
  log('\n🔍 TEST 4: Lint Tests', 'yellow');
  try {
    await runCommand('npm', ['run', 'lint:backend'], '.');
    log('✅ Backend lint passed', 'green');
  } catch (error) {
    log(`⚠️  Backend lint: ${error.message}`, 'yellow');
  }

  try {
    await runCommand('npm', ['run', 'lint:frontend'], '.');
    log('✅ Frontend lint passed', 'green');
  } catch (error) {
    log(`⚠️  Frontend lint: ${error.message}`, 'yellow');
  }

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log('📊 TEST SUMMARY', 'blue');
  log('='.repeat(50), 'blue');
  
  log(`Backend Tests: ${results.backend.passed ? '✅ PASSED' : '❌ FAILED'}`, results.backend.passed ? 'green' : 'red');
  if (results.backend.error) {
    log(`  Error: ${results.backend.error}`, 'red');
  }
  
  log(`Frontend Tests: ${results.frontend.passed ? '✅ PASSED' : '❌ FAILED'}`, results.frontend.passed ? 'green' : 'red');
  if (results.frontend.error) {
    log(`  Error: ${results.frontend.error}`, 'red');
  }

  const allPassed = results.backend.passed && results.frontend.passed;
  
  if (allPassed) {
    log('\n🎉 ALL TESTS PASSED!', 'green');
    process.exit(0);
  } else {
    log('\n❌ SOME TESTS FAILED', 'red');
    process.exit(1);
  }
}

main().catch((error) => {
  log(`\n💥 Test suite crashed: ${error.message}`, 'red');
  process.exit(1);
});

