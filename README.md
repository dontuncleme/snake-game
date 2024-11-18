# snake-game
This project is a Snake game built with Vite, React, and TypeScript.

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Locally preview production build
npm run preview

# Run linters
npm run lint

# Run test check/coverage
npm run test
npm run test:coverage
```
### Tools and Setup

- **Linters:** ESLint, Stylelint, Prettier, and TypeScript checks with recommended configurations.
- **Testing:** Vitest, Happy DOM, React Testing Library.
- **CI/CD:** GitHub Actions workflow setup for continuous integration and deployment to Vercel.

I've included detailed comments throughout the code to explain the thought process and
implementation.

### Controls

You can control the snake with the arrows on the keyboard or WASD. You can pause, resume and start a new game by pressing space bar.

### Food

There are three types of food in the game as stated in the assignment. Special effects are implemented without additional conditions. For example, one food item inverts the controls for 30 seconds. The effect is applied without any additional conditions—control inversion lasts for the full 30 seconds, and it cannot be canceled early.

Every time the snake eats, a new food item will spawn on an available spot on the board.

### Mechanics

The game ends when the snake collides with itself or the edge of the board.

The player can restart the game after it ends.

The current game score and the best score are always displayed on the screen. The best score is saved in `localStorage` for persistence between game sessions. I chose this because it is the simplest way to store score, we only have one number there.

### Features

The board is limited in both width and height. The grid, snake body and food are rendered using SVG. Using D3 for rendering with React seems excessive and could potentially complicate things further. In Vanilla JS application it would make much more sense.

Initially the game was implemented using `setInterval` and `setTimeout`. But this approach turned out to be inefficient and error-prone. So I decided to rewrite the game in a different way. I implemented game loop using `requestAnimationFrame`. It takes the timestamp as input and calculates whether the move has been made or not. This also allowed to minimise the re-rendering triggers.

Responsive page has been implemented without changing the grid size. This ensures the game is not recreated with the screen size change.

The game automatically pauses when  the browser tab or window is changed.

### What’s next?

Improve the game accessibility. The good example on how to achieve this can be found here [https://www.24a11y.com/2019/game-accessibility-and-the-web/](https://www.24a11y.com/2019/game-accessibility-and-the-web/). Ideas include differentiating food types by color for better contrast, adding texts for voiceover support, etc.

Adding internationalisation support, even though the game initially has only English language.

Display game controls on the screen. This will allow touch screen users to play the game.

Some of the current unit tests are overcomplicated. E2E tests would be better for this. Adding Storybook and Playwright tests is a good improvement.
