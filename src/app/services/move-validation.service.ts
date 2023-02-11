import { Injectable } from '@angular/core';
import { IPiece } from '../game-logic/Piece';
import { Square } from '../game-logic/Square';
import { ChessBoardCoord, GameStateStoreService, Move } from '../stores/game-state-store.service';

@Injectable({
  providedIn: 'root'
})
export class MoveValidationService {

  constructor(private gameStateStore: GameStateStoreService) { }

  validateMoveLocal(from: Square, to: Square): boolean {
    // let movedPiece = this.gameStateStore.getPieceAtSquare(from);

    // if (this.gameStateStore.hasPieceOfActivePlayer(to)) {
    //   return false;
    // }
    // if (!movedPiece) {
    //   return false;
    // }
    // if (!movedPiece.isValidMove( new Move(from.coords, to.coords, movedPiece) )) {
    //   return false;
    // }

    return true;
  }

  validateMoveServer(from: Square, to: Square): boolean {
    return this.validateMoveLocal(from, to);
  }

  getValidMovesAtSquare(movingPieceLocation: Square) : Move[] {

    let movedPiece = this.gameStateStore.board.getPieceAtCoords(movingPieceLocation.coords);

    if(!movedPiece)
      throw new Error("No piece moving!!!");

    console.log("TUTAJ!");
    let result = movedPiece.getAllPossibleMoves(
      movingPieceLocation.coords,
      this.gameStateStore.board,
      this.gameStateStore.gameState);
    console.log(result);
    return result;
  }
}
