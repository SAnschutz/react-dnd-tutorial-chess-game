import React from 'react'
import Square from '../components/Square'
import Knight from '../components/Knight'
// import { moveKnight } from '../utils/game'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'




export default function Board (){
    
    function handleSquareClick(toX, toY) {
        canMoveKnight(toX, toY) && setKnightPosition([toX, toY])
      }

    function canMoveKnight(toX, toY) {
        const [x, y] = knightPosition
        const dx = toX - x
        const dy = toY - y
      
        return (
          (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
          (Math.abs(dx) === 1 && Math.abs(dy) === 2)
        )
      }
    
    function renderSquare(i, [knightX, knightY]){
        const x = i%8;
        const y = Math.floor(i/8)
        const black = (x+y)%2 === 1
        const isKnightHere = knightX === x && knightY === y;
        const piece = isKnightHere ? <Knight /> : null
        return (
        <div key={i} style={{height: '12.5%', width: '12.5%'}} onClick={() => handleSquareClick(x, y)}>
            <Square black={black}>{piece}</Square>
            </div>
        )
    }
    const [knightPosition, setKnightPosition] = useState([0,0])

    const squares = [];
    for (let i=0; i<64; i++){
        squares.push(renderSquare(i, knightPosition))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap'}}>
                {squares}
            </div>
        </DndProvider>
    )

}