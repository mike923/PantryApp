# Pantry App

_This is a [React Native app](https://reactnative.dev/) that helps people track their food inventory, which we call **Pantry**, by scanning your grocery receipts to know whats in stock and what's not inorder to make your next grocery shopping a breeze._

# Team

- [Voniel Brown](https://www.linkedin.com/in/vonielbrown/)
- [Jenesh Napit](https://www.linkedin.com/in/jeneshnapit/)
- [Michael Amparo](https://www.linkedin.com/in/michaeldamparo/)

## 🚨 Setting up your enviroment 🚨

- Follow the [React Native](https://reactnative.dev/docs/environment-setup) setup docs

- Download Simulators (Xcode only avaliable on iOS)

  - [Android Studio](https://developer.android.com/studio?gclid=EAIaIQobChMI5bPP9obN6AIVip-fCh3PggusEAAYASAAEgIyRfD_BwE&gclsrc=aw.ds)
  - [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

## Running iOS simulator on your iOS device

- Once you've downloaded Xcode signup for an [Apple Developer Account](https://developer.apple.com/).
- Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project)
- Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown.
- Do the same for the tests target (it ends with Tests, and is below your main target).
- Repeat this step for the Tests target in your project.

### Few things you might have to install following the docs

- `brew install node brew install watchman`

- `sudo gem install cocoapods`

- `npx react-native start` or `npx react-native run-ios`

- When getting an error starting ios simulator go to `cd /frontend/pantry/ios && pod install`

## To run the app

- If you don't already have the app: `git clone https://github.com/mike923/PantryApp.git`

- Install dependencies `cd frontend/pantry && npm install`

- Install pod changes in ios `cd /ios && pod install`

- Open iOS simulator `cd .. && npx react-native run-ios`

## To run the react-native-debugger

- For macOs use Homebrew Cask to install:
- `brew update && brew cask install react-native-debugger`

- This puts React Native Debugger.app in your /applications/ folder.

- run open "rndebugger://set-debugger-loc?host=localhost&port=8081" to open the debugger window

- run ctrl + m (Android) or ⌘ + D (iOS) in order to connect app to react-native-debugger

## Useful Resources

- Setting up [Enviroment](https://reactnative.dev/docs/environment-setup)

- [React Native Navigation](https://reactnavigation.org/)

- [Stack Navigation](https://reactnavigation.org/docs/stack-navigator/)

- [Bottom Tab Navigation](https://reactnavigation.org/docs/tab-based-navigation)

- [React Native Components](https://reactnative.dev/docs/components-and-apis#user-interface)

- [React-Redux using hooks](https://react-redux.js.org/api/hooks#useselector-examples)

- [React-Native Debugger](https://github.com/jhen0409/react-native-debugger)

- [Firebase Upload Tutorial](https://dev.to/younesh1989/upload-files-using-react-native-and-firebase-part-1-a7h)

## React Native Navigation Notes

- Routes can be accessed and interchanged between `<Stack.Screen/>` and `<Tab.Screen/>` when using the prop method navigate for navigation `navigation.navigate('route-name')`

## TypeScript Notes

- [Adding Typescript to React Native](https://github.com/Microsoft/TypeScript-React-Native-Starter)

- [Typescript JSX tutorial](https://www.typescriptlang.org/docs/handbook/jsx.html)

## Server Notes

- The back end server is running of port 8282
- Back end server deployed at [Pantry back end](https://pantry-backend.herokuapp.com/)

## React Native Firebase setup

- [Getting Started](https://rnfirebase.io/)

- [Using Firebase ML Kits](https://rnfirebase.io/ml-vision/usage)
  - [Text Recognition ML Kit](https://rnfirebase.io/ml-vision/text-recognition)
