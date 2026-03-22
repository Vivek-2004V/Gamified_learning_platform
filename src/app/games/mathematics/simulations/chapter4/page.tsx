'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/language-context';
import {
  Check,
  RotateCcw,
  Smile,
  Frown,
  Lightbulb,
  TrendingUp,
  Grid,
  Lock,
} from 'lucide-react';

// --- Level 1: Factors Game (Factor Finder) ---

/** Finds all factors of a number */
const getFactors = (n: number): number[] => {
  const factors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }
  return factors;
};

/** Generates a unique list of numbers for selection, including all factors and distractors. */
const generateFactorOptions = (targetNum: number): number[] => {
  const factors = getFactors(targetNum);
  const allOptions = new Set<number>(factors);

  // Add distractors (non-factors)
  while (allOptions.size < 12) {
    const distractor = Math.floor(Math.random() * (targetNum + 10)) + 1;
    // Ensure distractor is not a factor and is not already in the set
    if (!factors.includes(distractor)) {
      allOptions.add(distractor);
    }
  }
  return Array.from(allOptions).sort((a, b) => a - b);
};

interface GameLevelProps {
  onWin: () => void;
}

const FactorFinder: React.FC<GameLevelProps> = ({ onWin }) => {
  const [targetNum, setTargetNum] = useState(
    Math.floor(Math.random() * (40 - 15 + 1)) + 15
  ); // Number between 15 and 40
  const [options, setOptions] = useState(() =>
    generateFactorOptions(targetNum)
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState(
    'Select ALL the numbers that are factors of the central number.'
  );

  const correctFactors = useMemo(() => getFactors(targetNum), [targetNum]);

  const handleOptionClick = useCallback(
    (num: number) => {
      if (isGameOver) return;
      setSelected((prev) =>
        prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
      );
      setMessage('Ready to check?');
    },
    [isGameOver]
  );

  const checkAnswer = useCallback(() => {
    // 1. Check if all correct factors were selected
    const allCorrectSelected = correctFactors.every((factor) =>
      selected.includes(factor)
    );
    // 2. Check if no incorrect (distractor) numbers were selected
    const noIncorrectSelected = selected.every((num) =>
      correctFactors.includes(num)
    );

    setIsGameOver(true);

    if (allCorrectSelected && noIncorrectSelected) {
      setMessage('✅ Perfect! You found all the factors! Level Complete!');
      setTimeout(onWin, 2000); // Wait before moving to the next level
    } else {
      setMessage(
        '❌ Try again. Make sure you selected ALL factors and NO non-factors.'
      );
    }
  }, [selected, correctFactors, onWin]);

  const handleRestart = useCallback(() => {
    const newTarget = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
    setTargetNum(newTarget);
    setOptions(generateFactorOptions(newTarget));
    setSelected([]);
    setIsGameOver(false);
    setMessage(
      'Select ALL the numbers that are factors of the central number.'
    );
  }, []);

  const getStyle = (num: number) => {
    const isSelected = selected.includes(num);
    const isCorrect = correctFactors.includes(num);

    if (!isGameOver) {
      return isSelected
        ? 'bg-indigo-300 text-indigo-900 border-indigo-500'
        : 'bg-white hover:bg-gray-100 border-gray-300';
    } else {
      if (isSelected && isCorrect)
        return 'bg-green-200 text-green-900 border-green-500 shadow-lg'; // Correct factor selected
      if (isSelected && !isCorrect)
        return 'bg-red-200 text-red-900 border-red-500 shadow-lg animate-pulse'; // Non-factor selected
      if (!isSelected && isCorrect)
        return 'bg-yellow-100 text-yellow-800 border-yellow-500 opacity-70'; // Correct factor missed
      return 'bg-white text-gray-400 border-gray-300 opacity-50'; // Ignored distractor
    }
  };

  const buttonStyle =
    'p-3 font-semibold rounded-lg transition transform duration-200 shadow-md hover:scale-[1.02] flex items-center justify-center space-x-2';

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-6 flex items-center justify-center space-x-2">
        <Lightbulb className="w-8 h-8" />
        <span>Level 1: Factor Finder</span>
      </h2>

      <div className="text-center p-6 mb-8 rounded-xl border-4 border-indigo-300 bg-indigo-50 shadow-inner">
        <p className="text-lg font-semibold text-gray-600 mb-2">
          Find all the factors of:
        </p>
        <span className="text-indigo-600 text-7xl font-extrabold p-3 rounded-lg bg-white shadow-xl inline-block">
          {targetNum}
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-8">
        {options.map((num) => (
          <button
            key={num}
            onClick={() => handleOptionClick(num)}
            disabled={isGameOver}
            className={`
               aspect-square flex items-center justify-center text-xl font-bold rounded-xl border-4 cursor-pointer select-none
               ${getStyle(num)}
             `}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="text-center h-10 mb-4 font-semibold text-lg flex items-center justify-center">
        <span
          className={`flex items-center space-x-2 ${
            isGameOver
              ? message.startsWith('✅')
                ? 'text-green-600'
                : 'text-red-500'
              : 'text-gray-700'
          }`}
        >
          {isGameOver ? (
            message.startsWith('✅') ? (
              <Smile className="w-5 h-5" />
            ) : (
              <Frown className="w-5 h-5" />
            )
          ) : null}
          <span>{message}</span>
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={checkAnswer}
          disabled={isGameOver || selected.length === 0}
          className={`${buttonStyle} bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          <Check className="w-5 h-5" />
          <span>Check Factors</span>
        </button>
        <button
          onClick={handleRestart}
          className={`${buttonStyle} bg-gray-500 text-white hover:bg-gray-600`}
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Number</span>
        </button>
      </div>
    </div>
  );
};

// --- Level 2: Multiples Game (Multiple Master) ---

const MultipleMaster: React.FC<GameLevelProps> = ({ onWin }) => {
  const [targetNum, setTargetNum] = useState(
    Math.floor(Math.random() * (12 - 3 + 1)) + 3
  ); // Number between 3 and 12
  const [userInputs, setUserInputs] = useState(['', '', '']);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState(
    `Find the 3rd, 4th, and 5th multiples of ${targetNum}.`
  );

  const correctMultiples = useMemo(
    () => [
      targetNum * 3, // 3rd multiple
      targetNum * 4, // 4th multiple
      targetNum * 5, // 5th multiple
    ],
    [targetNum]
  );

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      if (isGameOver) return;
      const numericValue = value.replace(/[^0-9]/g, '');
      setUserInputs((prev) => {
        const newInputs = [...prev];
        newInputs[index] = numericValue;
        return newInputs;
      });
      setMessage('Ready to check?');
    },
    [isGameOver]
  );

  const checkAnswer = useCallback(() => {
    const userNumbers = userInputs
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));
    if (userNumbers.length !== 3) {
      setMessage('⚠️ Please fill in all three boxes!');
      return;
    }

    const correctCount = userNumbers.filter(
      (num, i) => num === correctMultiples[i]
    ).length;
    const allCorrect = correctCount === 3;

    setIsGameOver(true);

    if (allCorrect) {
      setMessage('🎉 Brilliant! Multiples Mastered! Level Complete!');
      setTimeout(onWin, 2000);
    } else {
      setMessage(
        `❌ You got ${correctCount} out of 3 correct. Review your answers.`
      );
    }
  }, [userInputs, correctMultiples, onWin]);

  const handleRestart = useCallback(() => {
    const newTarget = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
    setTargetNum(newTarget);
    setUserInputs(['', '', '']);
    setIsGameOver(false);
    setMessage(`Find the 3rd, 4th, and 5th multiples of ${newTarget}.`);
  }, []);

  const buttonStyle =
    'p-3 font-semibold rounded-lg transition transform duration-200 shadow-md hover:scale-[1.02] flex items-center justify-center space-x-2';

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6 flex items-center justify-center space-x-2">
        <TrendingUp className="w-8 h-8" />
        <span>Level 2: Multiple Master</span>
      </h2>

      <div className="text-center p-6 mb-8 rounded-xl border-4 border-green-300 bg-green-50 shadow-inner">
        <p className="text-lg font-semibold text-gray-600 mb-2">
          Identify the next three multiples of:
        </p>
        <span className="text-green-600 text-7xl font-extrabold p-3 rounded-lg bg-white shadow-xl inline-block">
          {targetNum}
        </span>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {userInputs.map((input, index) => (
          <div key={index} className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {index + 3}x Multiple
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              disabled={isGameOver}
              placeholder="..."
              className={`p-3 text-3xl text-center w-24 font-bold border-4 rounded-xl transition-all ${
                isGameOver
                  ? parseInt(input, 10) === correctMultiples[index]
                    ? 'border-green-500 bg-green-100'
                    : 'border-red-500 bg-red-100'
                  : 'border-gray-300 focus:border-green-500'
              } disabled:cursor-default`}
            />

            {isGameOver && (
              <p className="mt-2 text-xs text-gray-600">
                Correct: {correctMultiples[index]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center h-10 mb-4 font-semibold text-lg flex items-center justify-center">
        <span
          className={`flex items-center space-x-2 ${
            isGameOver
              ? message.startsWith('🎉')
                ? 'text-green-600'
                : 'text-red-500'
              : 'text-gray-700'
          }`}
        >
          {isGameOver ? (
            message.startsWith('🎉') ? (
              <Smile className="w-5 h-5" />
            ) : (
              <Frown className="w-5 h-5" />
            )
          ) : null}
          <span>{message}</span>
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={checkAnswer}
          disabled={isGameOver || userInputs.some((v) => v === '')}
          className={`${buttonStyle} bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          <Check className="w-5 h-5" />
          <span>Check Multiples</span>
        </button>
        <button
          onClick={handleRestart}
          className={`${buttonStyle} bg-gray-500 text-white hover:bg-gray-600`}
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Number</span>
        </button>
      </div>
    </div>
  );
};
// --- Level 3: Divisibility Game (Divisibility Sort) ---

const checkDivisibility = (n: number, divisor: number): boolean => {
  if (divisor === 2) return n % 2 === 0;
  if (divisor === 3)
    return n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0) % 3 === 0;
  if (divisor === 5) return n % 5 === 0;
  if (divisor === 10) return n % 10 === 0;
  return false;
};

const rules = [2, 3, 5, 10];

const DivisibilitySort: React.FC<GameLevelProps> = ({ onWin }) => {
  const [targetNum, setTargetNum] = useState(
    Math.floor(Math.random() * (500 - 100 + 1)) + 100
  ); // Number between 100 and 500
  const [selectedRules, setSelectedRules] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState(
    'Select the rules this number is divisible by.'
  );

  const correctRules = useMemo(
    () => rules.filter((r) => checkDivisibility(targetNum, r)),
    [targetNum]
  );

  const handleRuleToggle = useCallback(
    (rule: number) => {
      if (isGameOver) return;
      setSelectedRules((prev) =>
        prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
      );
      setMessage('Ready to check?');
    },
    [isGameOver]
  );

  const checkAnswer = useCallback(() => {
    // 1. Check if all correct rules were selected
    const allCorrectSelected = correctRules.every((rule) =>
      selectedRules.includes(rule)
    );
    // 2. Check if no incorrect rules were selected
    const noIncorrectSelected = selectedRules.every((rule) =>
      correctRules.includes(rule)
    );

    setIsGameOver(true);

    if (allCorrectSelected && noIncorrectSelected) {
      setMessage(
        '👑 Victory! You applied the Divisibility Rules perfectly! Game Complete!'
      );
      setTimeout(onWin, 2000);
    } else {
      setMessage(
        '❌ Check the rules again. Make sure you selected the right ones.'
      );
    }
  }, [selectedRules, correctRules, onWin]);

  const handleRestart = useCallback(() => {
    const newTarget = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    setTargetNum(newTarget);
    setSelectedRules([]);
    setIsGameOver(false);
    setMessage('Select the rules this number is divisible by.');
  }, []);

  const getRuleStyle = (rule: number) => {
    const isSelected = selectedRules.includes(rule);
    const isCorrect = correctRules.includes(rule);

    if (!isGameOver) {
      return isSelected
        ? 'bg-purple-300 border-purple-500 text-purple-900'
        : 'bg-white hover:bg-gray-100 border-gray-300';
    } else {
      if (isSelected && isCorrect)
        return 'bg-green-200 border-green-500 text-green-900 shadow-lg';
      if (isSelected && !isCorrect)
        return 'bg-red-200 border-red-500 text-red-900 shadow-lg animate-pulse';
      if (!isSelected && isCorrect)
        return 'bg-yellow-100 border-yellow-500 text-yellow-800 opacity-70';
      return 'bg-white text-gray-400 border-gray-300 opacity-50';
    }
  };

  const buttonStyle =
    'p-3 font-semibold rounded-lg transition transform duration-200 shadow-md hover:scale-[1.02] flex items-center justify-center space-x-2';

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-6 flex items-center justify-center space-x-2">
        <Grid className="w-8 h-8" />
        <span>Level 3: Divisibility Sort</span>
      </h2>

      <div className="text-center p-6 mb-8 rounded-xl border-4 border-purple-300 bg-purple-50 shadow-inner">
        <p className="text-lg font-semibold text-gray-600 mb-2">
          Is the following number divisible by 2, 3, 5, or 10?
        </p>
        <span className="text-purple-600 text-7xl font-extrabold p-3 rounded-lg bg-white shadow-xl inline-block">
          {targetNum}
        </span>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {rules.map((rule) => (
          <button
            key={rule}
            onClick={() => handleRuleToggle(rule)}
            disabled={isGameOver}
            className={`
               w-32 h-32 flex flex-col items-center justify-center text-2xl font-bold rounded-xl border-4 cursor-pointer select-none shadow-md
               ${getRuleStyle(rule)}
             `}
          >
            <span className="text-xl">Divisible by</span>
            <span className="text-5xl font-extrabold">{rule}</span>
          </button>
        ))}
      </div>

      <div className="text-center h-10 mb-4 font-semibold text-lg flex items-center justify-center">
        <span
          className={`flex items-center space-x-2 ${
            isGameOver
              ? message.startsWith('👑')
                ? 'text-green-600'
                : 'text-red-500'
              : 'text-gray-700'
          }`}
        >
          {isGameOver ? (
            message.startsWith('👑') ? (
              <Smile className="w-5 h-5" />
            ) : (
              <Frown className="w-5 h-5" />
            )
          ) : null}
          <span>{message}</span>
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={checkAnswer}
          disabled={isGameOver || selectedRules.length === 0}
          className={`${buttonStyle} bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          <Check className="w-5 h-5" />
          <span>Check Rules</span>
        </button>
        <button
          onClick={handleRestart}
          className={`${buttonStyle} bg-gray-500 text-white hover:bg-gray-600`}
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Number</span>
        </button>
      </div>
    </div>
  );
};
// --- Main Application Component ---

const NumberConceptsPage: React.FC = () => {
  const [level, setLevel] = useState(1);

  const goToNextLevel = useCallback(() => {
    setLevel((prev) => (prev < 3 ? prev + 1 : 4));
  }, []);

  const resetGame = useCallback(() => {
    setLevel(1);
  }, []);

  const renderLevel = () => {
    switch (level) {
      case 1:
        return <FactorFinder onWin={goToNextLevel} />;
      case 2:
        return <MultipleMaster onWin={goToNextLevel} />;
      case 3:
        return <DivisibilitySort onWin={goToNextLevel} />;
      case 4:
        return (
          <div className="text-center p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-2xl m-8 max-w-lg mx-auto">
            <Smile className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-extrabold mb-3">Congratulations!</h2>
            <p className="text-xl mb-6">
              You have mastered Factors, Multiples, and Divisibility!
            </p>
            <button
              onClick={resetGame}
              className="p-3 font-bold bg-yellow-400 text-gray-900 rounded-lg transition transform duration-200 hover:scale-[1.05] shadow-lg"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" /> Play Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-4 border-gray-200">
        <header className="text-center mb-8 pb-4 border-b-2 border-gray-100">
          <h1 className="text-4xl font-black text-gray-800">
            Chapter 3: Number Concepts Challenge
          </h1>
          <div className="flex justify-center space-x-4 mt-4">
            <span
              className={`px-4 py-1 rounded-full text-sm font-bold shadow-md transition-all ${
                level >= 1
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {level === 1
                ? 'Active'
                : level > 1
                ? 'Completed'
                : 'Factors'}
            </span>
            <span
              className={`px-4 py-1 rounded-full text-sm font-bold shadow-md transition-all ${
                level >= 2
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {level === 2 ? 'Active' : level > 2 ? 'Completed' : <Lock className="w-4 h-4 inline mr-1" />}
            </span>
            <span
              className={`px-4 py-1 rounded-full text-sm font-bold shadow-md transition-all ${
                level >= 3
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {level === 3 ? 'Active' : level > 3 ? 'Completed' : <Lock className="w-4 h-4 inline mr-1" />}
            </span>
          </div>
        </header>

        {renderLevel()}
      </div>
    </div>
  );
};

export default NumberConceptsPage;
