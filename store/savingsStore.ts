import { SAVINGS_KEY } from '../constants/dataTypes';
import { Alert } from 'react-native';
import { storage } from '../utils/storage';

export const clearAllSavings = () => {
  Alert.alert('Czy na pewno chcesz wyczyścić wszystkie oszczędności?', '', [
    {
      text: 'Anuluj',
      style: 'cancel',
    },
    {
      text: 'Tak',
      onPress: () => {
        try {
          storage.delete(SAVINGS_KEY);
          Alert.alert('Pomyślnie usunięto dane.');
        } catch (error) {
          console.error('Błąd podczas czyszczenia danych:', error);
          Alert.alert(
            'Błąd',
            'Nie udało się wyczyścić danych. Spróbuj ponownie.',
          );
        }
      },
    },
  ]);
};
