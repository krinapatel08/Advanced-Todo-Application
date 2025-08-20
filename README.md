# React Todo App

A modern, feature-rich Todo application built with React.js. This app includes priority management, filtering, local storage persistence, and a beautiful responsive UI.

## Features

- ✅ Add, edit, and delete todos
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Filter todos (All, Active, Completed)
- 💾 Local storage persistence
- 📱 Responsive design
- ⚡ Real-time statistics
- 🎨 Modern UI with animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Form for adding new todos
│   ├── TodoList.jsx      # List of todos
│   ├── TodoItem.jsx      # Individual todo item
│   └── TodoFilters.jsx   # Filter and statistics
├── contexts/
│   └── TodoContext.jsx   # React Context for state management
├── hooks/
│   ├── useClickOutside.js # Hook for detecting clicks outside elements
│   ├── useDebounce.js     # Hook for debouncing input
│   └── useLocalStorage.js # Hook for localStorage management
├── utils/
│   ├── dateUtils.js       # Date formatting utilities
│   └── priorityUtils.js   # Priority management utilities
├── App.jsx               # Main App component
├── App.css              # Main styles
├── index.js             # Entry point
└── index.css            # Global styles
```

## Technologies Used

- **React 18** - UI library
- **React Context API** - State management
- **CSS3** - Styling with modern features
- **Local Storage** - Data persistence

## Usage

1. **Adding Todos**: Type in the input field and press Enter or click the Add button
2. **Setting Priority**: Use the priority dropdown when adding a todo, or click the priority badge to change it
3. **Completing Todos**: Click the checkbox next to a todo
4. **Editing Todos**: Double-click on the todo text or click the edit button
5. **Deleting Todos**: Click the delete button
6. **Filtering**: Use the filter tabs to view different todo states
7. **Clearing Completed**: Click "Clear completed" to remove all completed todos

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
