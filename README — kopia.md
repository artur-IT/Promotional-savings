# PROJECT STILL IN PROGRESS...

# 💰 Promocyjne Oszczędności

Darmowa aplikacja mobilna na telefony z Androidem, która pomaga użytkownikom śledzić pieniądze zaoszczędzone dzięki promocjom i okazjom. Aplikacja umożliwia ustawianie celów finansowych i monitorowanie postępów w ich realizacji.

Działa offline!

### ✨ Główne funkcjonalności

- **📊 Śledzenie oszczędności** - Dodawanie i kategoryzowanie zaoszczędzonych kwot
- **🎯 Zarządzanie celami** - Ustawianie i monitorowanie celu finansowego
- **📅 Historia** - Historia oszczędności miesiecznych i rocznych
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
- **HistoryGoals** - Historia osiągniętych celów finansowych

#### Zarządzanie stanem

- **Zustand** - Główny store dla oszczędności
- **MMKV** - Szybkie, lokalne przechowywanie danych

#### Komponenty

- **Komponenty UI** - Przyciski, formularze, pasek postępu
- **Komponenty biznesowe** - Logika związana z oszczędnościami i celami

## 🛠️ Technologie

- **React Native 0.80.0** - Framework mobilny
- **TypeScript** - Typowanie statyczne
- **React Navigation** - Nawigacja między ekranami
- **Zustand** - Zarządzanie stanem aplikacji
- **ASync Storage** - Szybkie przechowywanie danych
- **React Native Calendars** - Komponenty kalendarza
- **React Native Progress** - Paski postępu
- **Date-fns** - Manipulacja datami

## 🚀 Instalacja i uruchomienie

### Instalacja

1. **Sklonuj repozytorium**

`git clone https://github.com/artur-IT/Promotional-savings.git`

`cd Promotional-savings`

2. **Zainstaluj zależności** - `npm install`
3. **Uruchom Metro bundler** - `npx react-native run-android` (Automatycznie uruchamia Metro)
4. **Kompilacja do pliku apk** - w folderze android uruchom

`.\gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a`

Po zakończeniu budowania, plik APK będzie w:
`android/app/build/outputs/apk/release/app-release.apk`

### 📱 Uruchamianie na urządzeniu

- **Android**: Podłącz urządzenie przez USB z włączonym trybem dewelopera i użyj emulatora z Android Studio lub wgraj plik apk i zainstaluj aplikację.

## 🎨 Funkcjonalności szczegółowe

### Dodawanie oszczędności

- Wprowadzanie kwoty zaoszczędzonej
- Wybór kategorii oszczędności
- Wybór daty oszczędności

### Cele finansowe

- Nazwa celu finansowego
- Ustawianie docelowej kwoty
- Śledzenie postępu w czasie rzeczywistym
- Wizualizacja za pomocą paska postępu
- Historia zakończonych celów
- Historia oszczędności

### Statystyki

- Podsumowanie miesięczne i roczne
- Ostatnio dodane oszczędności

## 🔧 Rozwój aplikacji

- Hmmm

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

<span style="font-size: 24px">👌</span> Jeśli Ci się podoba, możesz kupić nam 💑 kawę
<a href="https://buycoffee.to/artur-dev" target="_blank"><span style="font-size: 32px">☕</span></a>
