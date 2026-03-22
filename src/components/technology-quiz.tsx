'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, X, Award, Book } from 'lucide-react';

export function TechnologyQuiz() {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    question: t(`tech_q${i + 1}_title`),
    options: [t(`tech_q${i + 1}_a`), t(`tech_q${i + 1}_b`), t(`tech_q${i + 1}_c`)],
    correctAnswer: t(`tech_q${i + 1}_correct`),
  })), [t]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  }, [currentQuestionIndex, quizQuestions.length]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(handleNext, 1200); // Auto-advance after a short delay
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto text-center p-8 shadow-xl rounded-2xl bg-white">
        <CardHeader>
          <Award className="w-20 h-20 mx-auto text-yellow-400" />
          <CardTitle className="text-3xl font-bold mt-4 text-gray-800">
            {t('quizAdventureComplete')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4 text-gray-600">
            {t('quizFinalScore')}:
            <span className="font-bold text-5xl text-primary block mt-2">
              {score} / {quizQuestions.length}
            </span>
          </p>
          <Button onClick={handleRestart} size="lg" className="mt-4">
            {t('quizPlayAgain')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="bg-slate-50 p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
      <Card className="w-full max-w-3xl mx-auto shadow-none rounded-xl border-none bg-transparent">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center items-center mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-slate-200 px-3 py-1 rounded-full">
              <Book size={16} />
              <span>Technology</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {t('techQuizTitle')}
          </CardTitle>
          <div className="w-full px-4 mt-4">
             <Progress value={progress} className="h-2 [&>*]:bg-primary" />
             <p className="text-center text-xs text-gray-500 mt-1">
                {t('quizQuestion')} {currentQuestionIndex + 1} {t('quizOf')} {quizQuestions.length}
             </p>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Card className="bg-white p-6 rounded-xl shadow-md min-h-[120px] flex items-center justify-center text-center">
            <p className="text-xl font-semibold text-gray-700">
              {currentQuestion.question}
            </p>
          </Card>

          <div className="flex flex-col gap-4 mt-6">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;

              let stateClass = "bg-white hover:bg-slate-100 border-slate-300";
              if (isAnswered) {
                if (isCorrect) {
                  stateClass = 'bg-green-100 border-green-400 text-green-800';
                } else if (isSelected && !isCorrect) {
                  stateClass = 'bg-red-100 border-red-400 text-red-800';
                } else {
                  stateClass = 'bg-slate-100 border-slate-200 text-slate-500 opacity-70';
                }
              }

              return (
                <Card
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${stateClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        isAnswered ? isCorrect ? 'bg-green-500' : isSelected ? 'bg-red-500' : 'bg-slate-400' : 'bg-primary'
                    }`}>
                      {isAnswered && isSelected && !isCorrect && <X size={20} />}
                      {isAnswered && isCorrect && <Check size={20} />}
                      {!isAnswered && <span>{String.fromCharCode(65 + currentQuestion.options.indexOf(option))}</span>}
                    </div>
                    <span className="font-medium text-base text-gray-800">{option}</span>
                  </div>
                </Card>
              );
            })}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
