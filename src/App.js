import React, { useState } from "react";
import { Board } from "./components/Board";
import { Score } from "./components/Score";
import "./App.css";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);

		const winner = calculateWinner(nextSquares);
    if (winner === "X") {
      setScores({ xScore: scores.xScore + 1, oScore: scores.oScore });
    } else if (winner === "O") {
      setScores({ xScore: scores.xScore, oScore: scores.oScore + 1 });
    }
	}

	function jumpTo(move) {
		setCurrentMove(move);
	}

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	const moves = history.map((squares, move) => {
		const description = move ? `Move #${move}` : `Reset`;
		return (
			<button key={move} className={`btn ${move === 0 && "reset"}`} onClick={() => jumpTo(move)}>{description}</button>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Score scores={scores} xIsNext={xIsNext}/>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
			</div>
			<div className="game-info">
				{moves}
				<h1>Currently on: move #{currentMove+1}</h1>
			</div>
		</div>
	);
}