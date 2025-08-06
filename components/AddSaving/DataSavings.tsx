import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState, forwardRef } from 'react';
import Button from '../../components/Button';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

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

// Używam forwardRef, aby umożliwić przekazanie referencji do tego komponentu
const DataSavings = forwardRef<{ resetForm: () => void }>(() => {
  const addNewGoal = useSavingsStore(state => state.addNewGoal);
  const navigation = useNavigation();

  const [promotion, setPromotion] = useState<number>();
  const [category, setSelectedCategory] = useState<string>('');
  const [date, setSelectedDate] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState<{
    promotion?: number;
    date?: string;
    category?: string;
  }>({});

  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

  const handlePromotionalChange = (value: string) => {
    setPromotion(Number(value));
    if (errors.promotion) {
      setErrors(prev => ({ ...prev, promotion: undefined }));
    }
  };

  // Aktualizacja daty
  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    // Usuwamy błąd po wybraniu daty
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: undefined }));
    }
  };

  // Aktualizacja kategorii
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Usuwamy błąd po wybraniu kategorii
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: undefined }));
    }
  };

  // Funkcja formatująca datę z YYYY-MM-DD na DD.MM.YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Wybierz datę';

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const clearForm = () => {
    setPromotion(0);
    setSelectedDate('');
    setSelectedCategory('');
    setErrors({});
  };

  // Funkcja walidująca formularz
  const validateForm = () => {
    const newErrors: {
      promotion?: string;
      date?: string;
      category?: string;
    } = {};
    let isValid = true;

    if (Number(promotion) <= 0) {
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

    // Ustawiamy błędy, upewniając się, że typy się zgadzają
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
        addNewGoal({
          id: Date.now(),
          startDate: date,
          savings: {
            id: Date.now(),
            promotion: promotion || 0,
            date,
            category,
          },
        });
        clearForm();
        Alert.alert('Sukces', 'Oszczędność została zapisana pomyślnie!');
        (navigation as any).navigate('Home');
      } catch (error) {
        console.error('Błąd podczas zapisywania danych:', error);
        Alert.alert(
          'Błąd',
          'Wystąpił problem podczas zapisywania danych. Spróbuj ponownie.',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* VALUE */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <View>
          <TextInput
            style={[styles.input, errors.promotion ? styles.inputError : null]}
            keyboardType="numeric"
            value={promotion?.toString() || ''}
            onChangeText={handlePromotionalChange}
            onFocus={() => setPromotion(undefined)}
          />
          {errors.promotion && (
            <Text style={styles.errorText}>{errors.promotion}</Text>
          )}
        </View>
      </View>

      {/* DATE */}
      <View style={styles.row}>
        <Text style={styles.label}>Data</Text>
        <View>
          <TouchableOpacity
            style={[styles.input, errors.date ? styles.inputError : null]}
            onPress={() => setShowCalendar(true)}
          >
            <Text>{formatDate(date)}</Text>
          </TouchableOpacity>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>
      </View>

      {/* CATEGORY */}
      <View style={styles.row}>
        <Text style={styles.label}>Kategoria</Text>

        <View style={[styles.picker]}>
          <Picker selectedValue={category} onValueChange={handleCategoryChange}>
            <Picker.Item label="Wybierz kategorię" value="" />
            <Picker.Item label="Żywność" value="Żywność" />
            <Picker.Item label="Paliwo" value="Paliwo" />
            <Picker.Item label="Ubrania" value="Ubrania" />
            <Picker.Item label="Inne" value="Inne" />
          </Picker>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>
      </View>

      {/* Modal z kalendarzem */}
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
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
          onPress={() => (navigation as any).navigate('Home')}
        />
      </View>
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
    width: 130,
    height: 35,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 10,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  picker: {
    display: 'flex',
    justifyContent: 'center',
    width: 130,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
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
