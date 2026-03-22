'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/language-context';
import styles from './page.module.css';

interface Operation {
  symbol: string;
  func: (a: number, b: number) => number;
}

const operations: Operation[] = [
  { symbol: '+', func: (a, b) => a + b },
  { symbol: '-', func: (a, b) => a - b },
  { symbol: '×', func: (a, b) => a * b },
  { symbol: '÷', func: (a, b) => a / b },
];

const TARGET_SCORE = 50;
const GAME_DURATION = 60;

export default function MathRocketGame() {
  const { t } = useLanguage();
  const [currentScore, setCurrentScore] = useState(0);
  const [problem, setProblem] = useState('');
  const [problemAnswer, setProblemAnswer] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState('text-yellow-300');
  const [showThruster, setShowThruster] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  
  const answerInputRef = useRef<HTMLInputElement>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateProblem = useCallback(() => {
    const opIndex = Math.floor(Math.random() * operations.length);
    const operation = operations[opIndex];
    let num1: number, num2: number;

    switch (operation.symbol) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 100) + 20;
        num2 = Math.floor(Math.random() * (num1 - 10)) + 1;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 10) + 2;
        num2 = Math.floor(Math.random() * 10) + 2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 9) + 2;
        const quotient = Math.floor(Math.random() * 9) + 2;
        num1 = num2 * quotient;
        break;
      default:
        num1 = 1;
        num2 = 1;
    }

    setProblemAnswer(operation.func(num1, num2));
    setProblem(`${num1} ${operation.symbol} ${num2} = ?`);
    if (answerInputRef.current) {
      answerInputRef.current.value = '';
      answerInputRef.current.focus();
    }
  }, []);

  const updateScore = useCallback((points: number) => {
    setCurrentScore((prevScore) => {
      let newScore = prevScore + points;
      if (newScore < 0) newScore = 0;
      if (newScore > TARGET_SCORE) newScore = TARGET_SCORE;
      return newScore;
    });
  }, []);
  
  const updateStatus = useCallback((message: string, color: string = 'text-yellow-300') => {
    setStatusMessage(message);
    setStatusColor(color);
  }, []);

  const winGame = useCallback(() => {
    setGameActive(false);
    updateStatus(t('mathRocketLaunchSuccess'), 'text-green-400 font-extrabold');
    setIsGameWon(true);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
  }, [updateStatus, t]);

  const loseGame = useCallback(() => {
    setGameActive(false);
    updateStatus(t('mathRocketTimeout'), 'text-red-500 font-extrabold');
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
  }, [updateStatus, t]);

  const startTimer = useCallback(() => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    gameTimerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          loseGame();
          return 0;
        }
        
        if (gameActive) {
            updateScore(-1); // Simulate fuel leak
        }

        if ((prevTime - 1) > 0 && (prevTime - 1) % 5 === 0) {
            updateStatus(`⏳ ${prevTime - 1} ${t('mathRocketSecondsLeft')}`);
        }
        if ((prevTime - 1) < 10) {
            setStatusColor('text-red-500');
        }

        return prevTime - 1;
      });
    }, 1000);
  }, [loseGame, updateScore, updateStatus, t, gameActive]);

  const initGame = useCallback(() => {
    setCurrentScore(0);
    setTimeRemaining(GAME_DURATION);
    setGameActive(true);
    setIsGameWon(false);
    setShowThruster(false);
    generateProblem();
    startTimer();
    updateStatus(t('mathRocketGet50Points'), 'text-yellow-300');
  }, [generateProblem, startTimer, updateStatus, t]);

  const checkAnswer = useCallback(() => {
    if (!gameActive) return;

    const userAnswer = parseInt(answerInputRef.current?.value || '', 10);

    if (isNaN(userAnswer)) {
      updateStatus(t('mathRocketEnterNumber'), 'text-red-500');
      return;
    }

    if (userAnswer === problemAnswer) {
      updateScore(5);
      updateStatus(t('mathRocketCorrect'), 'text-lime-400');
      setShowThruster(true);
      setTimeout(() => setShowThruster(false), 200);
      generateProblem();
    } else {
      updateScore(-3);
      updateStatus(`${t('mathRocketIncorrect')} ${problemAnswer}.`, 'text-red-500');
      generateProblem();
    }
  }, [gameActive, problemAnswer, updateScore, generateProblem, updateStatus, t]);

  useEffect(() => {
    initGame();
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [initGame]);

  useEffect(() => {
    if(currentScore >= TARGET_SCORE && gameActive) {
        winGame();
    }
  }, [currentScore, gameActive, winGame]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const fuelPercentage = (currentScore / TARGET_SCORE) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.gameContainer}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
          {t('mathRocketTitle')}
        </h1>

        <div className={styles.rocketArea}>
          <div id="rocket" className={`${styles.rocket} ${isGameWon ? styles.launch : ''}`}>
            <div className={styles.rocketBody}>
              <div className={styles.rocketWindow}></div>
            </div>
            <div className={styles.rocketFinLeft}></div>
            <div className={styles.rocketFinRight}></div>
            <div id="thruster" className={`${styles.thruster} ${showThruster || isGameWon ? styles.thrusterOn : ''}`}></div>
          </div>
        </div>

        <div className={styles.gameUI}>
          <div className={styles.fuelGauge}>
            <div className="text-white font-bold mb-2">{t('mathRocketFuel')}</div>
            <div className={styles.fuelBar}>
              <div id="fuel-level" className={styles.fuelLevel} style={{ width: `${fuelPercentage}%` }}></div>
            </div>
            <div className="text-white text-lg font-bold"><span id="current-score">{currentScore}</span> / {TARGET_SCORE}</div>
          </div>
          
          <div className={styles.problemBox}>
            <div id="problem-text" className={styles.problemText}>{problem}</div>
          </div>

          <div className={styles.answerSection}>
            <input
              ref={answerInputRef}
              id="answer-input"
              type="number"
              className={styles.answerInput}
              placeholder={t('mathRocketEnterAnswer')}
              onKeyPress={handleKeyPress}
              disabled={!gameActive}
            />
            <button id="check-btn" className={styles.checkBtn} onClick={checkAnswer} disabled={!gameActive}>
              {t('mathRocketCheck')}
            </button>
          </div>

          <div id="status-message" className={`${styles.statusMessage} ${statusColor}`}>
            {statusMessage}
          </div>

          {!gameActive &&
             <button id="new-game-btn" className={styles.newGameBtn} onClick={initGame}>
                {t('mathRocketRestart')}
            </button>
          }
        </div>
      </div>
    </div>
  );
}
