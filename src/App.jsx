import React from "react";
import { TodoProvider } from "./contexts/TodoContext";
import Stats from "./components/Stats";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";

export default function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-md">Advanced Todo Manager</h1>
            <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">Stay organized, boost productivity, and never miss a task 🚀</p>
          </div>
        </header>
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
            <Stats />
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100"><TodoForm /></div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <TodoFilters />
              <div className="mt-6"><TodoList /></div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-900 text-gray-400 py-5 text-center text-sm">
          <p>
            Made with ❤️ by {" "}
            <a href="https://www.linkedin.com/in/krinap08/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-semibold hover:underline">Krina Patel</a> © 2025
          </p>
        </footer>
      </div>
    </TodoProvider>
  );
}
