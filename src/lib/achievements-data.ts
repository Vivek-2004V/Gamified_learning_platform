export interface Achievement {
  titleKey: string;
  descriptionKey: string;
  icon: string;
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  {
    titleKey: 'scienceWhiz',
    descriptionKey: 'scienceWhizDescription',
    icon: '🔬',
    unlocked: true,
  },
  {
    titleKey: 'mathMagician',
    descriptionKey: 'mathMagicianDescription',
    icon: '🧙',
    unlocked: true,
  },
  {
    titleKey: 'techGuru',
    descriptionKey: 'techGuruDescription',
    icon: '💻',
    unlocked: false,
  },
  {
    titleKey: 'engineeringPro',
    descriptionKey: 'engineeringProDescription',
    icon: '⚙️',
    unlocked: true,
  },
  {
    titleKey: 'quizMaster',
    descriptionKey: 'quizMasterDescription',
    icon: '🏆',
    unlocked: true,
  },
  {
    titleKey: 'simulationChampion',
    descriptionKey: 'simulationChampionDescription',
    icon: '🎮',
    unlocked: false,
  },
  {
    titleKey: 'logicLeaper',
    descriptionKey: 'logicLeaperDescription',
    icon: '🧠',
    unlocked: true,
  },
  {
    titleKey: 'dataDetective',
    descriptionKey: 'dataDetectiveDescription',
    icon: '📊',
    unlocked: false,
  },
  {
    titleKey: 'creativeCoder',
    descriptionKey: 'creativeCoderDescription',
    icon: '🎨',
    unlocked: true,
  },
];
