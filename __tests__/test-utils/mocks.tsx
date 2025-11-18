/**
 * @format
 */

import React from 'react';
import { Text, Pressable, View, Modal, TouchableOpacity } from 'react-native';

/* ========== TEST DATA FIXTURES ========== */

export const TEST_GOAL = {
  id: 1,
  goal: 'Test Goal',
  targetAmount: 1000,
  startDate: '2024-01-01',
  savings: [],
};

export const TEST_GOAL_WITH_SAVINGS = {
  id: 1,
  goal: 'Test Goal with Savings',
  targetAmount: 1000,
  startDate: '2024-01-01',
  savings: [
    { id: 1, promotion: 100, date: '2024-01-15', category: 'Żywność' },
    { id: 2, promotion: 200, date: '2024-01-20', category: 'Paliwo' },
  ],
};

export const TEST_GOAL_COMPLETED = {
  id: 1,
  goal: 'Completed Goal',
  targetAmount: 1000,
  startDate: '2024-01-01',
  endDate: '2024-02-01',
  savings: [{ id: 1, promotion: 1000, date: '2024-01-15', category: 'Żywność' }],
};

export const TEST_GOALS_HISTORY = [
  TEST_GOAL_COMPLETED,
  {
    id: 2,
    goal: 'Second Goal',
    targetAmount: 500,
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    savings: [{ id: 3, promotion: 500, date: '2024-02-15', category: 'Inne' }],
  },
];

export const TEST_SAVINGS = [
  { id: 1, promotion: 100, date: '2024-01-15', category: 'Żywność' },
  { id: 2, promotion: 200, date: '2024-01-20', category: 'Paliwo' },
  { id: 3, promotion: 150, date: '2024-01-25', category: 'Ubrania' },
];

/* ========== COMPONENT MOCKS ========== */

/* Mock Button component - Returns a Pressable with testID for easy testing */
export const mockButton = () => {
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <Pressable testID={`button-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
};

/* Returns a Modal with testID for easy testing */
export const mockConfirmationModal = () => {
  return ({
    visible,
    message,
    onConfirm,
    onCancel,
  }: {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => (
    <Modal visible={visible} testID="confirmation-modal">
      <View>
        <Text testID="modal-message">{message}</Text>
        <Pressable testID="modal-confirm" onPress={onConfirm}>
          <Text>Usuń wszystkie</Text>
        </Pressable>
        {onCancel && (
          <Pressable testID="modal-cancel" onPress={onCancel}>
            <Text>Anuluj</Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
};

/* Mock ConfirmationModal component for error messages (single button) - Used in DataSavings and other forms */
export const mockErrorModal = () => {
  return ({
    visible,
    message,
    onConfirm,
  }: {
    visible: boolean;
    message: string;
    onConfirm: () => void;
  }) => (
    <Modal visible={visible} testID="error-modal">
      <View>
        <Text testID="error-modal-message">{message}</Text>
        <Pressable testID="error-modal-ok" onPress={onConfirm}>
          <Text>OK</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

/**
 * Mock Calendar component from react-native-calendars
 * @param customDate - optional custom date string (default: '2024-01-15')
 */
export const mockCalendar = (customDate: string = '2024-01-15') => {
  return ({ onDayPress }: any) => {
    const React = require('react');
    const { View, TouchableOpacity, Text } = require('react-native');
    return (
      <View testID="calendar">
        <TouchableOpacity
          testID="calendar-day-button"
          onPress={() => onDayPress({ dateString: customDate })}
        >
          <Text>Select Date</Text>
        </TouchableOpacity>
      </View>
    );
  };
};

/* Mock LocaleConfig for react-native-calendars */
export const mockCalendarLocaleConfig = {
  locales: {},
  defaultLocale: 'pl',
};

/* ========== STORE MOCKS ========== */

/**
 * Creates a mock Zustand store with custom data
 * @param storeData - object containing store state and actions
 * @returns mock function that behaves like Zustand store
 */
export const createMockStore = (storeData: any) => {
  return jest.fn((selector) => {
    if (selector) {
      return selector(storeData);
    }
    return storeData;
  });
};

/**
 * Creates mock functions for SavingsStore
 * Use this to easily create mock store actions
 * @returns object with all store action mocks
 */
export const createMockSavingsStore = () => ({
  addNewGoal: jest.fn(),
  updateCurrentGoal: jest.fn(),
  getActualGoal: jest.fn(),
  completeGoal: jest.fn(),
  deleteGoal: jest.fn(),
  deleteAllGoals: jest.fn(),
  getAllSavings: jest.fn(),
  deleteSaving: jest.fn(),
  isLatestSavingFromActiveGoal: jest.fn(),
});

/**
 * Creates mock functions for NavigationStore
 * Use this to easily create navigation mocks
 * @returns
 */
export const createMockNavigationStore = () => ({
  navigateToTab: jest.fn(),
  activeTabIndex: 0,
  setActiveTabIndex: jest.fn(),
});

/* ========== MOCK SETUP HELPERS ========== */

/**
 * Setup mock for AsyncStorage
 * Call this in jest.mock() at the top of your test file
 */
export const setupAsyncStorageMock = () => {
  return require('@react-native-async-storage/async-storage/jest/async-storage-mock');
};

/**
 * Setup standard mocks for a test file
 * This includes Button and common configurations
 * @returns object with mock functions for further customization
 */
export const setupStandardMocks = () => {
  const navigationMocks = createMockNavigationStore();
  const savingsMocks = createMockSavingsStore();

  return {
    navigation: navigationMocks,
    savings: savingsMocks,
  };
};

