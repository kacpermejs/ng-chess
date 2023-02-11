import { ChessBoard, ChessBoardCoord, ChessGameState, Move } from "../stores/game-state-store.service";
import { IPiece } from "./Piece";
import { IMovementPattern } from "./IMovementPattern";


export abstract class AbstractMovementPattern implements IMovementPattern {
  abstract computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[];
  abstract condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean;
  getPossibleMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[] {
    let result: Move[] = [];
    let computedMoves = this.computeMoves(startingPosition, piece, board, gameState);
    computedMoves.forEach(move => {
      //if condition is met => add this move to the result list
      if (this.condition(move, board, gameState))
        result.push(move);
    });

    console.log(result);
    return result;
  }

}
