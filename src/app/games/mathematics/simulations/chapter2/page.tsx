'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Check, RotateCcw, Frown, Smile } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

// --- Helper Functions ---

/** Generates a set of unique random digits (0-9). */
const generateRandomDigits = (count: number): number[] => {
  const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Shuffle and pick the first 'count' unique digits.
  for (let i = allDigits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allDigits[i], allDigits[j]] = [allDigits[j], allDigits[i]];
  }
  return allDigits.slice(0, count);
};

/** Determines the correct target number (largest or smallest). */
const getTargetNumber = (
  digits: number[],
  goal: 'largest' | 'smallest'
): number => {
  const sortedDigits = [...digits].sort((a, b) => a - b);
  let resultArr: number[];

  if (goal === 'largest') {
    // Sort descending for the largest number
    resultArr = sortedDigits.reverse();
  } else {
    // Sort ascending for the smallest number
    resultArr = sortedDigits;

    // Critical check: If the smallest digit is 0, it cannot be in the highest place value.
    if (resultArr.length > 1 && resultArr[0] === 0) {
      // Find the smallest non-zero digit and swap it with 0.
      let firstNonZeroIndex = 1;
      while (
        firstNonZeroIndex < resultArr.length &&
        resultArr[firstNonZeroIndex] === 0
      ) {
        firstNonZeroIndex++;
      }
      if (firstNonZeroIndex < resultArr.length) {
        [resultArr[0], resultArr[firstNonZeroIndex]] = [
          resultArr[firstNonZeroIndex],
          resultArr[0],
        ];
      }
    }
  }

  // Convert the array of digits into a number
  return parseInt(resultArr.join(''), 10);
};

// --- Initial Game State Setup ---

const NUM_DIGITS = 5; // A good length for Class 6: Tens of Thousands place

const initializeGameState = () => {
  const digits = generateRandomDigits(NUM_DIGITS);
  const goal = Math.random() < 0.5 ? 'largest' : 'smallest';
  const targetNumber = getTargetNumber(digits, goal);

  return {
    initialDigits: digits,
    availableDigits: [...digits],
    placedDigits: Array(NUM_DIGITS).fill(null) as (number | null)[],
    goal: goal,
    targetNumber: targetNumber,
    message: '',
    isCorrect: false,
    attempts: 0,
  };
};

type GameState = ReturnType<typeof initializeGameState>;

// --- React Component ---

