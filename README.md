# Quiz Component (MAIN Component)

The Quiz component is a React-based quiz application that supports multiple languages. Users can select a language, answer questions, and view their score at the end of the quiz.

![Clock App Screenshot](./.github/screen.png)

## Functionality

### useState Hooks

- **index**: Tracks the current question index.
- **question**: Holds the current question object.
- **lock**: Prevents multiple answers for a single question.
- **score**: Tracks the user's score.
- **result**: Indicates if the quiz has ended.
- **language**: Stores the selected language.

### useRef Hooks

- **Option1, Option2, Option3, Option4**: References for each option to handle user interaction.

### Functions

- **selectLanguage(lang)**: Sets the selected language and loads the first question in that language.
- **checkAns(e, ans)**: Checks the selected answer against the correct answer. Updates the score if correct and provides immediate feedback.

- **next()**: Moves to the next question when the "Next" button is clicked. If on the last question, displays the final score.

- **reset()**: Resets the quiz to the initial state, allowing users to start over.

## Conditional Rendering

If no language is selected, renders language selection buttons (English, Hungarian, German).

Once a language is selected, renders:

- Quiz title
- Current question with options
- Next button to proceed to the next question
- Score and reset button when all questions are answered
