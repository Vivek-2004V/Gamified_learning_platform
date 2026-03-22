'use client';
import { useLanguage } from '@/context/language-context';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BrainCircuit, FlaskConical, Wrench, Calculator } from 'lucide-react';

const WorksheetSection = ({
  title,
  icon,
  questions,
}: {
  title: string;
  icon: React.ReactNode;
  questions: string[];
}) => (
  <AccordionItem value={title}>
    <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline">
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>
    </AccordionTrigger>
    <AccordionContent className="prose prose-lg max-w-none pl-4">
      <ol className="list-decimal list-inside space-y-4" start={questions[0] ? parseInt(questions[0].split('.')[0]) : 1}>
        {questions.map((q, i) => (
          <li key={i} className="pl-2">{q.substring(q.indexOf('.') + 2)}</li>
        ))}
      </ol>
    </AccordionContent>
  </AccordionItem>
);

export default function WorksheetsPage() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t('stemScience'),
      icon: <FlaskConical className="h-6 w-6 text-green-500" />,
      questions: Array.from({ length: 25 }, (_, i) => t(`ws_sci_q${i + 1}`)),
    },
    {
      title: t('stemTechnology'),
      icon: <BrainCircuit className="h-6 w-6 text-blue-500" />,
      questions: Array.from({ length: 25 }, (_, i) => t(`ws_tech_q${i + 1}`)),
    },
    {
      title: t('stemEngineering'),
      icon: <Wrench className="h-6 w-6 text-purple-500" />,
      questions: Array.from({ length: 25 }, (_, i) => t(`ws_eng_q${i + 1}`)),
    },
    {
      title: t('stemMathematics'),
      icon: <Calculator className="h-6 w-6 text-red-500" />,
      questions: Array.from({ length: 25 }, (_, i) => t(`ws_math_q${i + 1}`)),
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          {t('learningMaterialWorksheets')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('worksheetSubtitle')}
        </p>
      </div>

      <Accordion type="multiple" className="w-full space-y-4">
        {sections.map(({ title, icon, questions }) => (
          <WorksheetSection
            key={title}
            title={title}
            icon={icon}
            questions={questions}
          />
        ))}
      </Accordion>
    </div>
  );
}
