/**
 * Basic clickability tests for Button component itself
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/Button';
import { clickButton, clickButtonMultipleTimes, expectCalledTimes, expectNotCalled } from './test-utils/helpers';

describe('Button Component - Clickability Tests', () => {
  test('button is clickable', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={mockOnPress} />);

    clickButton(getByText('Test Button'));
    expectCalledTimes(mockOnPress, 1);
  });

  test('button responds to multiple clicks', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={mockOnPress} />);

    clickButtonMultipleTimes(getByText('Test Button'), 3);
    expectCalledTimes(mockOnPress, 3);
  });

  test('disabled button does not trigger onPress', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={mockOnPress} disabled={true} />);

    clickButton(getByText('Test Button'));
    expectNotCalled(mockOnPress);
  });

  test('button with custom properties is clickable', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Custom Button" onPress={mockOnPress} bgColor="red" width={150} height={50} radius={10} />,
    );

    clickButton(getByText('Custom Button'));
    expectCalledTimes(mockOnPress, 1);
  });

  test('button remains clickable after re-render', () => {
    const mockOnPress = jest.fn();
    const { getByText, rerender } = render(<Button title="Dynamic Button" onPress={mockOnPress} />);

    clickButton(getByText('Dynamic Button'));
    expectCalledTimes(mockOnPress, 1);

    rerender(<Button title="Updated Button" onPress={mockOnPress} />);
    clickButton(getByText('Updated Button'));
    expectCalledTimes(mockOnPress, 2);
  });

  test('button handles rapid consecutive clicks', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Rapid Click Button" onPress={mockOnPress} />);

    clickButtonMultipleTimes(getByText('Rapid Click Button'), 5);
    expectCalledTimes(mockOnPress, 5);
  });
});

