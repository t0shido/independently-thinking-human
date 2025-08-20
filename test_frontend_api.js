/**
 * Test script to verify frontend API calls to the backend
 * Run this with Node.js: node test_frontend_api.js
 */

const fetch = require('node-fetch');

// Configuration
const API_BASE_URL = process.env.API_URL || 'http://localhost:8000/api';
const SECTIONS = ['news', 'opinion', 'tech']; // Add your actual section names

// Utility for logging
const logResult = (test, success, message, data = null) => {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | ${test}: ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
  console.log('-'.repeat(50));
};

// Test fetching articles from a section
const testGetArticles = async (section) => {
  const testName = `GET articles/${section}`;
  try {
    console.log(`\nTesting API call to ${API_BASE_URL}/articles/${section}/`);
    
    const response = await fetch(`${API_BASE_URL}/articles/${section}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`Response status: ${response.status}`);
    
    // Log headers for debugging
    console.log('Response headers:');
    response.headers.forEach((value, name) => {
      console.log(`  ${name}: ${value}`);
    });
    
    if (!response.ok) {
      logResult(testName, false, `Failed with status ${response.status}`);
      try {
        const errorText = await response.text();
        console.log('Error response:', errorText);
      } catch (e) {
        console.log('Could not read error response');
      }
      return;
    }
    
    const data = await response.json();
    const articleCount = Array.isArray(data) ? data.length : 'unknown';
    logResult(testName, true, `Retrieved ${articleCount} articles`, { 
      count: articleCount,
      sample: Array.isArray(data) && data.length > 0 ? data[0] : null 
    });
  } catch (error) {
    logResult(testName, false, `Error: ${error.message}`);
    console.error(error);
  }
};

// Run all tests
const runTests = async () => {
  console.log('=== FRONTEND API TESTS ===');
  console.log(`Testing against API: ${API_BASE_URL}`);
  
  // Test each section
  for (const section of SECTIONS) {
    await testGetArticles(section);
  }
  
  console.log('\n=== TESTS COMPLETED ===');
};

// Execute tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
