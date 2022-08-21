import React from 'react'
import Square from '../components/Square'
import BoardSquare from '../components/BoardSquare'
import Knight from '../components/Knight'
import { canMoveKnight } from '../utils/game'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function Board (){
    const [knightPosition, setKnightPosition] = useState([0,0])
    
    function handleSquareClick(toX, toY) {
        canMoveKnight(toX, toY) && setKnightPosition([toX, toY])
      }



      function renderBoardSquare (i, knightPosition) {
        const x = i%8;
        const y = Math.floor(i/8)
        
        return (
            <div key={i} style={{height: '12.5%', width: '12.5%'}} onClick={() => handleSquareClick(x, y)}>
                <BoardSquare x={x} y={y} setKnightPosition={setKnightPosition}>{renderPiece(x, y, knightPosition)}</BoardSquare>
            </div>
        )
      }

      function renderPiece (x, y, [knightX, knightY]){
        if (x === knightX && y === knightY){
            return <Knight/>
        }

      }
    
    
    const squares = [];
    for (let i=0; i<64; i++){
        squares.push(renderBoardSquare(i, knightPosition))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap'}}>
                {squares}
            </div>
        </DndProvider>
    )

}