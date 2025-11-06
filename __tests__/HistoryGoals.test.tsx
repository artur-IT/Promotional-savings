/**
 * Button clickability tests for HistoryGoals component
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import HistoryGoals from '../components/HistoryGoals/HistoryGoals';
import { clickButton, expectCalledTimes, expectNotCalled } from './test-utils/helpers';

// Mock store
const mockDeleteAllGoals = jest.fn();
const mockCompleteGoal = jest.fn();

jest.mock('../store/useSavingsStore_Zustand', () => {
  const mockStore = jest.fn((selector) => {
    if (selector) {
      return selector({
        allGoals: [
          {
            id: 1,
            goal: 'Test Goal 1',
            targetAmount: 1000,
            startDate: '2024-01-01',
            endDate: '2024-02-01',
            savings: [{ id: 1, promotion: 1000, date: '2024-01-15', category: 'Żywność' }],
          },
        ],
        deleteAllGoals: mockDeleteAllGoals,
        completeGoal: mockCompleteGoal,
      });
    }
    return { deleteAllGoals: mockDeleteAllGoals, completeGoal: mockCompleteGoal };
  });
  return { __esModule: true, default: mockStore };
});

jest.mock('../components/ConfirmationModal', () => {
  const React = require('react');
  const { View, Text, Modal, Pressable } = require('react-native');
  return ({
    visible,
    message,
    onConfirm,
    onCancel,
  }: {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => (
    <Modal visible={visible} testID="confirmation-modal">
      <View>
        <Text testID="modal-message">{message}</Text>
        <Pressable testID="modal-confirm" onPress={onConfirm}>
          <Text>Usuń wszystkie</Text>
        </Pressable>
        <Pressable testID="modal-cancel" onPress={onCancel}>
          <Text>Anuluj</Text>
        </Pressable>
      </View>
    </Modal>
  );
});

jest.mock('../components/Button', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <Pressable testID={`button-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
});

describe('HistoryGoals Component - Button Clickability Tests', () => {
  beforeEach(() => jest.clearAllMocks());

  test('"Usuń wszystkie cele!" button is clickable', () => {
    const { getByTestId } = render(<HistoryGoals />);

    clickButton(getByTestId('button-Usuń wszystkie cele!'));
    expect(getByTestId('button-Usuń wszystkie cele!')).toBeTruthy();
  });

  test('clicking delete button shows confirmation modal', () => {
    const { getByTestId } = render(<HistoryGoals />);

    clickButton(getByTestId('button-Usuń wszystkie cele!'));

    const modal = getByTestId('confirmation-modal');
    expect(modal.props.visible).toBe(true);
  });

  test('confirming deletion calls deleteAllGoals function', () => {
    const { getByTestId } = render(<HistoryGoals />);

    clickButton(getByTestId('button-Usuń wszystkie cele!'));
    clickButton(getByTestId('modal-confirm'));

    expectCalledTimes(mockDeleteAllGoals, 1);
  });

  test('canceling deletion does not call deleteAllGoals', () => {
    const { getByTestId } = render(<HistoryGoals />);

    clickButton(getByTestId('button-Usuń wszystkie cele!'));
    clickButton(getByTestId('modal-cancel'));

    expectNotCalled(mockDeleteAllGoals);
  });

  test('delete button remains clickable after canceling modal', () => {
    const { getByTestId } = render(<HistoryGoals />);

    clickButton(getByTestId('button-Usuń wszystkie cele!'));
    clickButton(getByTestId('modal-cancel'));
    clickButton(getByTestId('button-Usuń wszystkie cele!'));

    expect(getByTestId('confirmation-modal').props.visible).toBe(true);
  });
});

