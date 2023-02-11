import { Injectable, OnInit } from '@angular/core';
import { ALPHABETICAL_INDEX, createPieceFromFenChar, getPieceChar, IPiece, PieceType } from '../game-logic/Piece';
import { Rank } from '../game-logic/Rank';
import FenParser from '@chess-fu/fen-parser';
import { Square } from '../game-logic/Square';
import { MoveValidationService } from './move-validation.service';
import { ChessBoardCoord, GameStateStoreService, Move, Turn } from '../stores/game-state-store.service';


/**
 * Temporary all in one class until all the logic is implemented
 * TODO: split it into a store and validation service
 */
@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private moveValidationService: MoveValidationService, private gameStateStore: GameStateStoreService) {
    this.gameStateStore.LoadInitialPosition();
  }

  performMove(from: Square, to: Square) {
    if (!this.moveValidationService.validateMoveServer(from, to)) {
      throw new Error('Server validation failed');
    }


    let movedPiece = this.gameStateStore.board.getPieceAtSquare(from);
    if(!movedPiece)
      throw new Error('No piece to move - validation failed');

    let move = new Move(from.coords, to.coords, movedPiece);

    let takenPiece: IPiece | undefined;
    if(movedPiece.type == PieceType.pawn
      && to.coords.x == this.gameStateStore.gameState.EnPassant?.x
      && to.coords.y == this.gameStateStore.gameState.EnPassant?.y) {

      console.log("Performed en passant!!!");
      let takenEnPassantPieceCoord: ChessBoardCoord;
      if(movedPiece.isWhite) {
        takenEnPassantPieceCoord = new ChessBoardCoord(this.gameStateStore.gameState.EnPassant!.x,
                                                       this.gameStateStore.gameState.EnPassant!.y + 1);
      }
      else {
        takenEnPassantPieceCoord = new ChessBoardCoord(this.gameStateStore.gameState.EnPassant!.x,
                                                       this.gameStateStore.gameState.EnPassant!.y - 1);
      }

      takenPiece = this.gameStateStore.board.getPieceAt(takenEnPassantPieceCoord.x, takenEnPassantPieceCoord.y);
      //remove taken piece
      this.gameStateStore.board.boardArray[takenEnPassantPieceCoord.y*8 + takenEnPassantPieceCoord.x] = '-';

    } else {
      takenPiece = this.gameStateStore.board.getPieceAtSquare(to);
      //no need to remove because it will be replaced
    }

    if (takenPiece) {
      if (this.gameStateStore.gameState.turn == Turn.white) {
        this.gameStateStore.whiteTakenPieces.push(getPieceChar(takenPiece));
      } else {
        this.gameStateStore.blackTakenPieces.push(getPieceChar(takenPiece));
      }
    }

    // remove the piece standing on the "from" square
    this.gameStateStore.board.boardArray[from.coords.y*8 + from.coords.x] = '-';
    // place the piece at the "to" square
    this.gameStateStore.board.boardArray[to.coords.y*8 + to.coords.x] = getPieceChar(movedPiece);
    // switch to other player's turn
    if (this.gameStateStore.gameState.turn == Turn.white)
      this.gameStateStore.gameState.turn = Turn.black;
    else
      this.gameStateStore.gameState.turn = Turn.white;

    console.log("Old state: ");
    console.log(this.gameStateStore.gameState);
    //this.gameStateStore.updateGameState(move);
    console.log("New state: ");
    console.log(this.gameStateStore.gameState);

  }





}








