/**
 * Common test helper functions
 * Provides reusable utilities for testing React Native components
 * @format
 */

import { fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';

/* ========== INTERACTION HELPERS ========== */

/**
 * Simulates pressing a button
 * @param button - button element to press
 */
export const clickButton = (button: any) => {
  fireEvent.press(button);
};

/**
 * Simulates pressing a button multiple times
 * Useful for testing rapid clicks or repeated actions
 * @param button - button element to press
 * @param times - number of times to press the button
 */
export const clickButtonMultipleTimes = (button: any, times: number) => {
  for (let i = 0; i < times; i++) {
    fireEvent.press(button);
  }
};

/**
 * Fills a text input field with a value
 * @param input - input element to fill
 * @param value - text value to enter
 */
export const fillInput = (input: any, value: string) => {
  fireEvent.changeText(input, value);
};

/**
 * Clears a text input field
 * @param input - input element to clear
 */
export const clearInput = (input: any) => {
  fireEvent.changeText(input, '');
};

/* ========== ASSERTION HELPERS ========== */

/**
 * Verifies that an element exists on screen
 * @param element - element to check for existence
 */
export const expectElementToExist = (element: any) => {
  expect(element).toBeTruthy();
};

/**
 * Verifies that an element does not exist on screen
 * @param element - element to check for non-existence
 */
export const expectElementNotToExist = (element: any) => {
  expect(element).toBeNull();
};

/**
 * Verifies that text exists on screen
 * @param text - text element to verify
 */
export const expectTextToExist = (text: any) => {
  expect(text).toBeTruthy();
};

/**
 * Verifies that text does not exist on screen
 * @param text - text element to verify absence
 */
export const expectTextNotToExist = (text: any) => {
  expect(text).toBeNull();
};

/**
 * Verifies that a mock function was called a specific number of times
 * @param mockFn - jest mock function to verify
 * @param times - expected number of calls
 */
export const expectCalledTimes = (mockFn: jest.Mock, times: number) => {
  expect(mockFn).toHaveBeenCalledTimes(times);
};

/**
 * Verifies that a mock function was called with specific arguments
 * @param mockFn - jest mock function to verify
 * @param args - expected arguments
 */
export const expectCalledWith = (mockFn: jest.Mock, ...args: any[]) => {
  expect(mockFn).toHaveBeenCalledWith(...args);
};

/**
 * Verifies that a mock function was not called
 * @param mockFn - jest mock function to verify
 */
export const expectNotCalled = (mockFn: jest.Mock) => {
  expect(mockFn).not.toHaveBeenCalled();
};

/**
 * Verifies that a mock function was called at least once
 * @param mockFn - jest mock function to verify
 */
export const expectCalled = (mockFn: jest.Mock) => {
  expect(mockFn).toHaveBeenCalled();
};

/* ========== COMPONENT-SPECIFIC HELPERS ========== */

/**
 * Selects a date from the calendar component
 * This helper handles the interaction with calendar picker in tests
 * @param getByTestId - function to get element by testID
 * @param queryAllByText - function to query elements by text
 * @param dateButtonIndex - index of date button (default 0 - first "Wybierz" button is for date)
 */
export const selectDateFromCalendar = async (
  getByTestId: any,
  queryAllByText: any,
  dateButtonIndex: number = 0,
) => {
  const dateButtons = queryAllByText('Wybierz');
  if (dateButtons[dateButtonIndex]) {
    // Open calendar
    fireEvent.press(dateButtons[dateButtonIndex]);
    
    // Select a date from calendar
    const calendarDayButton = getByTestId('calendar-day-button');
    fireEvent.press(calendarDayButton);
    
    // Wait for calendar to close
    await waitFor(() => {
      expect(queryAllByText('Wybierz').length).toBeGreaterThan(0);
    });
  }
};

/**
 * Selects a category from the dropdown
 * @param queryAllByText - function to query elements by text
 * @param getByText - function to get element by text
 * @param category - category to select ('Żywność', 'Paliwo', 'Ubrania', 'Inne')
 */
export const selectCategory = async (
  queryAllByText: any,
  getByText: any,
  category: string,
) => {
  // Open category dropdown (second "Wybierz" button is for category)
  const selectButtons = queryAllByText('Wybierz');
  if (selectButtons[1]) {
    fireEvent.press(selectButtons[1]);
    
    // Wait for dropdown to appear
    await waitFor(() => {
      expect(getByText(category)).toBeTruthy();
    });
    
    // Select category
    const categoryOption = getByText(category);
    fireEvent.press(categoryOption);
    
    // Wait for dropdown to close
    await waitFor(() => {
      expect(getByText(category)).toBeTruthy();
    }, { timeout: 2000 });
  }
};

/**
 * Fills the complete form in DataSavings component
 * @param renderAPI - render result from @testing-library/react-native
 * @param amount - amount to save
 * @param category - category to select
 */
export const fillDataSavingsForm = async (
  renderAPI: RenderAPI,
  amount: string,
  category: string,
) => {
  const { getByPlaceholderText, getByTestId, queryAllByText, getByText } = renderAPI;
  
  // Fill amount
  const amountInput = getByPlaceholderText('0');
  fillInput(amountInput, amount);
  
  // Select date
  await selectDateFromCalendar(getByTestId, queryAllByText);
  
  // Select category
  await selectCategory(queryAllByText, getByText, category);
};

/* ========== WAIT HELPERS ========== */

/**
 * Waits for an element to appear on screen
 * @param getElement - function that returns the element
 * @param options - waitFor options (timeout, interval, etc.)
 */
export const waitForElement = async (
  getElement: () => any,
  options?: { timeout?: number; interval?: number },
) => {
  await waitFor(() => {
    expect(getElement()).toBeTruthy();
  }, options);
};

/**
 * Waits for an element to disappear from screen
 * @param getElement - function that returns the element
 * @param options - waitFor options (timeout, interval, etc.)
 */
export const waitForElementToDisappear = async (
  getElement: () => any,
  options?: { timeout?: number; interval?: number },
) => {
  await waitFor(() => {
    expect(getElement()).toBeNull();
  }, options);
};



