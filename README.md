## 📱 Screenshots

<div style="display: flex; flex-wrap: nowrap; justify-content: center; gap: 0px; width:100%">
  <div style="display: flex; flex-direction: column; align-items: center; width: 30%; max-width: 250px;">
    <img src="./assets/images/screenshot_home.png" style="width: 30%;" alt="Home Screen" />
    <p style="text-align: center; margin-top: 5px;"><strong>Home Screen</strong></p>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 30%; max-width: 250px;">
    <img src="./assets/images/screenshot_goal.png" style="width: 30%;" alt="Goal Screen" />
    <p style="text-align: center; margin-top: 5px;"><strong>Goal Screen</strong></p>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 30%; max-width: 250px;">
    <img src="./assets/images/screenshot_add_saving.png" style="width: 30%;" alt="Add Saving Screen" />
    <p style="text-align: center; margin-top: 5px;"><strong>Add Saving Screen</strong></p>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 30%; max-width: 250px;">
    <img src="./assets/images/screenshot_history_savings.png" style="width: 30%;" alt="Savings History" />
    <p style="text-align: center; margin-top: 5px;"><strong>Savings History</strong></p>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 30%; max-width: 250px;">
    <img src="./assets/images/screenshot_history_goals.png" style="width: 30%;" alt="Goals History" />
    <p style="text-align: center; margin-top: 5px;"><strong>Goals History</strong></p>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; width: 30%; max-width: 250px;">
    <img src="./assets/images/screenshot_about.png" style="width: 30%;" alt="About Screen" />
    <p style="text-align: center; margin-top: 5px;"><strong>About Screen</strong></p>
  </div>
</div>

# 💰 Promotional Savings [PL Aapp]

A free mobile application for Android phones that helps users track money saved through promotions and deals. The app allows setting financial goals and monitoring progress in achieving them.

Works offline!

### ✨ Main Features

- **📊 Savings tracking** - Adding and categorizing saved amounts
- **🎯 Goal management** - Setting and monitoring financial goals
- **📅 History** - Monthly and yearly savings history
- **🏆 Goal history** - Overview of all achieved goals
- **💾 Local storage** - Data stored locally on the device

### 🔄️ User Data Flow

(it's svg - open in new window to full size for better readibilty)

<div align="center">
  <a href="./assets/images/user_flow_diagram.svg" target="_blank" rel="noopener noreferrer">
    <img src="./assets/images/user_flow_diagram.svg" style="width: 50%; max-width: 600px;" alt="User Flow Diagram" />
  </a>
</div>

### 🏗️ Application Architecture

#### Screens

- **Home** - Main screen with summary and navigation
- **AddSaving** - Adding new savings
- **Goal** - Managing financial goals
- **HistorySavings** - History of all savings
- **HistoryGoals** - History of achieved financial goals

#### State Management

- **Zustand** - Main store for savings
- **ASync Storage** - Fast, local data storage

#### Components

- **UI Components** - Buttons, forms, progress bars
- **Business Components** - Logic related to savings and goals

## 🛠️ Technologies

- **React Native 0.80.0** - Mobile framework
- **TypeScript** - Static typing
- **React Navigation** - Screen navigation
- **Zustand** - Application state management
- **ASync Storage** - Fast data storage
- **React Native Calendars** - Calendar components
- **React Native Progress** - Progress bars
- **Date-fns** - Date manipulation

## 🚀 Installation and Setup

### Installation

1. **Clone the repository**

`git clone https://github.com/artur-IT/Promotional-savings.git`

`cd Promotional-savings`

2. **Install dependencies** - `npm install`
3. **Run Metro bundler** - `npx react-native run-android` (Automatically starts Metro)
4. **Compile to APK file** - in the android folder run

`.\gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a`

After the build completes, the APK file will be at:
`android/app/build/outputs/apk/release/app-release.apk`

### 📱 Running on Device

- **Android**: Connect device via USB with developer mode enabled and use Android Studio emulator or upload the APK file and install the app.

## 🎨 Detailed Features

### Adding Savings

- Enter saved amount
- Choose savings category
- Select savings date

### Financial Goals

- Financial goal name
- Setting target amount
- Real-time progress tracking
- Progress bar visualization
- History of completed goals
- Savings history

### Statistics

- Monthly and yearly summaries
- Recently added savings

## 🔧 Troubleshooting

### Common Issues

1. **Metro bundler won't start** - ` npx react-native start --reset-cache`

2. **Dependency issues** - `rm -rf node_modules
npm install`

3. **Android issues**

   cd android
   `./gradlew clean`
   cd ..
   ` npm run android`

More information in the [official troubleshooting documentation](https://reactnative.dev/docs/troubleshooting).

<br />

## <span style="font-size: 24px">🙂</span>Do you like it?

You can buy for us 💑 coffee <a href="https://buycoffee.to/artur-dev" target="_blank" rel="noopener noreferrer"><span style="font-size: 32px">☕</span></a>
