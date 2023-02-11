import { IPiece, PieceType } from "../Piece";
import { AbstractPiece } from "./AbstractPiece";
import { RookMovement } from "../MovementPatterns/RookMovement";


export class Rook extends AbstractPiece {
  type: PieceType;

  constructor(isWhite: boolean) {
    super(isWhite);
    this.type = PieceType.rook;
    this.moves.push(new RookMovement(7));
  }
}
