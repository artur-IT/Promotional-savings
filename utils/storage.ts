import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage adapter to mimic MMKV interface
export const storage = {
  getString: async (key: string): Promise<string | undefined> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value || undefined;
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
      return undefined;
    }
  },

  set: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item to AsyncStorage:', error);
    }
  },

  delete: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting item from AsyncStorage:', error);
    }
  },
};
