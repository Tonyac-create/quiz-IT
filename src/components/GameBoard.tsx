import React from 'react';
import { Player, BOARD_SIZE, BONUS_SQUARES, TRAP_SQUARES } from '../types';
import { Mouse, Keyboard, Bot, Server, Wifi, Laptop } from 'lucide-react';

interface GameBoardProps {
  players: Player[];
}

// Function to map player index to an IT-themed icon
const getPlayerIcon = (index: number) => {
  const playerIcons = [
    { icon: Mouse, color: '#FF6B6B' },     // Player 1: Mouse
    { icon: Keyboard, color: '#4ECDC4' },  // Player 2: Keyboard
    { icon: Bot, color: '#45B7D1' },       // Player 3: Robot
    { icon: Server, color: '#96CEB4' },    // Player 4: Server
    { icon: Wifi, color: '#FFD700' },      // Player 5: Wifi
    { icon: Laptop, color: '#8A4FFF' }     // Player 6: Laptop
  ];

  return playerIcons[index] || playerIcons[0];
};

export function GameBoard({ players }: GameBoardProps) {
  const squares = Array.from({ length: BOARD_SIZE }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-10 gap-2 p-4 bg-gray-700 rounded-lg">
      {squares.map((square) => (
        <div
          key={square}
          className={`relative h-16 flex items-center justify-center rounded-md ${
            BONUS_SQUARES.includes(square)
              ? 'bg-green-300'
              : TRAP_SQUARES.includes(square)
              ? 'bg-red-300'
              : 'bg-white'
          }`}
        >
          <span className="text-sm text-gray-600">{square}</span>
          {players.map((player, playerIndex) =>
            player.position === square ? (
              <div
                key={player.id}
                className="absolute top-[0.4rem] transform -translate-y-1/2"
              >
                {(() => {
                  const { icon: PlayerIcon, color } = getPlayerIcon(playerIndex);
                  return (
                    <PlayerIcon 
                      size={28} 
                      style={{ 
                        color: color,
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
                      }} 
                    />
                  );
                })()}
              </div>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
}