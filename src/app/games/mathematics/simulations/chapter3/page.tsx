'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/language-context';
import {
  Check,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Smile,
  Frown,
} from 'lucide-react';

// --- Helper Functions ---

/** Generates a random whole number for the game. */
const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- Initial Game State Setup ---

interface GameState {
  currentNumber: number;
  goal: 'successor' | 'predecessor';
  targetAnswer: number;
  userAnswer: string;
  message: string;
  isCorrect: boolean;
}

const initializeGameState = (): GameState => {
  const currentNumber = generateRandomNumber(10, 99); // Use 2-digit numbers for Class 6
  const goal = Math.random() < 0.5 ? 'successor' : 'predecessor';
  const targetAnswer =
    goal === 'successor' ? currentNumber + 1 : currentNumber - 1;

  return {
    currentNumber,
    goal,
    targetAnswer,
    userAnswer: '',
    message: '',
    isCorrect: false,
  };
};

// --- React Component ---

const NumberLineHopscotchGame: React.FC = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] =
    useState<GameState>(initializeGameState);
  const {
    currentNumber,
    goal,
    targetAnswer,
    userAnswer,
    message,
    isCorrect,
  } = gameState;
  const isPredecessorGoal = goal === 'predecessor';

  // Resets the entire game with a new number and a new goal
  const handleNewGame = useCallback(() => {
    setGameState(initializeGameState());
  }, []);

  // Handler for updating the user's input
  const handleAnswerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow numeric input
      const value = e.target.value.replace(/[^0-9]/g, '');
      setGameState((prev) => ({
        ...prev,
        userAnswer: value,
        message: '',
        isCorrect: false,
      }));
    },
    []
  );

  // Checks the user's constructed number against the target number
  const checkAnswer = useCallback(() => {
    const userNum = parseInt(userAnswer, 10);

    if (isNaN(userNum)) {
      setGameState((prev) => ({
        ...prev,
        message: 'Please enter a number before checking!',
      }));
      return;
    }

    const isAnswerCorrect = userNum === targetAnswer;

    if (isAnswerCorrect) {
      setGameState((prev) => ({
        ...prev,
        message: `🎉 Correct! The ${goal} is ${targetAnswer}. Hop to the next level!`,
        isCorrect: true,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        message: `❌ Incorrect. The ${goal} of ${currentNumber} is not ${userNum}. Try again!`,
      }));
    }
  }, [userAnswer, targetAnswer, currentNumber, goal]);

  // Determine the numbers to display on the conceptual number line (visual aid)
  const numberLine = useMemo(() => {
    const range = 5; // Display 5 numbers around the currentNumber
    return Array.from({ length: range }, (_, i) => currentNumber - 2 + i);
  }, [currentNumber]);

  // Custom button styling for interactivity
  const buttonStyle =
    'px-6 py-3 font-semibold rounded-lg transition transform duration-200 shadow-md hover:scale-[1.02] flex items-center justify-center space-x-2';

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-8 flex items-start justify-center font-sans">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-2">
            Level 1: Number Line Hopscotch
          </h1>
          <p className="text-lg text-gray-600">
            Chapter 2: Whole Numbers (Successor & Predecessor)
          </p>
        </header>

        {/* Goal Section */}
        <div className="p-4 sm:p-6 mb-8 rounded-xl border-4 border-lime-300 bg-lime-50 text-center">
          <h2 className="text-2xl font-bold text-gray-800 uppercase">
            Start at{' '}
            <span className="text-green-600 text-4xl">{currentNumber}</span>
          </h2>
          <p className="text-xl text-gray-700 mt-2 flex items-center justify-center space-x-2">
            Your goal is to find the:
            <span
              className={`font-extrabold p-1 rounded-md ${
                isPredecessorGoal
                  ? 'bg-red-400 text-white'
                  : 'bg-blue-400 text-white'
              }`}
            >
              {isPredecessorGoal ? 'Predecessor' : 'Successor'}
            </span>
            {isPredecessorGoal ? (
              <ArrowLeft className="w-6 h-6 text-red-600" />
            ) : (
              <ArrowRight className="w-6 h-6 text-blue-600" />
            )}
          </p>
        </div>

        {/* Conceptual Number Line Visual */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Think: Where does your number land?
          </h3>
          <div className="flex justify-center items-end relative h-20">
            {/* Draw the line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 z-0"></div>

            {numberLine.map((num, index) => (
              <div
                key={num}
                className={`flex flex-col items-center mx-2 z-10 transition-all duration-300 ${
                  num === currentNumber ? 'scale-125' : 'scale-100'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    num === currentNumber
                      ? 'bg-green-600 border-green-800 h-4 w-4'
                      : 'bg-white border-gray-600'
                  }`}
                ></div>
                <div className="text-sm font-medium mt-1 text-gray-700">
                  {num}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input and Check */}
        <div className="bg-gray-100 p-4 sm:p-6 rounded-xl border-t-4 border-gray-300">
          <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
            What is the {goal}?
          </h3>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={userAnswer}
              onChange={handleAnswerChange}
              disabled={isCorrect}
              placeholder="Enter your number here"
              className="p-3 text-2xl text-center w-full max-w-xs border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition-shadow disabled:bg-white"
            />
          </div>

          <div className="h-8 mb-4 text-center font-semibold flex items-center justify-center">
            {message && (
              <span
                className={`flex items-center space-x-2 ${
                  isCorrect ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {isCorrect ? (
                  <Smile className="w-5 h-5" />
                ) : (
                  <Frown className="w-5 h-5" />
                )}
                <span>{message}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={checkAnswer}
              disabled={!userAnswer || isCorrect}
              className={`${buttonStyle} bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              <Check className="w-5 h-5" />
              <span>Submit Answer</span>
            </button>

            <button
              onClick={handleNewGame}
              className={`${buttonStyle} bg-blue-500 text-white hover:bg-blue-600`}
            >
              <RotateCcw className="w-5 h-5" />
              <span>New Game</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberLineHopscotchGame;
