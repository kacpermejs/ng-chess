import { ChessBoard, ChessBoardCoord, ChessGameState, Move } from "../stores/game-state-store.service";
import { IPiece } from "./Piece";


export interface IMovementPattern {
  computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[];
  condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean;
  getPossibleMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[];
}
