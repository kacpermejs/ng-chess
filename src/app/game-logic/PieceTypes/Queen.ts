import { IPiece, PieceType } from "../Piece";
import { IMovementPattern } from "../IMovementPattern";
import { ChessBoard, ChessBoardCoord, ChessGameState, Move } from "src/app/stores/game-state-store.service";
import { AbstractPiece } from "./AbstractPiece";
import { DiagonalBlockingMovement } from "../MovementPatterns/DiagonalBlockingMovement";
import { RookMovement } from "../MovementPatterns/RookMovement";


export class Queen extends AbstractPiece {
  type: PieceType;

  constructor(isWhite: boolean) {
    super(isWhite);
    this.type = PieceType.queen;
    this.moves.push(new DiagonalBlockingMovement(7));
    this.moves.push(new RookMovement(7));
  }
}
