import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createPieceFromFenChar, IPiece, PieceType } from '../game-logic/Piece';
import { Square } from '../game-logic/Square';
import { GameService } from '../services/game.service';
import { GameStateStoreService } from '../stores/game-state-store.service';

@Component({
  selector: 'app-chess-board-square',
  templateUrl: './chess-board-square.component.html',
  styleUrls: ['./chess-board-square.component.css']
})
export class ChessBoardSquareComponent {
  //public input and output members
  @Input() square?: Square;
  @Input() showRankLabel: boolean = false;
  @Input() showFileLabel: boolean = false;
  @Output() clickHandlingRequest = new EventEmitter<Square>();

  //private member variables
  @Input() isSelectedPiece: boolean = false;
  isPossibleMove: boolean = false;

  //public properties
  public get piece(): IPiece | undefined { return this.gameStateStore.board.getPieceAt(this.square!.id, this.square!.parentRank.id); }
  public get canBeSelected(): boolean { return true; } //TODO: implement some condition
  public get hasPiece(): boolean { return this.piece != null; }

  constructor(private gameService: GameService, private gameStateStore: GameStateStoreService) { }

  //event handlers
  onSquareClicked() {
    this.clickHandlingRequest.emit(this.square);
  }

  setAsPossibleMove() {
    this.isPossibleMove = true;
  }
  unsetAsPossibleMove() {
    this.isPossibleMove = false;
  }

  get pieceName(): string {
    let piece = this.piece;
    if(piece)
    {
      let name = PieceType[piece.type];
      return name;
    }
    else
    {
      return '';
    }
  }

  get pieceColor(): string {
    if(this.piece)
      return this.piece.isWhite ? 'white' : 'black';
    else
      return '';
  }

}
