import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { colors } from '../constants/colors';

interface ConfirmationModalProps {
  visible: boolean;
  title?: string; // Made title optional
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  showCancelButton?: boolean; // New prop to control cancel button visibility
  compact?: boolean; // New prop to control modal width
}

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = 'Potwierdź',
  cancelText = 'Anuluj',
  onConfirm,
  onCancel,
  confirmButtonColor = '#EF4444',
  cancelButtonColor = 'green',
  showCancelButton = true, // Default to showing both buttons
  compact = false, // Default to normal width
}: ConfirmationModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel || onConfirm}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, compact && styles.modalContentCompact]}
        >
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          <Text
            style={[styles.modalMessage, !title && styles.modalMessageNoTitle]}
          >
            {message}
          </Text>
          <View
            style={[
              styles.modalButtons,
              !showCancelButton && styles.modalButtonsSingle,
            ]}
          >
            <Pressable
              style={[
                styles.modalButton,
                styles.confirmButton,
                { backgroundColor: confirmButtonColor },
                !showCancelButton && styles.modalButtonSingle,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </Pressable>

            {showCancelButton && (
              <Pressable
                style={[
                  styles.modalButton,
                  styles.cancelButton,
                  { backgroundColor: cancelButtonColor },
                ]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background.main,
    borderRadius: 20,
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 20, // Normal padding for regular modal
    marginHorizontal: 10, // Normal margin
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    width: 'auto',
    maxWidth: 350, // Larger for normal modals
  },
  modalContentCompact: {
    paddingHorizontal: 10, // Reduced padding for compact modal
    marginHorizontal: 50, // Increased margin to make modal narrower
    maxWidth: 250, // Smaller max width for compact modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalMessageNoTitle: {
    marginBottom: 16, // Even less margin when no title
    marginTop: 4, // Small top margin when no title
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  modalButton: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 24, // Increased to make button look better proportionally
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90, // Slightly increased for better proportion
  },
  modalButtonsSingle: {
    justifyContent: 'center',
  },
  modalButtonSingle: {
    minWidth: 70, // Slightly wider for single button in narrower modal
  },
  cancelButton: {
    // Color will be set dynamically via props
  },
  confirmButton: {
    // Color will be set dynamically via props
  },
  cancelButtonText: {
    color: colors.text.button_W,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: colors.text.button_W,
    fontSize: 16,
    fontWeight: '600',
  },
});
