import { ChessBoard, ChessBoardCoord, ChessGameState, Move } from "../../stores/game-state-store.service";
import { IPiece, PieceType } from "../Piece";
import { IMovementPattern } from "../IMovementPattern";


export abstract class AbstractPiece implements IPiece {
  isWhite: boolean;
  moves: IMovementPattern[];

  abstract type: PieceType;

  constructor(isWhite: boolean) {
    this.isWhite = isWhite;
    this.moves = [];
  }

  getAllPossibleMoves(startingPosition: ChessBoardCoord, board: ChessBoard, gameState: ChessGameState): Move[] {
    let allMoves: Move[] = [];
    this.moves.forEach(movePattern => {
      let patternMoves = movePattern.getPossibleMoves(startingPosition, this, board, gameState);
      patternMoves.forEach(move => {
        allMoves.push(move);
      });
    });

    return allMoves;
  }

}
