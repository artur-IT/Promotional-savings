# PROJECT STILL IN PROGRESS...

# 💰 Promocyjne Oszczędności

Aplikacja mobilna do śledzenia oszczędności z promocji i zarządzania celem finansowym.

## 📱 O aplikacji

**Promocyjne Oszczędności** to intuicyjna aplikacja mobilna, która pomaga użytkownikom śledzić pieniądze zaoszczędzone dzięki promocjom i okazjom. Aplikacja umożliwia ustawianie celów finansowych i monitorowanie postępów w ich realizacji.

### ✨ Główne funkcjonalności

- **📊 Śledzenie oszczędności** - Dodawanie i kategoryzowanie zaoszczędzonych kwot
- **🎯 Zarządzanie celami** - Ustawianie i monitorowanie celów finansowych
- **📈 Statystyki** - Przegląd oszczędności miesięcznych i rocznych
- **📅 Historia** - Pełna historia oszczędności z kalendarzem
- **🏆 Historia celów** - Przegląd wszystkich zrealizowanych celów
- **💾 Lokalne przechowywanie** - Dane zapisywane lokalnie na urządzeniu

### 🔄️ Przepływ danych użytkownika

![User Flow Diagram](./assets/images/user_flow_diagram.svg)

### 🏗️ Architektura aplikacji

#### Ekrany (Screens)

- **Home** - Ekran główny z podsumowaniem i nawigacją
- **AddSaving** - Dodawanie nowych oszczędności
- **Goal** - Zarządzanie celem finansowym
- **HistorySavings** - Historia wszystkich oszczędności
- **HistoryGoals** - Historia celów finansowych

#### Zarządzanie stanem

- **Zustand** - Główny store dla oszczędności
- **MMKV** - Szybkie, lokalne przechowywanie danych
- **Persist middleware** - Automatyczne zapisywanie stanu

#### Komponenty

- **Komponenty UI** - Przyciski, formularze, pasek postępu
- **Komponenty biznesowe** - Logika związana z oszczędnościami i celami

## 🛠️ Technologie

- **React Native 0.80.0** - Framework mobilny
- **TypeScript** - Typowanie statyczne
- **React Navigation** - Nawigacja między ekranami
- **Zustand** - Zarządzanie stanem aplikacji
- **MMKV** - Szybkie przechowywanie danych
- **React Native Calendars** - Komponenty kalendarza
- **React Native Progress** - Paski postępu
- **Date-fns** - Manipulacja datami

## 🚀 Instalacja i uruchomienie

### Wymagania wstępne

Upewnij się, że masz skonfigurowane środowisko React Native zgodnie z [oficjalnym przewodnikiem](https://reactnative.dev/docs/set-up-your-environment).

### Instalacja

1. **Sklonuj repozytorium**

`git clone https://github.com/artur-IT/Promotional-savings.git`

`cd Promotional-savings`

2. **Zainstaluj zależności** - `npm install`
3. **Uruchom Metro bundler** - `npx react-native run-android` (Automatycznie uruchamia Metro w osobnym oknie node)
4. **Kompilacja do pliku apk** - w folderze android uruchom

`.\gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a`

(Przed pierwszym buildem upewnij się, że masz uruchomiony Metro bundler!
`npx react-native start`)

Po zakończeniu budowania, plik APK będzie w:
`android/app/build/outputs/apk/release/app-release.apk`

Jeśli chcesz mniejszy APK, możesz zbudować tylko dla określonej architektury:

cd android
`./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a`

### 📱 Uruchamianie na urządzeniu

- **Android**: Podłącz urządzenie przez USB z włączonym trybem dewelopera i użyj emulatora z Android Studio lub wgraj plik apk i zainstaluj aplikację.

## 🎨 Funkcjonalności szczegółowe

### Dodawanie oszczędności

- Wprowadzanie kwoty zaoszczędzonej
- Wybór kategorii oszczędności
- Wybór daty oszczędności

### Cele finansowe

- Ustawianie docelowej kwoty
- Śledzenie postępu w czasie rzeczywistym
- Wizualizacja za pomocą paska postępu
- Historia zakończonych celów
- Histporia oszczędności

### Statystyki i raporty

- Podsumowanie miesięczne i roczne
- Ostatnio dodane oszczędności

### Przechowywanie danych

- Wszystkie dane przechowywane lokalnie
- Szybki dostęp dzięki MMKV

## 🔧 Rozwój aplikacji

- Hmmmm

## 🐛 Rozwiązywanie problemów

### Typowe problemy

1. **Metro bundler nie startuje** - ` npx react-native start --reset-cache`

2. **Problemy z zależnościami** - `rm -rf node_modules
npm install`

3. **Problemy z Androidem**

   cd android
   `./gradlew clean`
   cd ..
   ` npm run android`

Więcej informacji w [oficjalnej dokumentacji troubleshooting](https://reactnative.dev/docs/troubleshooting).

---
