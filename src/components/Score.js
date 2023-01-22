import React from 'react'
import "./Score.css"

export function Score({ scores, xIsNext }) {
  const { xScore, oScore } = scores;

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xIsNext && "inactive"}`}>X - {xScore}</span>
      <span className={`score o-score ${xIsNext && "inactive"}`}>O - {oScore}</span>
    </div>
  );
}