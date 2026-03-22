'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import bn from '@/locales/bn.json';
import ta from '@/locales/ta.json';
import te from '@/locales/te.json';

type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te';

const translations = { en, hi, bn, ta, te };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, variables?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // This code now runs only on the client
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // Persist the selected language on the client
    localStorage.setItem('language', lang);
  };

  const t = (key: string, variables?: { [key: string]: string | number }): string => {
    let translation = translations[language][key as keyof typeof translations[Language]] || key;

    if (variables) {
      Object.keys(variables).forEach((variableName) => {
        const regex = new RegExp(`{{${variableName}}}`, 'g');
        translation = translation.replace(regex, String(variables[variableName]));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
