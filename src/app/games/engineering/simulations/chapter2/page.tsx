'use client';
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  FC,
} from 'react';
import {
  Lightbulb,
  Check,
  CornerRightDown,
  CornerRightUp,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import styles from './page.module.css';

// --- TYPESCRIPT INTERFACES ---
interface Gate {
  id: number;
  type: 'AND' | 'OR' | 'NOT';
  position: { x: number; y: number };
  disabled: boolean;
}

interface ConnectionPoint {
  x: number;
  y: number;
  label: string;
}

type ConnectionSegment = [number, number, number, number, number];

// --- CONSTANTS ---
const CIRCUIT_WIDTH = 500;
const CIRCUIT_HEIGHT = 400;

const INITIAL_GATES: Gate[] = [
  { id: 1, type: 'AND', position: { x: 150, y: 100 }, disabled: true },
  { id: 2, type: 'NOT', position: { x: 150, y: 250 }, disabled: false },
  { id: 3, type: 'OR', position: { x: 300, y: 175 }, disabled: true },
];

const INPUT_POSITIONS: ConnectionPoint[] = [
  { x: 50, y: 50, label: 'A' },
  { x: 50, y: 150, label: 'B' },
  { x: 50, y: 250, label: 'C' },
];

const OUTPUT_POSITION: ConnectionPoint = { x: 450, y: 200, label: 'Q' };
const TARGET_OUTPUT: number = 1;

// --- CORE LOGIC FUNCTIONS ---
const calculateGateOutput = (
  type: 'AND' | 'OR' | 'NOT',
  inputs: number[]
): number => {
  switch (type) {
    case 'AND':
      return inputs.every((input: number) => input === 1) ? 1 : 0;
    case 'OR':
      return inputs.some((input: number) => input === 1) ? 1 : 0;
    case 'NOT':
      return inputs[0] === 1 ? 0 : 1;
    default:
      return 0;
  }
};

const getGateInputs = (
  gateId: number,
  inputs: number[],
  gates: Gate[]
): number[] => {
  if (gateId === 1) return [inputs[0], inputs[1]];
  if (gateId === 2) return [inputs[2]];
  if (gateId === 3) {
    const gate1: Gate | undefined = gates.find((g: Gate) => g.id === 1);
    const gate2: Gate | undefined = gates.find((g: Gate) => g.id === 2);
    const output1: number =
      gate1 && !gate1.disabled
        ? calculateGateOutput(gate1.type, [inputs[0], inputs[1]])
        : 0;
    const output2: number =
      gate2 && !gate2.disabled
        ? calculateGateOutput(gate2.type, [inputs[2]])
        : 0;
    return [output1, output2];
  }
  return [];
};

// --- REACT COMPONENT ---
const LogicLinkGame: FC = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<number[]>([0, 0, 0]);
  const [gates, setGates] = useState<Gate[]>(INITIAL_GATES);
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const toggleInput = useCallback((index: number): void => {
    setInputs((prevInputs: number[]) => {
      const newInputs: number[] = [...prevInputs];
      newInputs[index] = newInputs[index] === 0 ? 1 : 0;
      return newInputs;
    });
  }, []);

  const toggleGateStatus = useCallback((id: number): void => {
    setGates((prevGates: Gate[]) =>
      prevGates.map((gate: Gate) =>
        gate.id === id ? { ...gate, disabled: !gate.disabled } : gate
      )
    );
  }, []);

  const {
    finalOutput,
    gateOutputs,
  }: { finalOutput: number; gateOutputs: Record<number, number> } = useMemo(() => {
    let currentGateOutputs: Record<number, number> = {};
    gates.forEach((gate: Gate) => {
      if (gate.id !== 3) {
        const gateInputs: number[] = getGateInputs(gate.id, inputs, gates);
        currentGateOutputs[gate.id] = !gate.disabled
          ? calculateGateOutput(gate.type, gateInputs)
          : 0;
      }
    });
    const gate3: Gate | undefined = gates.find((g: Gate) => g.id === 3);
    const gate3Inputs: number[] = [
      currentGateOutputs[1] || 0,
      currentGateOutputs[2] || 0,
    ];
    const output3: number =
      gate3 && !gate3.disabled
        ? calculateGateOutput(gate3.type, gate3Inputs)
        : 0;
    currentGateOutputs[3] = output3;
    const output: number = output3;
    return { finalOutput: output, gateOutputs: currentGateOutputs };
  }, [inputs, gates]);

  useEffect(() => {
    if (finalOutput === TARGET_OUTPUT) {
      setMessage(t('logicLinkSuccess'));
      setSuccess(true);
    } else {
      setMessage(t('logicLinkAdjust'));
      setSuccess(false);
    }
  }, [finalOutput, t]);

  const renderGate = (gate: Gate, output: number): JSX.Element => {
    const isAndOr: boolean = gate.type === 'AND' || gate.type === 'OR';
    const isActive: boolean = !gate.disabled;
    const statusColor: string = isActive ? 'bg-indigo-600' : 'bg-gray-400';
    const outputColor: string =
      output === 1 ? 'border-green-400 bg-green-200' : 'border-red-400 bg-red-200';

    return (
      <div
        key={gate.id}
        className="absolute flex flex-col items-center justify-center p-2 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
        style={{
          left: gate.position.x,
          top: gate.position.y,
          width: 90,
          height: 50,
          backgroundColor: '#333',
        }}
      >
        <div
          className={`text-white font-bold text-lg mb-1 ${
            isActive ? 'text-yellow-300' : 'text-gray-200'
          }`}
        >
          {gate.type}
        </div>
        {isAndOr && (
          <button
            onClick={() => toggleGateStatus(gate.id)}
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor} text-white`}
          >
            {isActive ? t('logicLinkStatusOn') : t('logicLinkStatusOff')}
          </button>
        )}
        <div
          className={`absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${outputColor} shadow-inner`}
        />
      </div>
    );
  };

  const renderConnection = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    value: number
  ): JSX.Element => {
    const lineThickness: number = 2;
    const color: string = value === 1 ? 'bg-green-500' : 'bg-gray-700';
    let style: React.CSSProperties = {
      left: Math.min(x1, x2),
      top: Math.min(y1, y2) - lineThickness / 2,
      width: Math.abs(x1 - x2),
      height: lineThickness,
      transform: 'none',
      transformOrigin: '0% 50%',
    };

    if (Math.abs(x1 - x2) < 1) {
      style = {
        left: x1 - lineThickness / 2,
        top: Math.min(y1, y2),
        width: lineThickness,
        height: Math.abs(y1 - y2),
        transform: 'none',
        transformOrigin: '0% 50%',
      };
    } else if (Math.abs(y1 - y2) < 1) {
      style = {
        left: Math.min(x1, x2),
        top: y1 - lineThickness / 2,
        width: Math.abs(x1 - x2),
        height: lineThickness,
        transform: 'none',
        transformOrigin: '0% 50%',
      };
    } else {
      const angle: number = Math.atan2(y2 - y1, x2 - x1);
      const length: number = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      );
      style = {
        left: x1,
        top: y1 - lineThickness / 2,
        width: length,
        height: lineThickness,
        transform: `rotate(${angle}rad)`,
        transformOrigin: '0% 50%',
      };
    }

    return (
      <div
        className={`absolute ${color} transition-colors duration-300`}
        style={{ ...style, zIndex: 10 }}
      />
    );
  };

  const connections: ConnectionSegment[] = useMemo(() => {
    const pA: ConnectionPoint = INPUT_POSITIONS[0];
    const pB: ConnectionPoint = INPUT_POSITIONS[1];
    const pC: ConnectionPoint = INPUT_POSITIONS[2];
    const g1: Gate = gates.find((g: Gate) => g.id === 1)!;
    const g2: Gate = gates.find((g: Gate) => g.id === 2)!;
    const g3: Gate = gates.find((g: Gate) => g.id === 3)!;
    const g1InX: number = g1.position.x;
    const g1InY1: number = g1.position.y + 10;
    const g1InY2: number = g1.position.y + 40;
    const g2InX: number = g2.position.x;
    const g2InY: number = g2.position.y + 25;
    const g3InX: number = g3.position.x;
    const g3InY1: number = g3.position.y + 10;
    const g3InY2: number = g3.position.y + 40;
    const g1OutX: number = g1.position.x + 90;
    const g1OutY: number = g1.position.y + 25;
    const g2OutX: number = g2.position.x + 90;
    const g2OutY: number = g2.position.y + 25;
    const g3OutX: number = g3.position.x + 90;
    const g3OutY: number = g3.position.y + 25;
    const outQ: ConnectionPoint = OUTPUT_POSITION;
    const gate1OutputValue: number = gateOutputs[1]!;
    const gate2OutputValue: number = gateOutputs[2]!;
    const turnPointX: number = g3InX - 5;
    return [
      [pA.x + 10, pA.y, turnPointX, pA.y, inputs[0]],
      [turnPointX, pA.y, turnPointX, g1InY1, inputs[0]],
      [turnPointX, g1InY1, g1InX, g1InY1, inputs[0]],
      [pB.x + 10, pB.y, turnPointX, pB.y, inputs[1]],
      [turnPointX, pB.y, turnPointX, g1InY2, inputs[1]],
      [turnPointX, g1InY2, g1InX, g1InY2, inputs[1]],
      [pC.x + 10, pC.y, turnPointX, pC.y, inputs[2]],
      [turnPointX, pC.y, turnPointX, g2InY, inputs[2]],
      [turnPointX, g2InY, g2InX, g2InY, inputs[2]],
      [g1OutX, g1OutY, g3InX - 5, g1OutY, gate1OutputValue],
      [g3InX - 5, g1OutY, g3InX - 5, g3InY1, gate1OutputValue],
      [g3InX - 5, g3InY1, g3InX, g3InY1, gate1OutputValue],
      [g2OutX, g2OutY, g3InX - 5, g2OutY, gate2OutputValue],
      [g3InX - 5, g2OutY, g3InX - 5, g3InY2, gate2OutputValue],
      [g3InX - 5, g3InY2, g3InX, g3InY2, gate2OutputValue],
      [g3OutX, g3OutY, outQ.x - 10, g3OutY, finalOutput],
    ];
  }, [inputs, gates, gateOutputs, finalOutput]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
        {t('logicLinkTitle')}
      </h1>
      <p
        className="text-gray-600 mb-6 text-center max-w-xl text-sm"
        dangerouslySetInnerHTML={{ __html: t('logicLinkSubtitle') }}
      ></p>

      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full items-start">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-200 lg:w-1/3 w-full">
          <h2 className="text-xl font-bold text-indigo-700 mb-3 border-b pb-2">
            {t('logicLinkLessonTitle')}
          </h2>
          <div
            className="space-y-3 text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: t('logicLinkLessonContent') }}
          ></div>
        </div>

        <div className="flex flex-col items-center lg:w-2/3 w-full">
          <div className="w-full h-12 flex items-center justify-center bg-white rounded-xl shadow-md mb-4 p-2">
            <p
              className={`font-semibold text-center transition-colors duration-500 ${
                success ? 'text-green-700 text-lg' : 'text-red-700 text-base'
              }`}
            >
              {success && <Check className="inline w-5 h-5 mr-2" />}
              {message}
            </p>
          </div>

          <div
            className="relative border-4 border-gray-900 bg-gray-800 shadow-2xl rounded-xl p-4"
            style={{ width: CIRCUIT_WIDTH, height: CIRCUIT_HEIGHT }}
          >
            {connections.map(
              ([x1, y1, x2, y2, value]: ConnectionSegment, index: number) => (
                <div key={index}>
                  {renderConnection(x1, y1, x2, y2, value)}
                </div>
              )
            )}
            {INPUT_POSITIONS.map((p: ConnectionPoint, index: number) => (
              <button
                key={index}
                className="absolute flex flex-col items-center p-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                style={{
                  left: p.x - 20,
                  top: p.y - 20,
                  width: 40,
                  height: 40,
                }}
                onClick={() => toggleInput(index)}
              >
                <div
                  className={`text-xl font-bold ${
                    inputs[index] === 1 ? 'text-green-400' : 'text-gray-400'
                  }`}
                >
                  {p.label}
                </div>
                <div
                  className={`text-xs font-mono rounded-full px-2 mt-1 ${
                    inputs[index] === 1 ? 'bg-green-600' : 'bg-red-600'
                  } text-white`}
                >
                  {inputs[index]}
                </div>
              </button>
            ))}
            {gates.map((gate: Gate) =>
              renderGate(gate, gateOutputs[gate.id]!)
            )}
            <div
              className="absolute flex flex-col items-center justify-center p-2 rounded-full shadow-2xl"
              style={{
                left: OUTPUT_POSITION.x - 20,
                top: OUTPUT_POSITION.y - 20,
                width: 40,
                height: 40,
                backgroundColor: finalOutput === 1 ? 'gold' : 'black',
              }}
            >
              <Lightbulb
                className={`w-6 h-6 transition-colors duration-500 ${
                  finalOutput === 1
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-500 fill-gray-900'
                }`}
              />
            </div>
            {INPUT_POSITIONS.map((p: ConnectionPoint, index: number) => (
              <div
                key={index}
                className="absolute text-white font-bold text-lg"
                style={{ left: p.x - 30, top: p.y - 10 }}
              >
                {p.label}
              </div>
            ))}
            <div
              className="absolute text-white font-bold text-lg"
              style={{
                left: OUTPUT_POSITION.x + 30,
                top: OUTPUT_POSITION.y - 10,
              }}
            >
              {OUTPUT_POSITION.label}
            </div>
          </div>
        </div>
      </div>

      <p
        className="mt-4 text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: t('logicLinkCircuitFormula') }}
      ></p>
    </div>
  );
};

export default LogicLinkGame;
