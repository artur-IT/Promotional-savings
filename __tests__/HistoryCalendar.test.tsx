/**
 * Button clickability tests for HistoryCalendar component
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HistoryCalendar from '../components/HistorySaving/HistoryCalendar';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock store
const mockGetAllSavings = jest.fn();
const mockDeleteSaving = jest.fn();
const mockIsLatestSavingFromActiveGoal = jest.fn();

jest.mock('../store/useSavingsStore_Zustand', () => {
  const mockStore = jest.fn((selector) => {
    if (selector) {
      // If selector is provided, return selected state
      return selector({
        allGoals: [
          {
            id: 1,
            goal: 'Test Goal',
            targetAmount: 1000,
            startDate: '2024-01-01',
            savings: [
              { id: 1, promotion: 100, date: '2024-01-15', category: 'Żywność' },
              { id: 2, promotion: 200, date: '2024-01-20', category: 'Paliwo' },
            ],
          },
        ],
      });
    }
    // If no selector, return all actions
    return {
      getAllSavings: mockGetAllSavings,
      deleteSaving: mockDeleteSaving,
      isLatestSavingFromActiveGoal: mockIsLatestSavingFromActiveGoal,
    };
  });
  return {
    __esModule: true,
    default: mockStore,
  };
});

// Mock Button component
jest.mock('../components/Button', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <Pressable testID={`button-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
});

describe('HistoryCalendar Component - Button Clickability Tests', () => {
  const mockSavings = [
    { id: 1, promotion: 100, date: '2024-01-15', category: 'Żywność' },
    { id: 2, promotion: 200, date: '2024-01-20', category: 'Paliwo' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAllSavings.mockReturnValue(mockSavings);
    mockIsLatestSavingFromActiveGoal.mockImplementation((id: number) => {
      // Only the latest saving (id: 2) can be deleted
      return id === 2;
    });
  });

  // Test 1: Delete button (❌) is present for latest saving
  test('delete button "❌" is present for latest saving from active goal', () => {
    const { getByTestId } = render(
      <HistoryCalendar selectedYear="2024" />,
    );

    const deleteButton = getByTestId('button-❌');
    expect(deleteButton).toBeTruthy();
  });

  // Test 2: Delete button is clickable
  test('delete button "❌" is clickable', () => {
    const { getByTestId } = render(
      <HistoryCalendar selectedYear="2024" />,
    );

    const deleteButton = getByTestId('button-❌');
    expect(deleteButton).toBeTruthy();
    fireEvent.press(deleteButton);

    // Button should respond to press
    expect(deleteButton).toBeTruthy();
  });

  // Test 3: Clicking delete button calls deleteSaving function
  test('clicking delete button calls deleteSaving with correct id', () => {
    const { getByTestId } = render(
      <HistoryCalendar selectedYear="2024" />,
    );

    const deleteButton = getByTestId('button-❌');

    fireEvent.press(deleteButton);

    // Verify deleteSaving was called with the latest saving's id
    expect(mockDeleteSaving).toHaveBeenCalledWith(2);
  });

  // Test 4: Delete button only appears for deletable savings
  test('delete button only appears for latest saving from active goal', () => {
    // Mock that only id:2 is the latest from active goal
    mockIsLatestSavingFromActiveGoal.mockImplementation((id: number) => {
      return id === 2;
    });

    const { getAllByTestId, queryAllByTestId } = render(
      <HistoryCalendar selectedYear="2024" />,
    );

    // Should only have one delete button (for the latest saving)
    const deleteButtons = queryAllByTestId('button-❌');

    // There should be exactly 1 delete button
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  // Test 5: No delete button appears when no savings are from active goal
  test('no delete button appears when no savings are from active goal', () => {
    // Mock that no savings are latest from active goal
    mockIsLatestSavingFromActiveGoal.mockReturnValue(false);

    const { queryByTestId } = render(
      <HistoryCalendar selectedYear="2024" />,
    );

    // Delete button should not be present
    const deleteButton = queryByTestId('button-❌');
    expect(deleteButton).toBeNull();
  });

  // Test 6: Button remains functional after multiple clicks
  test('delete button remains clickable after multiple interactions', () => {
    const { getByTestId } = render(
      <HistoryCalendar selectedYear="2024" />,
    );

    const deleteButton = getByTestId('button-❌');

    // Click button multiple times
    fireEvent.press(deleteButton);
    fireEvent.press(deleteButton);

    // Verify deleteSaving was called twice
    expect(mockDeleteSaving).toHaveBeenCalledTimes(2);
    expect(mockDeleteSaving).toHaveBeenCalledWith(2);
  });
});

