import { ChessBoardCoord } from "src/app/stores/game-state-store.service";
import { PieceType } from "../Piece";
import { IMovementPattern } from "../IMovementPattern";
import { AbstractPiece } from "./AbstractPiece";
import { DiagonalBlockingMovement } from "../MovementPatterns/DiagonalBlockingMovement";

export class Bishop extends AbstractPiece {
  type: PieceType;

  constructor(isWhite: boolean) {
    super(isWhite);
    this.type = PieceType.bishop;
    this.moves.push(new DiagonalBlockingMovement(7));
  }

}

export function isDiagonal(from: ChessBoardCoord, to: ChessBoardCoord): boolean {

  if(Math.abs(from.x - to.x) == Math.abs(from.y - to.y)) {
    return true;
  }

  return false;
}



