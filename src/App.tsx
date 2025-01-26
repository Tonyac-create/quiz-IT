import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { Dice } from './components/Dice';
import { QuestionCard } from './components/QuestionCard';
import { PlayerSetup } from './components/PlayerSetup';
import { GameState, Player, BOARD_SIZE, BONUS_SQUARES, TRAP_SQUARES } from './types';
import { Brain, Trophy } from 'lucide-react';
import quiz_questions from '../quiz_questions.json';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    players: [],
    questions: [...quiz_questions].sort(() => Math.random() - 0.5),
    currentQuestion: null,
    diceValue: null,
    gameStarted: false,
    winner: null,
    answerResult: null,
  });

  const handleStartGame = (playerNames: string[]) => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: index,
      name,
      position: 1,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][index],
    }));
    const firstPlayerIndex = Math.floor(Math.random() * players.length);
    setGameState({
      ...gameState,
      players,
      gameStarted: true,
      currentPlayer: firstPlayerIndex,
    });
  };

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = gameState.players[gameState.currentPlayer];
    const newPosition = Math.min(currentPlayer.position + value, BOARD_SIZE);

    const updatedPlayers = gameState.players.map((player) =>
      player.id === currentPlayer.id
        ? { ...player, position: newPosition }
        : player
    );

    setGameState({
      ...gameState,
      players: updatedPlayers,
      diceValue: value,
      currentQuestion: gameState.questions[0],
    });
  };

  const handleAnswer = (isCorrect: boolean) => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    let newPosition = currentPlayer.position;

    // Handle bonus and trap squares
    if (isCorrect && BONUS_SQUARES.includes(Number(currentPlayer.position))) {
      newPosition = Math.min(newPosition + 2, BOARD_SIZE);
    } else if (!isCorrect && TRAP_SQUARES.includes(Number(currentPlayer.position))) {
      newPosition = Math.max(newPosition - 2, 1);
    }

    const updatedPlayers = gameState.players.map((player) =>
      player.id === currentPlayer.id
        ? { ...player, position: newPosition }
        : player
    );

    // Check for winner
    const winner = newPosition === BOARD_SIZE && isCorrect ? currentPlayer : null;

    setGameState({
      ...gameState,
      players: updatedPlayers,
      currentPlayer: winner 
        ? gameState.currentPlayer 
        : (isCorrect ? gameState.currentPlayer : (gameState.currentPlayer + 1) % gameState.players.length),
      currentQuestion: null,
      questions: [...gameState.questions.slice(1), gameState.questions[0]],
      winner,
      diceValue: null,
      answerResult: isCorrect ? 'correct' : 'incorrect',
    });
  };

  const handleContinue = () => {
    setGameState({
      ...gameState,
      answerResult: null,
    });
  };

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain size={64} className="text-white mr-4" />
            <h1 className="text-5xl font-bold text-white">IT Quiz Battle</h1>
          </div>
          <p className="text-white text-xl">Testez vos connaissances informatiques dans ce jeu de société passionnant !</p>
        </div>
        <PlayerSetup onStart={handleStartGame} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <Brain size={36} className="text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IT Quiz Battle
            </h1>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Current Player: {gameState.players[gameState.currentPlayer].name}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameBoard players={gameState.players} />
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Joueurs</h2>
              <div className="space-y-3">
                {gameState.players.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      gameState.currentPlayer === player.id
                        ? 'bg-blue-50 shadow-md scale-105'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: player.color }}
                      />
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      Position: {player.position}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {!gameState.winner && !gameState.currentQuestion && (
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Dice
                  value={gameState.diceValue}
                  onRoll={rollDice}
                  disabled={!!gameState.currentQuestion}
                />
              </div>
            )}
          </div>
        </div>

        {gameState.answerResult && (
          <div className="mt-4 w-full flex flex-col items-center justify-center">
            <div className={`p-4 rounded-lg mb-4 ${gameState.answerResult === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {gameState.answerResult === 'correct' 
                ? 'Bravo ! Votre réponse est correcte.' 
                : 'Désolé, votre réponse est incorrecte.'}
            </div>
            <button 
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Continuer
            </button>
          </div>
        )}

        {gameState.currentQuestion && !gameState.answerResult && (
          <div className="mt-4 w-full flex justify-center">
            <QuestionCard
              question={gameState.currentQuestion}
              onAnswer={(isCorrect) => handleAnswer(isCorrect)}
            />
          </div>
        )}

        {gameState.winner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
              <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                🎉 Bravo! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                {gameState.winner.name} a gagné la partie!
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Jouer à nouveau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;