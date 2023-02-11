import { ChessBoard, ChessBoardCoord, ChessGameState, Move } from "src/app/stores/game-state-store.service";
import { IPiece, PieceType } from "../Piece";
import { IMovementPattern } from "../IMovementPattern";
import { AbstractPiece } from "./AbstractPiece";
import { DiagonalBlockingMovement } from "../MovementPatterns/DiagonalBlockingMovement";
import { RookMovement } from "../MovementPatterns/RookMovement";


export class King extends AbstractPiece {
  type: PieceType;

  constructor(isWhite: boolean) {
    super(isWhite);
    this.type = PieceType.king;
    this.moves.push(new DiagonalBlockingMovement(1));
    this.moves.push(new RookMovement(1));
  }
}
