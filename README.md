# Quiz App

A simple and interactive Quiz App built with React Native that allows users to browse and take quizzes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of available quizzes.
- Start quizzes and answer questions.
- User-friendly interface.
- Responsive design for various devices.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/PRIYANSHUSINGH2003/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have the required environment set up:
   - [Node.js](https://nodejs.org/en/) (>= 14)
   - [Java JDK](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (>= 17, <= 20)
   - [Android Studio](https://developer.android.com/studio) with Android SDK
   - [React Native CLI](https://reactnative.dev/docs/environment-setup)

4. Set up Android environment variables:
   - Set `ANDROID_HOME` to the path of your Android SDK (e.g., `C:\Users\<Your_Username>\AppData\Local\Android\Sdk`).
   - Update your `PATH` environment variable to include:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`

## Usage

1. Start the development server:
   ```bash
   npx react-native start
   ```

2. In a new terminal, run the Android app:
   ```bash
   npx react-native run-android
   ```

3. If you want to test on a physical device, make sure USB debugging is enabled and connect the device.

## Technologies Used

- [React Native](https://reactnative.dev/) - Framework for building native apps using React.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for making API requests.
- [React Navigation](https://reactnavigation.org/) - Routing and navigation library for React Native.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1. Fork the project.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
