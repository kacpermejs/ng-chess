import { ChessBoard, ChessBoardCoord, ChessGameState, GameStateStoreService, Move } from "src/app/stores/game-state-store.service";
import { IPiece, PieceType } from "../Piece";
import { IMovementPattern } from "../IMovementPattern";
import { AbstractPiece } from "./AbstractPiece";
import { AbstractMovementPattern } from "../AbstractMovementPattern";


export class Knight extends AbstractPiece {
  type: PieceType;

  constructor(isWhite: boolean) {
    super(isWhite);
    this.type = PieceType.knight;
    this.moves.push(new KnightMovement());
  }
}

class KnightMovement extends AbstractMovementPattern {

  constructor() {
    super();
  }

  computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[] {

    let result: Move[] = [];

    let offsets = KnightOffsets();

    let maxX = board.xSize - 1;
    let maxY = board.ySize - 1;

    offsets.forEach(offset => {

      let computedPosition = new ChessBoardCoord(
        startingPosition.x + offset.x,
        startingPosition.y + offset.y);
        if (computedPosition.x <= maxX && computedPosition.x >= 0 &&
          computedPosition.y <= maxY && computedPosition.y >= 0) {

          let move = new Move(startingPosition, computedPosition, piece);
          result.push(move);
        }
        //out of bounds
    });
    return result;
  }

  condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean {
    //if there is any piece in front =>  condition isn't met
    if(board.hasPieceOfActivePlayer(move.to, gameState))
      return false

    return true;
  }
}

export function KnightOffsets() {
  let results: {x: number, y: number}[] = [
    {x:  1, y:  2},
    {x:  2, y:  1},
    {x:  2, y: -1},
    {x:  1, y: -2},

    {x: -1, y: -2},
    {x: -2, y: -1},
    {x: -2, y:  1},
    {x: -1, y:  2},
  ];
  return results;
}
