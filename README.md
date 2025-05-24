# Quiz App

An interactive, modern quiz game that lets players test their knowledge across various topics. The app features dynamic question loading, real-time feedback, a timer, score tracking, and a persistent leaderboard—all wrapped in a visually engaging, responsive interface.

---

## Features

- **Dynamic Questions:** Loads questions from a JSON file or API, supporting a variety of topics.
- **Single Question View:** Presents one question at a time for focused gameplay.
- **Answer Selection & Feedback:** Players select an answer and receive instant feedback (correct/incorrect) before proceeding.
- **Score Tracking:** The app keeps track of the player's score throughout the game.
- **Timer:** Each question has a countdown timer. If time runs out, the question is marked incorrect and the game moves on.
- **Leaderboard:** High scores are saved locally and displayed at the end of each game.
- **Responsive Design:** The UI adapts seamlessly to mobile, tablet, and desktop screens.
- **Modern Look & Feel:** Clean, animated, and accessible interface.
- **Robust Error Handling:** Handles missing/invalid data and game logic errors gracefully.

---

## Gameplay

1. **Start the Game:**  
   The app loads a set of questions dynamically. The first question is displayed with multiple answer options.

2. **Answering Questions:**
    - Select an answer by clicking/tapping on it.
    - Immediate feedback is shown (correct/incorrect).
    - The game automatically advances to the next question after a short delay.

3. **Timer:**
    - Each question has a visible countdown timer.
    - If the timer reaches zero, the question is marked incorrect and the next question appears.

4. **End of Game:**
    - After the last question, your total score is displayed.
    - You can enter your name to save your score to the leaderboard.
    - The leaderboard shows the top scores (stored locally in your browser).

5. **Play Again:**
    - Restart the quiz at any time to try for a higher score!

---

## Setup & Running Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in Browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to play the quiz.

---

## Customizing Questions

- Questions are loaded from a JSON file or API.
- To use your own questions, edit the source in `/src/data/questions.json` or update the API endpoint in `/src/utils/api.ts`.
- Each question should have:
    - `question`: The question text (HTML entities supported)
    - `answers`: Array of possible answers
    - `correct_answer`: The correct answer string

---

## Technologies Used

- **React** (with TypeScript)
- **CSS Modules** for scoped, modern styling
- **LocalStorage** for leaderboard persistence

---

## Error Handling

- If questions fail to load or are invalid, a user-friendly error message is displayed.
- Game logic errors (e.g., double answer, timer issues) are handled gracefully to ensure a smooth experience.

---

## Accessibility & Responsiveness

- Fully keyboard navigable.
- High-contrast feedback and focus states.
- Responsive layout for all device sizes.

---

## License

MIT

---

**Enjoy testing your knowledge and competing for the top spot on the leaderboard!**