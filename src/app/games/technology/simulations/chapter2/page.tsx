'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/language-context';
import styles from './page.module.css';

const BITS = 5;
const GAME_TIME = 60; // seconds

const generateNewTarget = () => Math.floor(Math.random() * (2 ** BITS));

const BinaryDecoderGame: React.FC = () => {
  const { t } = useLanguage();
  const [bits, setBits] = useState<number[]>(Array(BITS).fill(0));
  const [target, setTarget] = useState<number>(generateNewTarget);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_TIME);
  const [puzzlesSolved, setPuzzlesSolved] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [successFlash, setSuccessFlash] = useState<boolean>(false);
  const [score, setScore] = useState(0);

  const currentSum = useMemo(() => {
    return bits.reduce(
      (sum, bit, index) => sum + bit * 2 ** (BITS - 1 - index),
      0
    );
  }, [bits]);

  const resetGame = useCallback(() => {
    setBits(Array(BITS).fill(0));
    setTarget(generateNewTarget());
    setTimeLeft(GAME_TIME);
    setPuzzlesSolved(0);
    setScore(0);
    setIsGameOver(false);
    setMessage('');
  }, []);

  const nextPuzzle = useCallback(() => {
    setBits(Array(BITS).fill(0));
    setTarget(generateNewTarget());
    setPuzzlesSolved((prev) => prev + 1);
    setScore((prev) => prev + 100 + timeLeft); // Bonus for remaining time
    setSuccessFlash(true);
    setTimeout(() => setSuccessFlash(false), 500);
  }, [timeLeft]);

  const handleSubmit = useCallback(() => {
    if (isGameOver) return;

    if (currentSum === target) {
      setMessage(
        t('binaryCorrect', {
          binary: bits.join(''),
          decimal: target,
        })
      );
      nextPuzzle();
    } else if (currentSum > target) {
      const penalty = 5;
      setTimeLeft((prev) => Math.max(0, prev - penalty));
      setMessage(
        t('binaryTooHigh', {
          sum: currentSum,
          penalty: penalty,
        })
      );
    } else {
       setMessage(
        t('binaryTooLow', {
          sum: currentSum,
        })
      );
    }
  }, [isGameOver, currentSum, target, bits, nextPuzzle, t]);

  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft <= 0) {
      setIsGameOver(true);
      setMessage(t('binaryGameOver', { puzzles: puzzlesSolved, score: score }));
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, puzzlesSolved, score, t]);

  const toggleBit = (index: number) => {
    if (isGameOver) return;
    setBits((prev) => {
      const newBits = [...prev];
      newBits[index] = newBits[index] === 0 ? 1 : 0;
      return newBits;
    });
  };

  const getStatusBoxStyle = () => {
    if (isGameOver) return 'border-red-500 text-red-500';
    if (message.includes('Correct')) return 'border-green-500 text-green-500';
    if (message.includes('Too high')) return 'border-yellow-500 text-yellow-500';
    return 'border-gray-400 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className={`${styles.circuitCard} ${
          successFlash ? styles.successFlash : ''
        }`}
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black text-cyan-700 mb-1">
            {t('binaryDecoderTitle')}
          </h1>
          <p className="text-gray-500">{t('binaryDecoderSubtitle')}</p>
        </header>

        {isGameOver ? (
          <>
            <div
              className={`p-6 rounded-lg text-center ${getStatusBoxStyle()}`}
            >
              <h2 className="text-2xl font-bold">
                {t('binaryGameOver', { puzzles: puzzlesSolved, score: score })}
              </h2>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={resetGame}
                className="w-full md:w-auto bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition"
              >
                {t('restartGame')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1 text-center bg-gray-50 p-4 rounded-lg border">
                <div className="text-sm uppercase text-gray-500">
                  {t('timeLeft')}
                </div>
                <div className="text-4xl font-bold text-red-500">
                  {timeLeft}s
                </div>
              </div>
              <div className="flex-1 text-center bg-gray-50 p-4 rounded-lg border">
                <div className="text-sm uppercase text-gray-500">
                  {t('puzzlesSolved')}
                </div>
                <div className="text-4xl font-bold text-blue-500">
                  {puzzlesSolved}
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 border-2 border-cyan-200 p-6 rounded-2xl mb-8">
              <div className="flex justify-between items-center text-center">
                <div className="flex-1">
                  <div className="text-lg font-bold text-cyan-800">
                    {t('targetValue')}
                  </div>
                  <div className="text-6xl font-black text-cyan-600">
                    {target}
                  </div>
                </div>
                <div className="text-4xl font-light text-gray-300">=</div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-600">
                    {t('currentSum')}
                  </div>
                  <div
                    className={`text-6xl font-black transition-colors ${
                      currentSum === target ? 'text-green-500' : 'text-gray-800'
                    }`}
                  >
                    {currentSum}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {bits.map((bit, index) => {
                const power = BITS - 1 - index;
                const weight = 2 ** power;
                return (
                  <div
                    key={index}
                    className={`${styles.bitSwitch} ${
                      bit === 1 ? styles.state1 : styles.state0
                    }`}
                    onClick={() => toggleBit(index)}
                  >
                    <div className={styles.weightLabel}>
                      {t('valueWeight', { weight })}
                    </div>
                    <div className={styles.binaryDisplay}>{bit}</div>
                    <div className={styles.exponentLabel}>
                      {t('exponentWeight', { power })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className={`${styles.statusBox} ${getStatusBoxStyle()}`}>
                {message || 'Flip the switches to match the target!'}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full md:w-auto bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-cyan-600 transition"
              >
                {t('submitCode')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BinaryDecoderGame;
