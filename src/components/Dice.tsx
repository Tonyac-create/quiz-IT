import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceProps {
  value: number | null;
  onRoll: () => void;
  disabled: boolean;
}

const diceIcons = [
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
];

export function Dice({ value, onRoll, disabled }: DiceProps) {
  const DiceIcon = value ? diceIcons[value - 1] : Dice1;

  return (
    <button
      onClick={onRoll}
      disabled={disabled}
      className={`p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <DiceIcon size={48} className="text-blue-600" />
    </button>
  );
}