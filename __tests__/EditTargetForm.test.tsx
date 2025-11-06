/**
 * Button clickability tests for EditTargetForm component
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditTargetForm from '../components/Goal/EditTargetForm';
import { clickButton, expectCalledTimes } from './test-utils/helpers';

// Mock store
const mockAddNewGoal = jest.fn();
const mockUpdateCurrentGoal = jest.fn();
const mockGetActualGoal = jest.fn();
const mockNavigateToTab = jest.fn();

jest.mock('../store/useSavingsStore_Zustand', () => ({
  __esModule: true,
  default: () => ({
    getActualGoal: mockGetActualGoal,
    addNewGoal: mockAddNewGoal,
    updateCurrentGoal: mockUpdateCurrentGoal,
  }),
}));

jest.mock('../store/useNavigationStore', () => ({
  __esModule: true,
  default: () => ({ navigateToTab: mockNavigateToTab }),
}));

jest.mock('../components/Button', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <Pressable testID={`button-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
});

describe('EditTargetForm Component - Button Clickability Tests', () => {
  const mockOnFormClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetActualGoal.mockReturnValue({
      id: 1,
      goal: 'Test Goal',
      targetAmount: 1000,
      startDate: '2024-01-01',
    });
  });

  test('"Anuluj" button is clickable', () => {
    const { getByTestId } = render(<EditTargetForm onFormClose={mockOnFormClose} editGoal={false} />);

    clickButton(getByTestId('button-Anuluj'));
    expectCalledTimes(mockOnFormClose, 1);
  });

  test('"Zapisz" button is clickable when creating new goal', () => {
    const { getByTestId } = render(<EditTargetForm onFormClose={mockOnFormClose} editGoal={false} />);

    clickButton(getByTestId('button-Zapisz'));
    expect(getByTestId('button-Zapisz')).toBeTruthy();
  });

  test('"Popraw" button is clickable when editing goal', () => {
    const { getByTestId } = render(<EditTargetForm onFormClose={mockOnFormClose} editGoal={true} />);

    clickButton(getByTestId('button-Popraw'));
    expect(getByTestId('button-Popraw')).toBeTruthy();
  });

  test('first "usuń" button clears goal name input', () => {
    const { getAllByTestId, getByPlaceholderText } = render(
      <EditTargetForm onFormClose={mockOnFormClose} editGoal={false} />,
    );

    const goalInput = getByPlaceholderText('Na co zbierasz?');
    fireEvent.changeText(goalInput, 'Test Goal Name');

    clickButton(getAllByTestId('button-usuń')[0]);
    expect(goalInput.props.value).toBe('');
  });

  test('second "usuń" button clears target amount input', () => {
    const { getAllByTestId, getByPlaceholderText } = render(
      <EditTargetForm onFormClose={mockOnFormClose} editGoal={false} />,
    );

    const amountInput = getByPlaceholderText('Ile chcesz zaoszczędzić?');
    fireEvent.changeText(amountInput, '500');

    clickButton(getAllByTestId('button-usuń')[1]);
    expect(amountInput.props.value).toBe('');
  });

  test('all buttons are present and respond to clicks', () => {
    const { getByTestId, getAllByTestId } = render(
      <EditTargetForm onFormClose={mockOnFormClose} editGoal={false} />,
    );

    const usunButtons = getAllByTestId('button-usuń');
    expect(usunButtons.length).toBe(2);

    clickButton(getByTestId('button-Zapisz'));
    clickButton(getByTestId('button-Anuluj'));
    clickButton(usunButtons[0]);
    clickButton(usunButtons[1]);

    expect(mockOnFormClose).toHaveBeenCalled();
  });
});

