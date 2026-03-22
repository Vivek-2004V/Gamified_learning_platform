'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  Bar,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

interface QuizHistoryItem {
  quizName: string;
  score: number;
  date: string;
  streak: number;
}

interface SimulationAttemptItem {
  simulationName: string;
  attempts: number;
  bestScore: number;
  lastPlayed: string;
}

interface LabPerformanceItem {
  labName: string;
  status: 'completed' | 'in-progress' | 'not-started';
  grade: string;
  submittedOn: string;
}

interface UserProgressData {
  quizHistory?: QuizHistoryItem[];
  simulationAttempts?: SimulationAttemptItem[];
  labPerformance?: LabPerformanceItem[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ProgressPage() {
  const { t } = useLanguage();
  const { user } = useUser();
  const firestore = useFirestore();

  const userProgressRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'userProgress', user.uid) : null),
    [firestore, user]
  );

  const { data: userProgress, isLoading } =
    useDoc<UserProgressData>(userProgressRef);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>{t('loading')}</p>
      </div>
    );
  }

  const labStatusData = React.useMemo(() => {
    const counts = { completed: 0, 'in-progress': 0, 'not-started': 0 };
    userProgress?.labPerformance?.forEach((lab) => {
      counts[lab.status]++;
    });
    return [
      { name: 'Completed', value: counts.completed },
      { name: 'In Progress', value: counts['in-progress'] },
      { name: 'Not Started', value: counts['not-started'] },
    ];
  }, [userProgress]);

  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('analyticsDashboard')}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              <LineChart className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-md font-medium">
                {t('quizHistory')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: 'Score',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="h-[200px] w-full"
              >
                <RechartsLineChart data={userProgress?.quizHistory}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="quizName"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="score"
                    type="monotone"
                    stroke="var(--color-score)"
                    strokeWidth={2}
                    dot={false}
                  />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              <BarChart className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-md font-medium">
                {t('simulationAttempts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  bestScore: {
                    label: 'Best Score',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="h-[200px] w-full"
              >
                <RechartsBarChart data={userProgress?.simulationAttempts}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="simulationName"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="bestScore"
                    fill="var(--color-bestScore)"
                    radius={4}
                  />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              <PieChart className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-md font-medium">
                {t('labPerformance')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[200px] w-full">
                <RechartsPieChart>
                  <Tooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={labStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {labStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                  />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('quizHistory')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('quizName')}</TableHead>
                <TableHead className="text-center">{t('score')}</TableHead>
                <TableHead className="text-center">{t('streak')}</TableHead>
                <TableHead className="text-right">{t('date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userProgress?.quizHistory?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.quizName}</TableCell>
                  <TableCell className="text-center">{item.score}</TableCell>
                  <TableCell className="text-center">{item.streak}</TableCell>
                  <TableCell className="text-right">
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {!userProgress?.quizHistory?.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No quiz history yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('simulationAttempts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('simulationName')}</TableHead>
                <TableHead className="text-center">{t('attempts')}</TableHead>
                <TableHead className="text-center">{t('bestScore')}</TableHead>
                <TableHead className="text-right">{t('lastPlayed')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userProgress?.simulationAttempts?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.simulationName}</TableCell>
                  <TableCell className="text-center">{item.attempts}</TableCell>
                  <TableCell className="text-center">
                    {item.bestScore}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(item.lastPlayed).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {!userProgress?.simulationAttempts?.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No simulation history yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('labPerformance')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('labName')}</TableHead>
                <TableHead className="text-center">{t('status')}</TableHead>
                <TableHead className="text-center">{t('grade')}</TableHead>
                <TableHead className="text-right">{t('submittedOn')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userProgress?.labPerformance?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.labName}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        item.status === 'completed' ? 'default' : 'secondary'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.grade || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.submittedOn
                      ? new Date(item.submittedOn).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
              {!userProgress?.labPerformance?.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No lab performance data yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
