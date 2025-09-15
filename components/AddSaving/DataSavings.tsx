import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState, forwardRef, useRef } from 'react';
import Button from '../../components/Button';
import ConfirmationModal from '../../components/ConfirmationModal';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { colors } from '../../constants/colors';

LocaleConfig.locales.pl = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
  monthNamesShort: [
    'Sty.',
    'Lut.',
    'Mar.',
    'Kwi.',
    'Maj',
    'Cze.',
    'Lip.',
    'Sie.',
    'Wrz.',
    'Paź.',
    'Lis.',
    'Gru.',
  ],
  dayNames: [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ],
  dayNamesShort: ['Ndz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
  today: 'Dziś',
};
LocaleConfig.defaultLocale = 'pl';

// Category options with emojis for better UX
const categoryOptions = [
  { label: 'Wybierz', value: '', emoji: '📋' },
  { label: 'Żywność', value: 'Żywność', emoji: '🍎' },
  { label: 'Paliwo', value: 'Paliwo', emoji: '⛽' },
  { label: 'Ubrania', value: 'Ubrania', emoji: '👕' },
  { label: 'Inne', value: 'Inne', emoji: '📦' },
];

// Using forwardRef to enable passing reference to this component
const DataSavings = forwardRef<{ resetForm: () => void }>(() => {
  const { updateCurrentGoal, getActualGoal } = useSavingsStore();
  const navigation = useNavigation();

  const [promotion, setPromotion] = useState<number>();
  const [category, setSelectedCategory] = useState<string>('');
  const [date, setSelectedDate] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');
  const [errors, setErrors] = useState<{
    promotion?: number;
    date?: string;
    category?: string;
  }>({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalConfig, setErrorModalConfig] = useState({
    message: '',
  });

  // Animations for dropdown
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(-10)).current; // For slide effect

  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

  const handlePromotionalChange = (value: string) => {
    // Allow only digits (remove any non-numeric characters)
    const cleanValue = value.replace(/[^0-9]/g, '');

    // Convert to number (integers only)
    let numericValue: number | undefined;
    if (cleanValue === '') {
      numericValue = undefined;
    } else {
      numericValue = parseInt(cleanValue, 10);
    }

    setPromotion(numericValue);

    // Clear error when user starts typing valid input
    if (errors.promotion && numericValue !== undefined) {
      setErrors(prev => ({ ...prev, promotion: undefined }));
    }
  };

  // Date update
  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    // Remove error after selecting date
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: undefined }));
    }
  };

  // 🎨 DROPDOWN ANIMATION OPTIONS
  // Category dropdown animation functions with multiple animation styles
  const toggleCategoryDropdown = () => {
    if (showCategoryDropdown) {
      // Close dropdown - Smooth Fade + Slide Up
      Animated.parallel([
        Animated.timing(dropdownAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(slideAnimation, {
          toValue: -10,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowCategoryDropdown(false);
      });
    } else {
      // Open dropdown - Smooth Fade + Slide Down with Spring
      setShowCategoryDropdown(true);
      Animated.parallel([
        Animated.spring(dropdownAnimation, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        }),
        Animated.spring(slideAnimation, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Category update
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Close dropdown after selection
    toggleCategoryDropdown();
    // Remove error after selecting category
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: undefined }));
    }
  };

  // Get current category display info
  const getCurrentCategoryInfo = () => {
    const selectedOption = categoryOptions.find(
      option => option.value === category,
    );
    return selectedOption || categoryOptions[0];
  };

  // Function to format date from YYYY-MM-DD to DD.MM.YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Wybierz ';

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const clearForm = () => {
    setPromotion(undefined);
    setSelectedDate('');
    setSelectedCategory('');
    setFocusedField('');
    setErrors({});
    // Close dropdown if open and reset animations
    if (showCategoryDropdown) {
      setShowCategoryDropdown(false);
      dropdownAnimation.setValue(0);
      slideAnimation.setValue(-10);
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors: {
      promotion?: string;
      date?: string;
      category?: string;
    } = {};
    let isValid = true;

    if (!promotion || promotion <= 0) {
      newErrors.promotion = 'Kwota musi być większa od zera';
      isValid = false;
    }

    if (!date) {
      newErrors.date = 'Wybierz datę';
      isValid = false;
    }

    if (!category) {
      newErrors.category = 'Wybierz kategorię';
      isValid = false;
    }

    // Set errors, making sure types match
    setErrors(
      newErrors as {
        promotion?: number;
        date?: string;
        category?: string;
      },
    );
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      try {
        const actualGoal = getActualGoal();

        // Check if there's an actual goal before saving
        if (!actualGoal) {
          setErrorModalConfig({
            message: 'Musisz najpierw utworzyć cel oszczędzania!',
          });
          setShowErrorModal(true);
          return;
        }

        updateCurrentGoal(actualGoal?.goal, actualGoal?.targetAmount, {
          id: Date.now(),
          promotion: promotion ?? 0,
          date: date,
          category: category,
        });
        clearForm();
        (navigation as any).navigate('Home');
        console.log('Aktualny cel:', getActualGoal());
      } catch (error) {
        console.error('Error while saving data:', error);
        setErrorModalConfig({
          message:
            'Wystąpił problem podczas zapisywania danych. Spróbuj ponownie.',
        });
        setShowErrorModal(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* VALUE */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapper,
              errors.promotion ? styles.inputError : null,
              focusedField === 'amount' ? styles.inputFocus : null,
            ]}
          >
            <Text style={styles.inputIcon}>💰</Text>
            <TextInput
              style={[styles.inputWithIcon]}
              keyboardType="numeric"
              value={promotion?.toString() || ''}
              maxLength={4}
              onChangeText={handlePromotionalChange}
              onFocus={() => {
                setFocusedField('amount');
                setPromotion(promotion);
              }}
              onBlur={() => setFocusedField('')}
              placeholder="0"
              placeholderTextColor={colors.text.secondary}
            />
            <Text style={styles.currencySymbol}>zł</Text>
          </View>
          {errors.promotion && (
            <Text style={styles.errorText}>{errors.promotion}</Text>
          )}
        </View>
      </View>

      {/* DATE */}
      <View style={styles.row}>
        <Text style={styles.label}>Data</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.dateButton,
              errors.date ? styles.inputError : null,
              focusedField === 'date' ? styles.inputFocus : null,
            ]}
            onPress={() => {
              setFocusedField('date');
              setShowCalendar(true);
            }}
            onBlur={() => setFocusedField('')}
          >
            <View style={styles.dateButtonContent}>
              <Text style={styles.inputIcon}>📅</Text>
              <Text
                style={[
                  styles.dateButtonText,
                  !date ? styles.placeholderText : null,
                ]}
              >
                {formatDate(date)}
              </Text>
              <Text style={styles.dateArrow}>📍</Text>
            </View>
          </TouchableOpacity>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>
      </View>

      {/* CATEGORY - Custom Dropdown */}
      <View style={styles.row}>
        <Text style={styles.label}>Kategoria</Text>

        <View style={styles.dropdownContainer}>
          {/* Dropdown Button */}
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              errors.category ? styles.inputError : null,
              showCategoryDropdown ? styles.dropdownButtonActive : null,
            ]}
            onPress={toggleCategoryDropdown}
          >
            <View style={styles.dropdownButtonContent}>
              <Text style={styles.dropdownButtonEmoji}>
                {getCurrentCategoryInfo().emoji}
              </Text>
              <Text
                style={[
                  styles.dropdownButtonText,
                  !category ? styles.placeholderText : null,
                ]}
              >
                {getCurrentCategoryInfo().label}
              </Text>
              <Text
                style={[
                  styles.dropdownArrow,
                  showCategoryDropdown ? styles.dropdownArrowUp : null,
                ]}
              >
                ▼
              </Text>
            </View>
          </TouchableOpacity>

          {/* Dropdown List */}
          {showCategoryDropdown && (
            <Animated.View
              style={[
                styles.dropdownList,
                {
                  opacity: dropdownAnimation,
                  transform: [
                    {
                      translateY: slideAnimation,
                    },
                    {
                      scale: dropdownAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <FlatList
                data={categoryOptions}
                keyExtractor={item => item.value}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      category === item.value
                        ? styles.dropdownItemSelected
                        : null,
                      // Remove border from last item
                      index === categoryOptions.length - 1
                        ? styles.dropdownItemLast
                        : null,
                    ]}
                    onPress={() => handleCategoryChange(item.value)}
                  >
                    <Text style={styles.dropdownItemEmoji}>{item.emoji}</Text>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        category === item.value
                          ? styles.dropdownItemTextSelected
                          : null,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
          )}

          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>
      </View>

      {/* Modal with calendar */}
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={day => {
                handleDateSelect(day);
                setShowCalendar(false);
              }}
              markedDates={{
                [date]: { selected: true, selectedColor: '#3498db' },
              }}
              maxDate={today}
              theme={{
                todayTextColor: '#3498db',
                selectedDayBackgroundColor: '#3498db',
                arrowColor: '#3498db',
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.buttons}>
        <Button title="Zapisz" onPress={handleSave} />
        <Button
          title="Anuluj"
          onPress={() => {
            clearForm();
            (navigation as any).navigate('Home');
          }}
        />
      </View>

      {/* Error Modal */}
      <ConfirmationModal
        visible={showErrorModal}
        message={errorModalConfig.message}
        confirmText="OK"
        onConfirm={() => setShowErrorModal(false)}
        confirmButtonColor="green"
        showCancelButton={false}
        compact={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  label: {
    width: 90,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  input: {
    width: 180,
    height: 40,
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text.primary,
    display: 'flex',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.status.error,
    borderWidth: 2,
  },
  inputFocus: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  // Enhanced Input Styles
  inputContainer: {
    width: 180,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  currencySymbol: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
    marginLeft: 4,
  },
  // Date Button Styles
  dateButton: {
    width: 180,
    height: 40,
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
  },
  dateArrow: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  // Custom Dropdown Styles
  dropdownContainer: {
    position: 'relative',
    width: 180,
    zIndex: 1000,
    // Ensure dropdown is above other elements
    elevation: 10,
  },
  dropdownButton: {
    height: 40,
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownButtonActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 8,
    transform: [{ rotate: '0deg' }],
  },
  dropdownArrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownList: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 250, // Increased height to show all items
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemSelected: {
    backgroundColor: colors.primary + '10', // Add transparency
  },
  dropdownItemEmoji: {
    fontSize: 18,
    marginRight: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  dropdownItemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default DataSavings;
