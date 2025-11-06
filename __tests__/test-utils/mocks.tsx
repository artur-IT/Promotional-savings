/**
 * Common mocks used across multiple test files
 * @format
 */

import React from 'react';
import { Text, Pressable, View, Modal } from 'react-native';

/**
 * Mock Button component
 * Returns a Pressable with testID for easy testing
 */
export const mockButton = () => {
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <Pressable testID={`button-${title}`} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
};

/**
 * Mock ConfirmationModal component
 * Returns a Modal with testID for easy testing
 */
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
};

/**
 * Helper to create mock store functions
 */
export const createMockStore = (storeData: any) => {
  return jest.fn((selector) => {
    if (selector) {
      return selector(storeData);
    }
    return storeData;
  });
};

