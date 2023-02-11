import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Rank } from '../game-logic/Rank';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';
import { createPieceFromFenChar, IPiece, PieceType } from '../game-logic/Piece';
import { ChessBoardSquareComponent } from '../chess-board-square/chess-board-square.component';
import { Square } from '../game-logic/Square';
import { MoveValidationService } from '../services/move-validation.service';
import { ChessBoardCoord, GameStateStoreService, Move } from '../stores/game-state-store.service';


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {
  SIZE_X: number = 8;
  SIZE_Y: number = 8;

  //used only for proper coordinates, does not correspond to game logic
  ranks: Rank[];

  @ViewChildren(ChessBoardSquareComponent) boardSquareViews!: QueryList<ChessBoardSquareComponent>;

  playingAsWhite: boolean = true;
  possibleMoves: Move[] = [];

  private _selectedPieceSquare?: Square;
  private _selectedMoveSquare?: Square;

  constructor(private gameService: GameService,
    private moveValidationService: MoveValidationService,
    private gameStateStore: GameStateStoreService) {
    //rank array initialization
    this.ranks = Array(this.SIZE_Y);

    for (let i = 0; i < this.SIZE_Y; i++) {
      this.ranks[i] = new Rank(i, this.SIZE_X)
    }
  }

  isSelectedPiece(square: Square): boolean {
    return this._selectedPieceSquare === square;
  }

  pieceHasBeenSelected(): boolean {
    return this._selectedPieceSquare ? true : false;
  }

  handleSquareClick(event: Square) {
    console.log("handleSquareClick fired for square: "
    + "(" + event.coords.x + ", " + event.coords.y + ")"
    + "labeled: " + event.label + event.parentRank.label);

    let selectedSquare = event;

    if (this.gameStateStore.board.hasPieceOfActivePlayer(selectedSquare.coords, this.gameStateStore.gameState)) //select piece to move
      this.handlePieceSelection(selectedSquare);
    else if (this._selectedPieceSquare) //move piece previously selected
      this.handleTargetSquareSelection(selectedSquare);
  }

  /**
   * this._selectedPieceSquare must be set before you call this method!
   * @param selectedSquare square that player selected to move his piece to
   */
  private handleTargetSquareSelection(selectedSquare: Square) {
    this._selectedMoveSquare = selectedSquare;
    console.log("Move position selected");
    let result = this.TryMove(this._selectedPieceSquare!, this._selectedMoveSquare);

    if (result) {
      //deselect all
      console.log("Valid move!");
      this.deselectAll();
    } else {
      //deselect only move square
      this._selectedMoveSquare = undefined;
      console.log("Invalid move!");
    }
  }

  private handlePieceSelection(selectedSquare: Square) {
    if (selectedSquare !== this._selectedPieceSquare) {
      //select the clicked square
      this._selectedPieceSquare = selectedSquare;
      console.log("Piece selected");
      // this.possibleMoves = this.moveValidationService.getValidMovesAt(//currently not used and not implemented
      //   selectedSquare.coords,
      //   this.gameService.getPieceAtSquare(selectedSquare)!);
      this.possibleMoves = this.moveValidationService.getValidMovesAtSquare(selectedSquare);
      this.refreshMoveHighlighting();
    } else {
      this.deselectAll();
      this.possibleMoves = [];
      this.unsetMoveHighlighting();
    }


  }
  unsetMoveHighlighting() {
    this.boardSquareViews.forEach(element => {
      element.unsetAsPossibleMove();
    });
  }

  refreshMoveHighlighting() {
    console.log("Refresh");
    this.unsetMoveHighlighting();

    this.possibleMoves.forEach(move => {
      let result = this.boardSquareViews.find(squareComponent => {
        if (squareComponent.square) {
          if(squareComponent.square.coords.x == move.to.x && squareComponent.square.coords.y == move.to.y) {
            return true;
          }
        }

        return false;
      });
      result?.setAsPossibleMove();
    });


  }



  deselectAll() {
    this._selectedPieceSquare = undefined;
    this._selectedMoveSquare = undefined;
  }

  isValidMovePositionForSelectedPiece(square: Square): boolean {
    if(this._selectedPieceSquare) {
      let result = this.possibleMoves.some( (move) => { move.to.x == square.coords.x && move.to.y == square.coords.y });
      console.log("Result is: " + result);
      return result;
    } else {
      return false;
    }
  }

  TryMove(from: Square, to: Square): boolean {
    console.log("Trying to move from " + from.label + from.parentRank.label + " to " + to.label + to.parentRank.label);
    if(this.moveValidationService.validateMoveLocal(from, to)) {
      this.gameService.performMove(from, to);
      this.possibleMoves = [];
      this.unsetMoveHighlighting();
      return true;
    }
    return false;
  }



}




