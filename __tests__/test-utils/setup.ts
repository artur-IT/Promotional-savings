/**
 * This file is automatically loaded by Jest before running tests
 * @format
 */

/* ========== MOCK EXTERNAL LIBRARIES ========== */
// Mock AsyncStorage - used in all tests for data persistence
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
/* ========== GLOBAL TEST TIMEOUT ========== */
// Set default timeout for async operations (in milliseconds)
jest.setTimeout(10000);

/* ========== CLEANUP ========== */
// Automatically clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

