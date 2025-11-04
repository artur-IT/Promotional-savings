# DOKUMENTACJA PROJEKTU [PL] 

## Spis treści

<details>
<summary><a href="#funkcjonalność-przewijania-palcem-między-ekranami">Funkcjonalność przewijania palcem między ekranami</a></summary>

- [Opis zmian](#opis-zmian)
- [Dodane biblioteki](#dodane-biblioteki)
- [Implementacja](#implementacja)
- [Użycie](#użycie)
- [Techniczne szczegóły](#techniczne-szczegóły)
- [Zachowane funkcjonalności](#zachowane-funkcjonalności)
- [Uwagi](#uwagi)

</details>

<details>
<summary><a href="#komponent-goal---zarządzanie-celami-oszczędzania">Komponent Goal - Zarządzanie celami oszczędzania</a></summary>

- [Opis](#opis)
- [Główne komponenty](#główne-komponenty)
- [Przepływ danych](#przepływ-danych)
- [Zachowane funkcjonalności](#zachowane-funkcjonalności-1)

</details>

<details>
<summary><a href="#komponenty-historii---historia-oszczędności-i-celów">Komponenty Historii - Historia oszczędności i celów</a></summary>

- [Opis](#opis-1)
- [HistorySavings - Historia oszczędności](#historysavings---historia-oszczędności)
- [HistoryGoals - Historia celów](#historygoals---historia-celów)

</details>

<details>
<summary><a href="#komponenty-home---ekran-główny">Komponenty Home - Ekran główny</a></summary>

- [Opis](#opis-2)
- [Home.tsx - Główny ekran](#hometsx---główny-ekran)
- [YearSaving - Oszczędności z roku](#yearsaving---oszczędności-z-roku)
- [MonthSaving - Oszczędności z miesiąca](#monthsaving---oszczędności-z-miesiąca)
- [LastAdd - Ostatnie oszczędności](#lastadd---ostatnie-oszczędności)
- [Top - Komponent nagłówka](#top---komponent-nagłówka)

</details>

---

## Funkcjonalność przewijania palcem między ekranami

### Opis zmian

Dodano możliwość przewijania palcem (swipe) między ekranami aplikacji, zachowując przy tym oryginalną nawigację na dole ekranu.

### Dodane biblioteki

```json
  "react-native-pager-view": "^latest",
  "react-native-gesture-handler": "^latest"
```

### Implementacja

#### 1. Nowy komponent `SwipeableScreen`

Komponent opakowuje każdy ekran w `PagerView`, umożliwiając przewijanie palcem między wszystkimi ekranami aplikacji.

**Funkcjonalności:**
- Przewijanie palcem w lewo/prawo zmienia ekran
- Automatyczna synchronizacja z nawigacją na dole ekranu
- Reagowanie na zmiany nawigacji (np. kliknięcie zakładki)

**Kluczowe elementy:**
- `PagerView` - komponent do przewijania palcem
- `handlePageSelected` - obsługa zmiany strony przez przewijanie
- `useEffect` - synchronizacja z React Navigation

#### 2. Modyfikacje w `BottomTabNavigator`

Każdy ekran w `Tab.Navigator` jest teraz opakowany w `SwipeableScreen`, co zapewnia:
- Zachowanie oryginalnej nawigacji na dole
- Synchronizację między przewijaniem a zakładkami
- Działanie programowej nawigacji (np. `navigation.navigate()`)

### Użycie

**Przewijanie palcem:**
- Przesuń palcem w lewo/prawo na ekranie, aby przełączać między ekranami
- Przewijanie automatycznie aktualizuje aktywną zakładkę na dole

**Nawigacja przez zakładki:**
- Kliknij zakładkę na dole ekranu, aby przejść do konkretnego ekranu
- `PagerView` automatycznie synchronizuje się z wybraną zakładką

### Techniczne szczegóły

**Synchronizacja:**
- Przewijanie palcem → aktualizacja nawigacji (`navigation.navigate()`)
- Kliknięcie zakładki → aktualizacja `PagerView` (`pagerRef.current.setPage()`)
- Listener na zmiany stanu nawigacji → synchronizacja `PagerView`

### Zachowane funkcjonalności

✅ Oryginalna nawigacja na dole ekranu  
✅ Wszystkie ikony i style zakładek  
✅ Programowa nawigacja (`navigation.navigate()`)  
✅ Responsywność czcionek  
✅ Wszystkie istniejące funkcje aplikacji

### Uwagi

- Każdy ekran ma własny `PagerView` z wszystkimi ekranami, co pozwala na przewijanie z każdego miejsca
- Synchronizacja działa w obie strony (przewijanie ↔ nawigacja)
- `initialPage` w `PagerView` jest ustawiane na podstawie `screenIndex`, aby zachować poprawną pozycję startową

---

## Komponent Goal - Zarządzanie celami oszczędzania

### Opis

Komponent Goal to główny ekran aplikacji odpowiedzialny za zarządzanie celami oszczędzania. Pozwala użytkownikowi tworzyć nowe cele, edytować istniejące, śledzić postęp i przeglądać historię osiągniętych celów.

### Główne komponenty

#### 1. `Goal.tsx` - Główny ekran

**Funkcjonalności:**
- Wyświetla aktualny cel oszczędzania (jeśli istnieje)
- Dynamicznie zmienia przycisk między "Nowy" a "Edytuj" w zależności od stanu celu
- Umożliwia przejście do historii celów

**Jak działa:**
- `isGoalAchieved` - sprawdza czy suma oszczędności osiągnęła kwotę docelową
- Jeśli nie ma celu lub cel jest osiągnięty → pokazuje przycisk "Nowy"
- Jeśli cel jest aktywny (nie osiągnięty) → pokazuje przycisk "Edytuj"
- Animacja `fadeAnim` płynnie pokazuje/ukrywa formularz (`EditTargetForm`)
- Przycisk "Historia" prowadzi do ekranu z historią wszystkich celów

**Kluczowe elementy:**
- `getActualGoal()` - pobiera aktualny cel ze store (Zustand)
- `useMemo` - optymalizuje sprawdzanie czy cel jest osiągnięty
- `Animated.Value` - animacja pokazywania/ukrywania formularza

#### 2. `GoalProgress.tsx` - Wizualizacja postępu

**Funkcjonalności:**
- Wyświetla postęp w osiąganiu celu (pasek postępu, procenty, kwoty)
- Automatycznie oznacza cel jako zakończony gdy kwota docelowa zostanie osiągnięta
- Pokazuje motywacyjne wiadomości w zależności od postępu
- Wyświetla animację "słońca" gdy cel jest osiągnięty
- Działa w dwóch wariantach: `home` (ekran główny) i `goal` (ekran celów)

**Jak działa:**
- `calculateTotalPromotionSum()` - sumuje wszystkie oszczędności z promocjami w aktualnym celu
- `getMotivationalMessage()` - wybiera odpowiednią wiadomość na podstawie procentu postępu
- `useEffect` - automatycznie sprawdza wszystkie cele i oznacza je jako zakończone gdy suma oszczędności >= kwota docelowa
- `completedRef` - zapobiega wielokrotnemu oznaczeniu tego samego celu jako zakończony

**Kluczowe elementy:**
- `ProgressBar` - komponent z biblioteki `react-native-progress`
- `progressRatio` - stosunek zaoszczędzonej kwoty do kwoty docelowej (0-1)
- `progressPercent` - procent postępu (0-100%)

#### 3. `EditTargetForm.tsx` - Formularz dodawania/edycji

**Funkcjonalności:**
- Tworzenie nowego celu oszczędzania
- Edycja istniejącego celu (zmiana nazwy lub kwoty)
- Walidacja danych wejściowych
- Czyszczenie pól przyciskami "usuń"

**Jak działa:**
- W trybie edycji (`editGoal=true`) - wypełnia pola wartościami z aktualnego celu
- W trybie tworzenia (`editGoal=false`) - puste pola do wypełnienia
- Walidacja sprawdza:
  - Czy nazwa celu nie jest pusta
  - Czy nazwa celu nie jest liczbą
  - Czy kwota nie jest pusta
  - Czy kwota jest dodatnią liczbą
- Błędy wyświetlane przez żółte tło pola i czerwony placeholder
- Po zapisaniu - automatycznie nawiguje do ekranu "Home" i zamyka formularz

**Kluczowe elementy:**
- `addNewGoal()` - dodaje nowy cel do store
- `updateCurrentGoal()` - aktualizuje istniejący cel
- `onFormClose()` - callback do zamknięcia formularza (aktualizuje animację w `Goal.tsx`)
- `handleGoalNameFocus` / `handleTargetAmountFocus` - czyszczą błędy po kliknięciu w pole

### Przepływ danych

1. **Tworzenie celu:**
   ```
   Goal.tsx → kliknięcie "Nowy" → EditTargetForm → addNewGoal() → Store → GoalProgress pokazuje nowy cel
   ```

2. **Edycja celu:**
   ```
   Goal.tsx → kliknięcie "Edytuj" → EditTargetForm (wypełniony) → updateCurrentGoal() → Store → GoalProgress aktualizuje postęp
   ```

3. **Automatyczne zakończenie celu:**
   ```
   Dodanie oszczędności → GoalProgress sprawdza sumę → completeGoal() → Store → Cel otrzymuje endDate → Goal.tsx pokazuje przycisk "Nowy"
   ```

### Zachowane funkcjonalności

✅ Dynamiczne przyciski (Nowy/Edytuj) w zależności od stanu celu  
✅ Automatyczne wykrywanie osiągniętych celów  
✅ Animowane formularze z efektem fade  
✅ Motywacyjne wiadomości w zależności od postępu  
✅ Walidacja formularzy z czytelnymi komunikatami błędów  
✅ Historia celów (osobny ekran)  
✅ Dwukierunkowa synchronizacja między ekranami (Home ↔ Goal)

---

## Komponenty Historii - Historia oszczędności i celów

### Opis

Aplikacja zawiera dwa ekrany do przeglądania historii: **HistorySavings** (historia oszczędności) i **HistoryGoals** (historia osiągniętych celów). Oba ekrany pozwalają użytkownikowi na przeglądanie przeszłych danych i analizę postępów w oszczędzaniu.

### HistorySavings - Historia oszczędności

**Lokalizacja:** `screens/HistorySavings/HistorySavings.tsx`

#### Funkcjonalności

- **Wybór roku z dropdown** - użytkownik może wybrać konkretny rok do przeglądania oszczędności
- **Automatyczne wykrywanie dostępnych lat** - dropdown automatycznie wypełnia się latami, w których są zapisane oszczędności
- **Reset widoku przy pierwszym załadowaniu** - ekran zawsze zaczyna od widoku "wszystkie lata" przy pierwszym otwarciu
- **Animowane przejścia** - płynne animacje fade przy zmianie roku i otwieraniu/zamykaniu dropdown
- **Integracja z HistoryCalendar** - przekazuje wybrany rok do komponentu kalendarza

#### Jak działa

**Wybór roku:**
- Dropdown wyświetla wszystkie dostępne lata (posortowane od najnowszego)
- Opcja "Wybierz" pozwala wrócić do widoku wszystkich lat
- Po wyborze roku, kalendarz automatycznie filtruje i wyświetla oszczędności tylko z tego roku

**Automatyczne wykrywanie lat:**
- `useEffect` przeszukuje wszystkie cele (`allGoals`) i ich oszczędności
- Wyciąga unikalne lata z dat oszczędności
- Sortuje je od najnowszego do najstarszego
- Aktualizuje listę dostępnych lat w dropdown

**Reset widoku:**
- `useFocusEffect` resetuje wybrany rok do pustego stringa przy pierwszym załadowaniu ekranu
- `hasResetRef` zapobiega wielokrotnemu resetowaniu podczas jednej sesji
- Po opuszczeniu ekranu flag jest resetowany, więc przy następnym otwarciu widok znów się resetuje

**Animacje:**
- `fadeAnim` - animacja fade dla kalendarza przy zmianie roku (150ms)
- `dropdownAnimation` - animacja fade i scale dla dropdown (200ms)

#### Kluczowe elementy

- `selectYear` - stan przechowujący wybrany rok (pusty string = wszystkie lata)
- `availableYears` - tablica dostępnych lat do wyświetlenia w dropdown
- `showYearDropdown` - stan kontrolujący widoczność dropdown
- `useFocusEffect` - hook React Navigation do obsługi zdarzeń focus/blur ekranu
- `Animated.Value` - animacje React Native dla płynnych przejść

#### Komponent HistoryCalendar

Komponent `HistoryCalendar` (`components/HistorySaving/HistoryCalendar.tsx`) wyświetla rzeczywiste dane:

**Gdy rok nie jest wybrany:**
- Grupuje oszczędności według lat
- Wyświetla sumę oszczędności dla każdego roku
- Pokazuje prostą listę: Rok → Suma oszczędności

**Gdy rok jest wybrany:**
- Grupuje oszczędności według miesięcy (w języku polskim)
- Umożliwia rozwijanie/zwijanie miesięcy
- Wyświetla szczegóły każdej oszczędności: data, kategoria, kwota
- Pozwala usuwać pojedyncze oszczędności z aktywnego celu (przycisk ❌)
- Automatycznie rozwija pierwszy miesiąc przy załadowaniu

**Funkcje pomocnicze:**
- `groupByYear()` - grupuje oszczędności według lat
- `groupByMonth()` - grupuje oszczędności według miesięcy (z polskimi nazwami)
- `calculateMonthTotal()` - liczy sumę oszczędności w miesiącu
- `calculateYearTotal()` - liczy sumę oszczędności w roku
- `toggleMonth()` - rozwija/zwija miesiąc

**Na dole kalendarza:**
- Wyświetla zawsze całkowitą sumę wszystkich widocznych oszczędności (niezależnie od wybranego roku)

### HistoryGoals - Historia celów

#### Funkcjonalności

- **ScrollView** - zapewnia przewijanie dla długich list celów
- **Responsywny layout** - centrowanie i padding dla lepszego wyświetlania

#### Komponent HistoryGoalsComponent

**Funkcjonalności:**

- **Wyświetlanie osiągniętych celów** - pokazuje wszystkie cele z `endDate` (czyli osiągnięte)
- **Automatyczne oznaczanie osiągniętych celów** - sprawdza czy suma oszczędności osiągnęła kwotę docelową i automatycznie oznacza cel jako zakończony
- **Szczegółowe informacje o każdym celu**
- **Usuwanie wszystkich celów** - przycisk do usunięcia wszystkich osiągniętych celów z potwierdzeniem

#### Jak działa

**Automatyczne oznaczanie celów:**
- `useEffect` sprawdza wszystkie cele bez `endDate`
- Dla każdego celu liczy sumę wszystkich oszczędności (`promotion`)
- Jeśli suma >= kwota docelowa i obie wartości są > 0, oznacza cel jako osiągnięty
- Wywołuje `completeGoal()` ze store, która dodaje `endDate` do celu

**Filtrowanie osiągniętych celów:**
- `useMemo` filtruje cele z `endDate` (czyli osiągnięte)
- Zapobiega niepotrzebnym przeliczeniom przy zmianie danych

**Wyświetlanie danych:**
- Dla każdego osiągniętego celu wyświetla karty z informacjami
- `getDaysBetween()` - oblicza liczbę dni między pierwszą oszczędnością a datą osiągnięcia celu
- `calculateTotalPromotions()` - sumuje wszystkie promocje z oszczędności celu
- Formatuje daty w czytelny sposób (polski format)

**Usuwanie celów:**
- Przycisk "Usuń wszystkie cele!" pokazuje modal z potwierdzeniem
- `ConfirmationModal` wymaga potwierdzenia przed usunięciem
- Po potwierdzeniu wywołuje `deleteAllGoals()` ze store
- Usuwa tylko osiągnięte cele (te z `endDate`)

#### Kluczowe elementy

- `completedGoals` - memoizowana lista osiągniętych celów
- `useMemo` - optymalizacja filtrowania celów
- `useEffect` - automatyczne sprawdzanie i oznaczanie osiągniętych celów
- `ConfirmationModal` - modal z potwierdzeniem przed usunięciem
- `deleteAllGoals()` - funkcja ze store do usunięcia wszystkich celów

#### Przepływ danych

1. **Automatyczne oznaczanie celu jako osiągnięty:**
   ```
   Dodanie oszczędności → HistoryGoalsComponent sprawdza sumę → completeGoal() → Store dodaje endDate → Cel pojawia się w historii
   ```

2. **Usuwanie celów:**
   ```
   Kliknięcie "Usuń wszystkie" → Modal potwierdzenia → Potwierdzenie → deleteAllGoals() → Store → Cel znika z historii
   ```

### Zachowane funkcjonalności

✅ Wybór roku z dropdown w historii oszczędności  
✅ Automatyczne wykrywanie dostępnych lat  
✅ Reset widoku przy pierwszym załadowaniu ekranu  
✅ Animowane przejścia między widokami  
✅ Grupowanie oszczędności według lat i miesięcy  
✅ Rozwijanie/zwijanie miesięcy w kalendarzu  
✅ Usuwanie pojedynczych oszczędności z aktywnego celu  
✅ Automatyczne oznaczanie osiągniętych celów  
✅ Szczegółowe informacje o każdym osiągniętym celu  
✅ Usuwanie wszystkich celów z potwierdzeniem  
✅ Sumowanie oszczędności na różnych poziomach (miesiąc, rok, całkowita)

---

## Komponenty Home - Ekran główny

### Opis

Ekran Home to główny ekran aplikacji, który wyświetla podsumowanie oszczędności użytkownika. Składa się z kilku komponentów pokazujących różne statystyki: oszczędności z bieżącego roku, miesiąca, ostatnie dodane oszczędności oraz postęp w osiąganiu celu.

#### Funkcjonalności

- **Layout ekranu głównego** - organizuje wszystkie komponenty statystyczne
- **Tło z obrazkiem** - dekoracyjny obrazek sakiewki z pieniędzmi w tle (przezroczysty)
- **ScrollView** - umożliwia przewijanie ekranu jeśli zawartość jest za długa
- **Integracja komponentów** - łączy wszystkie komponenty statystyczne w jeden spójny widok

#### Jak działa

Ekran Home jest prostym kontenerem, który:
- Układa komponenty w odpowiedniej kolejności:
  1. `Top` - nagłówek aplikacji (z ukrytym obrazkiem)
  2. `YearSaving` - oszczędności z bieżącego roku
  3. `MonthSaving` i `LastAdd` - obok siebie w poziomie
  4. `GoalProgress` - postęp w osiąganiu celu (wariant "home")

### YearSaving - Oszczędności z roku

**Lokalizacja:** `components/Home/YearSaving.tsx`

#### Funkcjonalności

- **Wyświetla sumę oszczędności z bieżącego roku** - sumuje wszystkie oszczędności z wszystkich celów z aktualnego roku kalendarzowego
- **Automatyczna aktualizacja** - aktualizuje się automatycznie gdy dodawane są nowe oszczędności
- **Wyświetla aktualny rok** - pokazuje numer bieżącego roku

#### Jak działa

**Obliczanie sumy:**
- `calculateThisYearSavings()` - przeszukuje wszystkie cele (`getAllGoals()`)
- Dla każdego celu sprawdza wszystkie oszczędności (`savings`)
- Porównuje rok z daty oszczędności z bieżącym rokiem (`new Date().getFullYear()`)
- Sumuje wszystkie oszczędności (`promotion`) z bieżącego roku
- Jeśli nie ma celów, zwraca 0

**Aktualizacja:**
- `useEffect` reaguje na zmiany w `allGoals` (ze store Zustand)
- Automatycznie przelicza sumę gdy dodawane są nowe oszczędności lub cele
- Aktualizuje stan `thisYearTotal` i `thisYear`

#### Kluczowe elementy

- `getAllGoals()` - pobiera wszystkie cele ze store
- `allGoals` - obserwuje zmiany w celach ze store
- `calculateThisYearSavings()` - funkcja obliczająca sumę
- `useEffect` - automatyczna aktualizacja przy zmianie danych

### MonthSaving - Oszczędności z miesiąca

**Lokalizacja:** `components/Home/MonthSaving.tsx`

#### Funkcjonalności

- **Wyświetla sumę oszczędności z bieżącego miesiąca** - sumuje wszystkie oszczędności z aktualnego miesiąca kalendarzowego
- **Wyświetla nazwę miesiąca po polsku** - pokazuje nazwę bieżącego miesiąca (np. "Styczeń", "Luty")
- **Automatyczna aktualizacja** - aktualizuje się automatycznie gdy dodawane są nowe oszczędności

#### Jak działa

**Obliczanie sumy:**
- `getCurrentMonthData()` - pobiera aktualny miesiąc i rok
- Pobiera tablicę polskich nazw miesięcy
- Ustawia nazwę bieżącego miesiąca (`monthNames[currentMonth]`)
- Przeszukuje wszystkie cele i ich oszczędności
- Sprawdza czy data oszczędności pasuje do bieżącego miesiąca i roku
- Sumuje wszystkie oszczędności (`promotion`) z bieżącego miesiąca

**Aktualizacja:**
- `useEffect` reaguje na zmiany w `allGoals`
- Automatycznie przelicza sumę gdy dodawane są nowe oszczędności
- Aktualizuje stan `currentMonthSavings` i `currentMonthName`

**Wyświetlanie:**
- Wyświetla sumę w formacie: `+XX.XX zł` (duża czcionka 36px)
- Wyświetla nazwę miesiąca poniżej (25px)

#### Kluczowe elementy

- `getAllGoals()` - pobiera wszystkie cele ze store
- `allGoals` - obserwuje zmiany w celach ze store
- `getCurrentMonthData()` - funkcja obliczająca sumę i ustawiająca nazwę miesiąca
- `useEffect` - automatyczna aktualizacja przy zmianie danych
- Okrągły design z pomarańczowym tłem i czerwoną ramką

### LastAdd - Ostatnie oszczędności

**Lokalizacja:** `components/Home/LastAdd.tsx`

#### Funkcjonalności

- **Wyświetla dwie ostatnie oszczędności** - pokazuje kwoty z dwóch najnowszych oszczędności
- **Automatyczna aktualizacja** - aktualizuje się automatycznie gdy dodawane są nowe oszczędności
- **Sortowanie po dacie** - sortuje wszystkie oszczędności od najnowszych do najstarszych
- **Obsługa braku danych** - wyświetla "Brak danych" gdy nie ma oszczędności

#### Jak działa

**Wybieranie ostatnich:**
- Bierze pierwsze 2 elementy z posortowanej tablicy (`slice(0, 2)`)
- Wyciąga tylko kwoty (`promotion`) z tych dwóch oszczędności
- Zapisuje do stanu `lastTwoSavings`

**Aktualizacja:**
- `useEffect` reaguje na zmiany w `allGoals`
- Automatycznie pobiera nowe dane gdy dodawane są oszczędności

**Wyświetlanie:**
- Wyświetla dwie kwoty w formacie: `+XX.XX zł` (jedna pod drugą)
- Jeśli brak danych, wyświetla "Brak danych" (kursywą)

#### Kluczowe elementy

- `getAllGoals()` - pobiera wszystkie cele ze store
- `allGoals` - obserwuje zmiany w celach ze store
- `fetchLastSavings()` - funkcja pobierająca i sortująca oszczędności
- `useEffect` - automatyczna aktualizacja przy zmianie danych
- Obsługa błędów z try-catch

### Top - Komponent nagłówka

**Lokalizacja:** `components/Top.tsx`

#### Funkcjonalności

- **Nagłówek aplikacji** - wyświetla nazwę aplikacji "Promocyjne Oszczędności"
- **Opcjonalny obrazek** - może wyświetlać obrazek sakiewki (domyślnie wyświetlany)
- **SVG tło** - dekoracyjne tło z falistym kształtem (niebieski)
- **Responsywny design** - dostosowuje się do różnych rozmiarów ekranu

#### Kluczowe elementy

- `hideImage` - prop do kontrolowania widoczności obrazka
- `Svg` i `Path` - komponenty z `react-native-svg` do rysowania tła
- `PlaceholderImage` - obrazek sakiewki
- Responsywne pozycjonowanie elementów

#### Użycie w Home

### Integracja komponentów

Wszystkie komponenty Home są ze sobą zintegrowane przez:

1. **Wspólny store** - wszystkie używają `useSavingsStore` do pobierania danych
2. **Automatyczne aktualizacje** - wszystkie reagują na zmiany w `allGoals`
3. **Spójny design** - używają tych samych kolorów, czcionek i stylów
4. **Layout** - Home.tsx organizuje je w logicznej kolejności:
   - Nagłówek na górze
   - Oszczędności roczne (duży element)
   - Oszczędności miesięczne i ostatnie (obok siebie)
   - Postęp celu na dole

### Zachowane funkcjonalności

✅ Automatyczne obliczanie oszczędności z roku  
✅ Automatyczne obliczanie oszczędności z miesiąca  
✅ Wyświetlanie ostatnich dwóch oszczędności  
✅ Aktualizacja w czasie rzeczywistym przy dodawaniu oszczędności  
✅ Responsywny layout z przewijaniem  
✅ Dekoracyjne tło z obrazkiem sakiewki  
✅ Spójny design wszystkich komponentów  
✅ Obsługa braku danych  
✅ Integracja z komponentem postępu celu (wariant "home")

