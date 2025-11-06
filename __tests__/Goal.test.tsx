/**
 * Button clickability tests for Goal component
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Goal from '../screens/Goal/Goal';
import { clickButton, expectCalledWith } from './test-utils/helpers';

// Mock store
const mockNavigateToTab = jest.fn();
const mockGetActualGoal = jest.fn();

jest.mock('../store/useSavingsStore_Zustand', () => ({
  __esModule: true,
  default: () => ({ getActualGoal: mockGetActualGoal }),
}));

jest.mock('../store/useNavigationStore', () => ({
  __esModule: true,
  default: () => ({ navigateToTab: mockNavigateToTab }),
}));

// Mock components
jest.mock('../components/Goal/EditTargetForm', () => 'EditTargetForm');
jest.mock('../components/Goal/GoalProgress', () => 'GoalProgress');
jest.mock('../components/Button', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <Pressable testID={`button-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
});

describe('Goal Component - Button Clickability Tests', () => {
  beforeEach(() => jest.clearAllMocks());

  test('"Nowy" button is clickable when no goal exists', () => {
    mockGetActualGoal.mockReturnValue(null);
    const { getByTestId } = render(<Goal />);

    clickButton(getByTestId('button-Nowy'));
    expect(getByTestId('button-Nowy')).toBeTruthy();
  });

  test('"Edytuj" button is clickable when active goal exists', () => {
    mockGetActualGoal.mockReturnValue({
      id: 1,
      goal: 'Test Goal',
      targetAmount: 1000,
      startDate: '2024-01-01',
      savings: [{ id: 1, promotion: 100, date: '2024-01-15', category: 'Żywność' }],
    });
    const { getByTestId } = render(<Goal />);

    clickButton(getByTestId('button-Edytuj'));
    expect(getByTestId('button-Edytuj')).toBeTruthy();
  });

  test('"Historia" button is clickable and navigates correctly', () => {
    mockGetActualGoal.mockReturnValue(null);
    const { getByTestId } = render(<Goal />);

    clickButton(getByTestId('button-Historia'));
    expectCalledWith(mockNavigateToTab, 'historyGoals');
  });

  test('all buttons are present and respond to clicks', () => {
    mockGetActualGoal.mockReturnValue(null);
    const { getByTestId } = render(<Goal />);

    clickButton(getByTestId('button-Nowy'));
    clickButton(getByTestId('button-Historia'));
    expectCalledWith(mockNavigateToTab, 'historyGoals');
  });
});

