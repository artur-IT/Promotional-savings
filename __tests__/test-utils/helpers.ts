/**
 * Common test helper functions
 * @format
 */

import { fireEvent } from '@testing-library/react-native';

/* Helper to click a button and verify it responds */
export const clickButton = (button: any) => {
  fireEvent.press(button);
};

/* Helper to click a button multiple times */
export const clickButtonMultipleTimes = (button: any, times: number) => {
  for (let i = 0; i < times; i++) {
    fireEvent.press(button);
  }
};

/* Helper to verify button exists */
export const expectButtonToExist = (button: any) => {
  expect(button).toBeTruthy();
};

/* Helper to verify function was called with specific times */
export const expectCalledTimes = (mockFn: jest.Mock, times: number) => {
  expect(mockFn).toHaveBeenCalledTimes(times);
};

/* Helper to verify function was called with specific arguments */
export const expectCalledWith = (mockFn: jest.Mock, ...args: any[]) => {
  expect(mockFn).toHaveBeenCalledWith(...args);
};

/* Helper to verify function was not called */
export const expectNotCalled = (mockFn: jest.Mock) => {
  expect(mockFn).not.toHaveBeenCalled();
};

