import { ChessBoard, ChessBoardCoord, ChessGameState, Move } from "src/app/stores/game-state-store.service";
import { AbstractMovementPattern } from "../AbstractMovementPattern";
import { IPiece } from "../Piece";



export class RookMovement extends AbstractMovementPattern {
  maxRange: number;

  constructor(range: number) {
    super();
    this.maxRange = range;
  }

  computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[] {
    let result: Move[] = [];

    let offsets = RightAngleOffsets();

    let maxX = board.xSize - 1;
    let maxY = board.ySize - 1;

    offsets.forEach(offset => {
      for (let i = 1; i <= this.maxRange; i++) {
        let computedPosition = new ChessBoardCoord(
          startingPosition.x + offset.x * i,
          startingPosition.y + offset.y * i);

        if (computedPosition.x <= maxX && computedPosition.x >= 0 &&
          computedPosition.y <= maxY && computedPosition.y >= 0) {

          let move = new Move(startingPosition, computedPosition, piece);

          if (board.hasAnyPiece(computedPosition)) {
            if (board.hasEnemyPiece(computedPosition, gameState)) {
              //push it as a last one in that direction and go to the next
              result.push(move);
              break;
            } else {
              //cannot capture or go through a friendly piece
              break;
            }
          } else {
            //empty space
            result.push(move);
          }
        } else {
          //out of bounds
          break;
        }
      }
    });

    return result;
  }

  condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean {
    return true;
  }
}

export function RightAngleOffsets() {
  let results: {x: number, y: number}[] = [
    {x:  1, y:  0},
    {x: -1, y:  0},
    {x:  0, y:  1},
    {x:  0, y: -1},
  ];
  return results;
}
