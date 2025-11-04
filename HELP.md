

### Lista emulatorów telefonów
`emulator -list-avds`

### Uruchom emulator telefonu Small Phone
`emulator -avd Small_Phone`

### Zbuduj aplikację ponownie
  `cd android`
  `.\gradlew.bat clean`
  `npx run android`

### Przed kompilacja do Google Play zmień wersję w: 
`cd android\app\build.gradle`
versionCode 4
versionName "1.3.0"

### Aplikacja sie kompiluje, ALE nie uruchamia na emulatorze adb
Czy emulator telefonu uruchamia się w Android Studio?
Nie - usuń emulator i stwórz nowy, uruchom go.


---
### TESTY
`npm run test:watch` - Obserwuje tylko pliki związane z ostatnimi zmianami (inteligentny tryb)

`npm run test:watchAll` - Obserwuje wszystkie pliki i uruchamia wszystkie testy przy każdej zmianie. Wolniejszy, ale bardziej kompletny.