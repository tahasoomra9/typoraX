# TyporaX

![Project Status](https://img.shields.io/badge/Status-Work_in_Progress-yellow)
![License](https://img.shields.io/badge/License-Open_Source-blue)

**TyporaX** is a modern, elegant typing speed test application designed to help users improve their touch typing. Built with a focus on aesthetics and user experience, it utilizes a glassmorphism design language and provides real-time performance tracking.

## - Features

### Core Functionality
*   **Dynamic Content:** Fetches random practice paragraphs from a JSON data source to ensure variety.
*   **Timer Options:** Selectable test durations of **15s, 30s, and 60s**.
*   **Smart Input Tracking:**
    *   Highlights correct characters.
    *   Flags incorrect entries in red.
    *   Supports backspacing to correct mistakes dynamically.
    *   "Blinking" active cursor for better visibility.

### Statistics & Data
*   **Real-time Metrics:** Displays Time Remaining, WPM (Words Per Minute), Mistake Count, and Accuracy % while you type.
*   **Persistent History:** Uses **Local Storage** to save your recent run history so your data isn't lost on refresh.
*   **Leaderboard System:** Automatically calculates and displays your **Top 3** best performances based on WPM.
*   **Data Management:** Option to clear your local history completely.

### Design
*   **Glassmorphism UI:** Features a translucent, frosted-glass aesthetic with modern typography (Inter & JetBrains Mono).
*   **Responsive Layout:** Fully adaptive design that works on desktops, tablets, and mobile devices.
*   **Visual Feedback:** Interactive hover states and focus animations.

## - Technologies Used

*   **HTML5** (Semantic structure)
*   **CSS3** (Variables, Flexbox, Grid, Backdrop-filter, Animations)
*   **JavaScript (ES6+)** (DOM manipulation, LocalStorage API, Fetch API, Game Logic)
*   **Fonts:** Inter (UI) and JetBrains Mono (Code/Typing).

## - Roadmap

The project is currently in active development. The following features are planned for future updates:

*   **Performance Graphs:** Visual charts to display WPM trends over the course of a single test or over time.
*   **Sound Effects:** Optional mechanical keyboard sounds and audio cues for errors.
*   **Caret Customization:** Options to change the cursor style (block, line, underline).
*   **Code Refactoring:** Further optimization of the event loop and state management.

## - Project Structure

```text
/
├── index.html       # Main application structure
├── styles.css       # Styling, themes, and responsive rules
├── main.js          # Game logic, timer, storage, and events
└── paragraphs.json  # Data source for typing text
```

## ⚡ How to Run

1.  Clone or Download this repository.
2.  Ensure `index.html`, `styles.css`, `main.js`, and `paragraphs.json` are in the same directory.

> **Important:** Because this project uses the `fetch` API to load the JSON file, browsers will block the request if you simply double-click `index.html` due to CORS (Cross-Origin Resource Sharing) policies.

### Run via Local Server:

*   **VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
*   **Python:** Open a terminal in the folder and run:

    ```bash
    python -m http.server
    ```


## 📄 License

This project is open source. Feel free to fork, modify, and learn from it.