const PlaceValuePyramidGame: React.FC = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>(initializeGameState);

  const {
    initialDigits,
    availableDigits,
    placedDigits,
    goal,
    targetNumber,
    message,
    isCorrect,
  } = gameState;

  // Resets the current placement, keeping the initial digits and goal
  const handleResetPlacement = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      availableDigits: [...prev.initialDigits],
      placedDigits: Array(NUM_DIGITS).fill(null),
      message: '',
      isCorrect: false,
    }));
  }, []);

  // Resets the entire game with new digits and a new goal
  const handleNewGame = useCallback(() => {
    setGameState(initializeGameState());
  }, []);

  // Handler for placing a digit from the available pool into an empty slot
  const handlePlaceDigit = useCallback(
    (digit: number, slotIndex: number) => {
      if (isCorrect) return;

      setGameState((prev) => {
        // 1. Check if the slot is empty
        if (prev.placedDigits[slotIndex] !== null) {
          // If the slot is occupied, the user must clear it first (handled by handleClearSlot)
          return prev;
        }

        // 2. Find the index of the digit in the available pool
        const availableIndex = prev.availableDigits.indexOf(digit);
        if (availableIndex === -1) return prev;

        const newAvailable = [...prev.availableDigits];
        newAvailable.splice(availableIndex, 1); // Remove from available

        const newPlaced = [...prev.placedDigits];
        newPlaced[slotIndex] = digit; // Place in slot

        return {
          ...prev,
          availableDigits: newAvailable,
          placedDigits: newPlaced,
          message: '',
        };
      });
    },
    [isCorrect]
  );

  // Handler for clearing a digit from a slot back to the available pool
  const handleClearSlot = useCallback(
    (slotIndex: number) => {
      if (isCorrect) return;

      setGameState((prev) => {
        const digit = prev.placedDigits[slotIndex];
        if (digit === null) return prev;

        const newPlaced = [...prev.placedDigits];
        newPlaced[slotIndex] = null; // Clear slot

        const newAvailable = [...prev.availableDigits];
        newAvailable.push(digit); // Add back to available pool
        newAvailable.sort((a, b) => a - b); // Keep available digits sorted

        return {
          ...prev,
          availableDigits: newAvailable,
          placedDigits: newPlaced,
          message: '',
        };
      });
    },
    [isCorrect]
  );

  // Checks the user's constructed number against the target number
  const checkAnswer = useCallback(() => {
    if (placedDigits.includes(null)) {
      setGameState((prev) => ({
        ...prev,
        message: 'Please fill all 5 places before checking!',
      }));
      return;
    }

    const constructedNumber = parseInt(placedDigits.join(''), 10);
    const isAnswerCorrect = constructedNumber === targetNumber;

    if (isAnswerCorrect) {
      setGameState((prev) => ({
        ...prev,
        message: `🎉 Correct! The ${goal}est number is ${targetNumber}.`,
        isCorrect: true,
        attempts: prev.attempts + 1,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        message: '❌ That is not the ' + goal + 'est number. Try again!',
        attempts: prev.attempts + 1,
      }));
    }
  }, [placedDigits, goal, targetNumber]);

  // Determine the place value labels for the slots
  const placeValueLabels = useMemo(() => {
    return ['Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
  }, []);

  // Custom button styling for interactivity
  const buttonStyle =
    'p-3 font-semibold rounded-lg transition transform duration-200 shadow-md hover:scale-[1.02]';

  return (
    <div className="min-h-screen bg-indigo-50 p-4 sm:p-8 flex items-start justify-center font-sans">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
            Level 1: Place Value Pyramid
          </h1>
          <p className="text-lg text-gray-600">
            Chapter 1: Knowing Our Numbers
          </p>
        </header>

        {/* Goal Section */}
        <div className="p-4 sm:p-6 mb-6 rounded-xl border-4 border-yellow-300 bg-yellow-50 text-center">
          <h2 className="text-2xl font-bold text-gray-800 uppercase">
            Goal: Form the{' '}
            <span className="text-red-600">{goal}est</span> Number
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Use the digits below to complete the challenge.
          </p>
        </div>

        {/* Digit Slots (The Pyramid) */}
        <div className="bg-indigo-100 p-4 sm:p-6 rounded-xl mb-6 shadow-inner">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 text-center">
            Construct Your Number
          </h3>

          <div className="flex justify-center space-x-2 sm:space-x-4">
            {placedDigits.map((digit, index) => (
              <div
                key={index}
                onClick={() => handleClearSlot(index)}
                className={`
                  flex flex-col items-center cursor-pointer p-2 rounded-xl border-2 
                  transition-all duration-150 ease-in-out w-1/5 max-w-[80px]
                  ${
                    digit !== null
                      ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-500'
                      : 'bg-white border-gray-300'
                  }
                  ${isCorrect ? 'pointer-events-none' : ''}
                `}
                title={
                  digit !== null
                    ? `Click to return ${digit} to the pool`
                    : 'Empty slot'
                }
              >
                <div className="text-2xl sm:text-3xl font-extrabold h-9 sm:h-10 flex items-center">
                  {digit !== null ? digit : '?'}
                </div>
                <div className="text-xs font-medium mt-1 uppercase text-center opacity-80">
                  {placeValueLabels[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Digits */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
            Available Digits
          </h3>
          <div className="flex justify-center flex-wrap gap-3">
            {availableDigits.map((digit) => (
              <button
                key={digit}
                onClick={() => {
                  // Find the first empty slot to place the digit
                  const emptySlotIndex = placedDigits.findIndex(
                    (d) => d === null
                  );
                  if (emptySlotIndex !== -1) {
                    handlePlaceDigit(digit, emptySlotIndex);
                  } else {
                    setGameState((prev) => ({
                      ...prev,
                      message: 'All slots are full! Clear a slot first.',
                    }));
                  }
                }}
                disabled={isCorrect}
                className={`
                  ${buttonStyle} bg-indigo-500 text-white text-2xl w-12 h-12 flex items-center justify-center 
                   hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                `}
                title={`Click to place digit ${digit}`}
              >
                {digit}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback and Controls */}
        <div className="mt-6 p-4 rounded-xl bg-gray-100 border-t-4 border-gray-300">
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
              disabled={placedDigits.includes(null) || isCorrect}
              className={`${buttonStyle} bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              <Check className="w-5 h-5" />
              <span>Check Answer</span>
            </button>

            <button
              onClick={handleResetPlacement}
              disabled={isCorrect}
              className={`${buttonStyle} bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Clear Placement</span>
            </button>

            <button
              onClick={handleNewGame}
              className={`${buttonStyle} bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center space-x-2`}
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

export default PlaceValuePyramidGame;
