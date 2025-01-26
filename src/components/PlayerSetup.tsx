import React, { useState } from 'react';

interface PlayerSetupProps {
  onStart: (players: string[]) => void;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFD700', '#8A4FFF'];

export function PlayerSetup({ onStart }: PlayerSetupProps) {
  const [players, setPlayers] = useState(['Joueur 1', 'Joueur 2']);

  const handleStart = () => {
    if (players.every((name) => name.trim())) {
      onStart(players);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Joueurs</h2>
      <div className="space-y-4">
        {players.map((player, index) => (
          <input
            key={index}
            type="text"
            value={player}
            onChange={(e) => {
              const newPlayers = [...players];
              newPlayers[index] = e.target.value;
              setPlayers(newPlayers);
            }}
            className="w-full p-2 border rounded-md"
            placeholder={`Joueur ${index + 1} nom`}
          />
        ))}
        <div className="flex gap-2">
          <button
            onClick={() => setPlayers([...players, `Joueur ${players.length + 1}`])}
            disabled={players.length >= 6}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Ajouter un joueur
          </button>
          <button
            onClick={() => setPlayers(players.slice(0, -1))}
            disabled={players.length <= 2}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            Supprimer un joueur
          </button>
        </div>
        <button
          onClick={handleStart}
          className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Commencer la partie
        </button>
      </div>
    </div>
  );
}