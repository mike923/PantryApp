# Frontend

## About

This is a [React Native app](https://reactnative.dev/) that helps people track their food inventory, which we call **Pantry**, by scanning your grocery reciepts to know whats in stock and what's not inorder to make your next grocery shopping a breeze.

## 🚨 Setting up your enviroment 🚨

- Follow the [React Native](https://reactnative.dev/docs/environment-setup) setup docs

- Download Simulators (Xcode only avaliable on iOS)

  - [Android Studio](https://developer.android.com/studio?gclid=EAIaIQobChMI5bPP9obN6AIVip-fCh3PggusEAAYASAAEgIyRfD_BwE&gclsrc=aw.ds)
  - [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

### Few things you might have to install following the docs

- `brew install node brew install watchman`

- `brew update && brew cask install react-native-debugger`

- `sudo gem install cocoapods`

- `npx react-native start` or `npx react-native run-ios`

- When getting an error starting ios simulator go to `cd /frontend/pantry/ios && pod install`

## To run the app

- If you don't already have the app: `git clone https://github.com/mike923/PantryApp.git`

- Install dependencies `cd frontend/pantry && npm install`

- Install pod changes in ios `cd /ios && pod install`

- Open iOS simulator `cd .. && npx react-native run-ios`

## To run the react-native-debugger

- ctrl + m (Android) or ⌘ + D (iOS)

## Useful Resources

- Setting up [Enviroment](https://reactnative.dev/docs/environment-setup)

- [React Native Navigation](https://reactnavigation.org/)

  - [Stack Navigation](https://reactnavigation.org/docs/stack-navigator/)
  - [Bottom Tab Navigation](https://reactnavigation.org/docs/tab-based-navigation)

- [React Native Components](https://reactnative.dev/docs/components-and-apis#user-interface)

- [React-Redux using hooks](https://react-redux.js.org/api/hooks#useselector-examples)

- [React-Native Debugger](https://github.com/jhen0409/react-native-debugger)
