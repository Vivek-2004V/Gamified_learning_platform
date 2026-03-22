'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/language-context';

// --- TYPESCRIPT INTERFACES ---
interface StackedBlock {
  id: number;
  width: number;
  x: number;
  y: number;
  color: string;
}

interface MovingBlock {
  width: number;
  color: string;
}

interface DropFeedback {
  message: string;
  misalignment: number;
  percentage: number;
  color: string;
}

// --- CONSTANTS ---
const GAME_WIDTH = 300;
const BLOCK_HEIGHT = 30;
const STARTING_WIDTH = GAME_WIDTH * 0.8;
const MAX_SPEED = 5;
const COLOR_PALETTE = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];

const getRandomColor = (): string => COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

const StabilityEngineeringGame: React.FC = () => {
  const { t } = useLanguage();
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [stackedBlocks, setStackedBlocks] = useState<StackedBlock[]>([]);
  const [score, setScore] = useState<number>(0);
  const [movingBlockData, setMovingBlockData] = useState<MovingBlock>({
    width: STARTING_WIDTH,
    color: getRandomColor(),
  });
  const [dropFeedback, setDropFeedback] = useState<DropFeedback | null>(null);
  const [movingBlockX, setMovingBlockX] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const speedRef = useRef<number>(MAX_SPEED);

  const getFeedback = useCallback((overlapPercentage: number, misalignment: number): DropFeedback => {
    let message: string;
    let color: string;

    if (overlapPercentage > 99.5) {
      message = t('feedbackPerfect');
      color = "text-green-600";
    } else if (overlapPercentage > 85) {
      message = t('feedbackGood');
      color = "text-blue-600";
    } else if (overlapPercentage > 50) {
      message = t('feedbackWobbly');
      color = "text-yellow-600";
    } else {
      message = t('feedbackUnstable');
      color = "text-red-600";
    }

    return {
      message,
      misalignment: parseFloat(misalignment.toFixed(2)),
      percentage: parseFloat(overlapPercentage.toFixed(1)),
      color,
    };
  }, [t]);

  const handleDrop = useCallback(() => {
    if (!isGameActive) return;

    const currentBlock = {
      width: movingBlockData.width,
      x: movingBlockX + movingBlockData.width / 2,
      color: movingBlockData.color,
    };

    let newWidth = 0;
    let newX = 0;
    let misalignment = 0;
    let overlapPercentage = 100;

    if (stackedBlocks.length === 0) {
      newWidth = STARTING_WIDTH;
      newX = GAME_WIDTH / 2;
      setDropFeedback(getFeedback(100, 0));
    } else {
      const lastBlock = stackedBlocks[stackedBlocks.length - 1];
      const currentLeft = movingBlockX;
      const currentRight = movingBlockX + movingBlockData.width;
      const lastLeft = lastBlock.x - lastBlock.width / 2;
      const lastRight = lastBlock.x + lastBlock.width / 2;
      const overlapLeft = Math.max(currentLeft, lastLeft);
      const overlapRight = Math.min(currentRight, lastRight);
      const overlap = overlapRight - overlapLeft;

      if (overlap <= 0.1) {
        setIsGameActive(false);
        setDropFeedback(null);
        return;
      }

      newWidth = overlap;
      newX = (overlapLeft + overlapRight) / 2;
      misalignment = Math.abs(currentBlock.x - lastBlock.x);
      overlapPercentage = (overlap / movingBlockData.width) * 100;
      setDropFeedback(getFeedback(overlapPercentage, misalignment));
    }

    const newBlock: StackedBlock = {
      id: Date.now(),
      width: newWidth,
      x: newX,
      y: (stackedBlocks.length + 1) * BLOCK_HEIGHT,
      color: movingBlockData.color,
    };

    setStackedBlocks(prev => [...prev, newBlock]);
    setScore(prev => prev + 1);

    setMovingBlockX(direction === 1 ? 0 : GAME_WIDTH - newWidth);
    setMovingBlockData({
      width: newWidth,
      color: getRandomColor(),
    });

    speedRef.current = Math.min(15, MAX_SPEED + stackedBlocks.length * 0.5);
  }, [isGameActive, movingBlockData, movingBlockX, stackedBlocks, direction, getFeedback]);

  const handleGameClick = () => {
    if (isGameActive) {
      handleDrop();
    } else {
      setStackedBlocks([]);
      setScore(0);
      setIsGameActive(true);
      setMovingBlockX(0);
      setDirection(1);
      speedRef.current = MAX_SPEED;
      setMovingBlockData({ width: STARTING_WIDTH, color: getRandomColor() });
      setDropFeedback(null);
    }
  };

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;

    if (elapsed > 16 && isGameActive) {
      setMovingBlockX(prevX => {
        let newX = prevX + direction * speedRef.current;
        if (direction === 1 && newX + movingBlockData.width >= GAME_WIDTH) {
          setDirection(-1);
          newX = GAME_WIDTH - movingBlockData.width;
        } else if (direction === -1 && newX <= 0) {
          setDirection(1);
          newX = 0;
        }
        return newX;
      });
      lastTimeRef.current = timestamp;
    }

    if (isGameActive) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [direction, isGameActive, movingBlockData.width]);

  useEffect(() => {
    if (isGameActive) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isGameActive]);

  const maxStackHeight = stackedBlocks.length * BLOCK_HEIGHT;
  const scrollOffset = Math.max(0, maxStackHeight - GAME_WIDTH / 2);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
        🏗️ {t('stabilityEngineeringTitle')}
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-lg text-sm">
        {t('stabilityEngineeringSubtitle')}
      </p>

      <div className="flex flex-col lg:flex-row gap-6 max-w-4xl w-full items-start">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 lg:w-1/3 w-full">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-2">
            🎓 {t('engineeringLessonTitle')}
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>1. {t('centerOfMassTitle')}:</strong> {t('centerOfMassDescription')}</p>
            <p><strong>2. {t('loadPathTitle')}:</strong> {t('loadPathDescription')}</p>
            <p><strong>3. {t('stabilityIndexTitle')}:</strong> {t('stabilityIndexDescription')}</p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:w-2/3 w-full">
          <div className="flex justify-between w-full mb-4 space-x-4">
            <div className="bg-white p-3 rounded-xl shadow-md font-semibold text-lg text-green-700 flex-1 text-center">
              {t('heightLabel')}: <span className="text-3xl font-extrabold">{score}</span> {t('blocksLabel')}
            </div>
            <div className="bg-white p-3 rounded-xl shadow-md font-semibold text-lg text-purple-700 flex-1 text-center">
              {t('stabilityIndexLabel')}: <span className="text-3xl font-extrabold">{movingBlockData.width.toFixed(1)}</span> px
            </div>
          </div>

          <div className={`h-8 w-full text-center mb-2 ${dropFeedback ? dropFeedback.color : 'text-gray-500'}`}>
            {dropFeedback ? (
              <p className="font-semibold text-base transition-opacity duration-500">
                {dropFeedback.message} ({t('landedLabel')}: {dropFeedback.percentage}%)
              </p>
            ) : (
              <p className="text-sm italic">{t('beginBuildMessage')}</p>
            )}
          </div>

          <div
            className="relative border-4 border-gray-900 bg-gray-200 shadow-2xl overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 active:scale-[0.99]"
            style={{ width: GAME_WIDTH, height: GAME_WIDTH }}
            onClick={handleGameClick}
          >
            <div
              className="absolute inset-x-0 bottom-0 transition-transform duration-300"
              style={{ transform: `translateY(-${scrollOffset}px)` }}
            >
              {stackedBlocks.map(block => (
                <div
                  key={block.id}
                  className={`absolute rounded-sm shadow-inner transition-colors`}
                  style={{
                    width: block.width,
                    height: BLOCK_HEIGHT,
                    left: block.x - block.width / 2,
                    bottom: block.y,
                  }}
                >
                  <div className={`w-full h-full ${block.color} rounded-sm opacity-90`} />
                </div>
              ))}
              {isGameActive && (
                <div
                  className={`absolute rounded-sm shadow-lg ${movingBlockData.color} transition-colors duration-100`}
                  style={{
                    width: movingBlockData.width,
                    height: BLOCK_HEIGHT,
                    left: movingBlockX,
                    bottom: maxStackHeight,
                  }}
                />
              )}
              {!isGameActive && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4 rounded-xl">
                  <p className="text-3xl font-bold text-red-400 mb-2 animate-pulse">{t('failureTitle')}</p>
                  <p className="text-lg text-white text-center mb-4">
                    <strong>{t('failureReasonTitle')}:</strong> {t('failureReasonDescription')}
                  </p>
                  <p className="text-xl text-yellow-300 mb-4">{t('finalHeightLabel')}: <strong>{score}</strong> {t('blocksLabel')}</p>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleGameClick}
                  >
                    {t('restartButton')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">{t('clickToPlayMessage')}</p>
    </div>
  );
};

export default StabilityEngineeringGame;
