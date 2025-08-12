# 💰 Promocyjne Oszczędności

Aplikacja mobilna do śledzenia oszczędności z promocji i zarządzania celem finansowym.

## 📱 O aplikacji

**Promocyjne Oszczędności** to intuicyjna aplikacja mobilna, która pomaga użytkownikom śledzić pieniądze zaoszczędzone dzięki promocjom i okazjom. Aplikacja umożliwia ustawianie celów finansowych i monitorowanie postępów w ich realizacji.

### ✨ Główne funkcjonalności

- **📊 Śledzenie oszczędności** - Dodawanie i kategoryzowanie zaoszczędzonych kwot
- **🎯 Zarządzanie celami** - Ustawianie i monitorowanie celów finansowych
- **📈 Statystyki** - Przegląd oszczędności miesięcznych i rocznych
- **📅 Historia** - Pełna historia oszczędności z kalendarzem
- **🏆 Historia celów** - Przegląd wszystkich realizowanych celów
- **💾 Lokalne przechowywanie** - Dane zapisywane lokalnie na urządzeniu

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

```bash
git clone https://github.com/artur-IT/Promotional-savings.git
cd Promotional-savings
```

2. **Zainstaluj zależności** - npm install
3. **Uruchom Metro bundler** - npx react-native run-android (Automatycznie uruchamia Metro w osobnym oknie node)

### 📱 Uruchamianie na urządzeniu

- **Android**: Podłącz urządzenie przez USB z włączonym trybem dewelopera i użyj emulatora z Android Studio

## 📂 Struktura projektu

```
├── screens/                 # Ekrany aplikacji
│   ├── Home/                # Ekran główny
│   ├── AddSaving/           # Dodawanie oszczędności
│   ├── Goal/                # Zarządzanie celami
│   ├── HistorySavings/      # Historia oszczędności
│   └── HistoryGoals/        # Historia celów
├── components/              # Komponenty wielokrotnego użytku
│   ├── AddSaving/           # Komponenty dodawania oszczędności
│   ├── Goal/                # Komponenty celów
│   ├── Home/                # Komponenty ekranu głównego
│   └── HistorySaving/       # Komponenty historii
├── store/                   # Zarządzanie stanem
│   ├── useSavingsStore_Zustand.ts  # Store oszczędności
│   ├── savingsStore.ts      # Dodatkowy store
│   └── goalsStore.ts        # Store celów
├── constants/               # Stałe aplikacji
│   ├── colors.ts            # Paleta kolorów
│   └── dataTypes.ts         # Typy danych
├── utils/                   # Narzędzia pomocnicze
│   └── storage.ts           # Konfiguracja MMKV
├── assets/                  # Zasoby statyczne
│   ├── fonts/               # Czcionki
│   └── images/              # Obrazy i ikony
└── types/                   # Definicje typów TypeScript
```

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

### Statystyki i raporty

- Podsumowanie miesięczne i roczne
- Ostatnio dodane oszczędności
- Wizualny wykres postępu

### Przechowywanie danych

- Wszystkie dane przechowywane lokalnie
- Szybki dostęp dzięki MMKV
- Automatyczne przywracanie stanu aplikacji

## 🔧 Rozwój aplikacji

### Stylowanie

- Kolory zdefiniowane w `constants/colors.ts`
- Responsywny design dostosowany do różnych rozmiarów ekranów
- Spójny system designu w całej aplikacji

## 🐛 Rozwiązywanie problemów

### Typowe problemy

1. **Metro bundler nie startuje**

   ```bash
   npx react-native start --reset-cache
   ```

2. **Problemy z zależnościami**

   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Problemy z Androidem**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

Więcej informacji w [oficjalnej dokumentacji troubleshooting](https://reactnative.dev/docs/troubleshooting).

---
