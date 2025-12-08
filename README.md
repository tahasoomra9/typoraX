# TyporaX

**[WORK IN PROGRESS]**

This project is currently under active development. Features, design, and functionality are subject to change.

## Description

TyporaX is a modern, browser-based typing speed test application. It allows users to practice touch typing by providing random paragraphs and tracking performance metrics such as Words Per Minute (WPM) and error rates in real-time. The interface utilizes a glassmorphism design style for a clean, modern aesthetic.

## Features

*   **Timer Selection:** Users can choose between 15s, 30s, and 60s test durations.
*   **Real-time Stats:** Displays time left, current WPM, and mistake count dynamically while typing.
*   **Visual Feedback:**
    *   Correct characters are highlighted.
    *   Incorrect characters are marked in red.
    *   Active cursor blinker tracks current position.
*   **Responsive Design:** Adapts to different screen sizes, with a collapsible sidebar on mobile devices.
*   **Random Content:** Fetches practice paragraphs randomly from a JSON data source.

## Planned Features (To-Do)

*   **Sound Effects:** Implementation of typing sounds and error alerts (UI toggle exists, logic pending).
*   **Local Storage:** Saving recent scores and history to the browser.
*   **Leaderboard:** Logic to sort and display top scores.
*   **WPM Hiding:** Functionality for the "Show WPM" toggle to hide stats during the test for better focus.
*   **Code Refactoring:** Optimizing the main JavaScript loop and event listeners.

## Technologies Used

*   HTML5
*   CSS3 (Custom variables, Flexbox, Grid, Glassmorphism effects)
*   Vanilla JavaScript (ES6+)

## Project Structure

*   `index.html`: The main structure of the application.
*   `styles.css`: Contains all styling, animations, and responsive rules.
*   `main.js`: Handles game logic, timer, WPM calculation, and DOM manipulation.
*   `paragraphs.json`: A data file containing the text samples used for the typing tests.

## How to Run

1.  Clone or download this repository.
2.  Ensure all files (`index.html`, `styles.css`, `main.js`, `paragraphs.json`) are in the same directory.
3.  Open `index.html` in any modern web browser.

**Note:** Because this project uses `fetch` to load the JSON file, you may encounter CORS errors if you open the file directly via the file protocol (file://). It is recommended to run this using a local server (e.g., Live Server in VS Code or Python's http.server).

## License

This project is open source.
