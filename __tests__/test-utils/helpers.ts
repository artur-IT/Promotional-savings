/**
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
 * @param button 
 * @param times - number of times to press the button
 */
export const clickButtonMultipleTimes = (button: any, times: number) => {
  for (let i = 0; i < times; i++) {
    fireEvent.press(button);
  }
};

/**
 * Fills a text input field with a value
 * @param input 
 * @param value 
 */
export const fillInput = (input: any, value: string) => {
  fireEvent.changeText(input, value);
};

/**
 * Clears a text input field
 * @param input 
 */
export const clearInput = (input: any) => {
  fireEvent.changeText(input, '');
};

/* ========== ASSERTION HELPERS ========== */

/**
 * Verifies that an element exists on screen
 * @param element 
 */
export const expectElementToExist = (element: any) => {
  expect(element).toBeTruthy();
};

/**
 * Verifies that an element does not exist on screen
 * @param element 
 */
export const expectElementNotToExist = (element: any) => {
  expect(element).toBeNull();
};

/**
 * Verifies that text exists on screen
 * @param text 
 */
export const expectTextToExist = (text: any) => {
  expect(text).toBeTruthy();
};

/**
 * Verifies that text does not exist on screen
 * @param text
 */
export const expectTextNotToExist = (text: any) => {
  expect(text).toBeNull();
};

/**
 * Verifies that a mock function was called a specific number of times
 * @param mockFn 
 * @param times - expected number of calls
 */
export const expectCalledTimes = (mockFn: jest.Mock, times: number) => {
  expect(mockFn).toHaveBeenCalledTimes(times);
};

/**
 * Verifies that a mock function was called with specific arguments
 * @param mockFn 
 * @param args - expected arguments
 */
export const expectCalledWith = (mockFn: jest.Mock, ...args: any[]) => {
  expect(mockFn).toHaveBeenCalledWith(...args);
};

/**
 * Verifies that a mock function was not called
  * @param mockFn 
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
 * @param getByTestId 
 * @param queryAllByText 
 * @param dateButtonIndex 
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
 * @param queryAllByText 
 * @param getByText 
 * @param category 
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
 * @param amount 
 * @param category 
 */
export const fillDataSavingsForm = async (
  renderAPI: RenderAPI,
  amount: string,
  category: string,
) => {
  const { getByPlaceholderText, getByTestId, queryAllByText, getByText } = renderAPI;
  
  const amountInput = getByPlaceholderText('0');
  fillInput(amountInput, amount);
  
  await selectDateFromCalendar(getByTestId, queryAllByText);
  await selectCategory(queryAllByText, getByText, category);
};

/* ========== WAIT HELPERS ========== */

/**
 * Waits for an element to appear on screen
 * @param getElement 
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
 * @param getElement 
 * @param options 
 */
export const waitForElementToDisappear = async (
  getElement: () => any,
  options?: { timeout?: number; interval?: number },
) => {
  await waitFor(() => {
    expect(getElement()).toBeNull();
  }, options);
};



