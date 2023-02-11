import { Injectable } from '@angular/core';
import { createPieceFromFenChar, IPiece, isValidPieceChar } from '../game-logic/Piece';
import { Square } from '../game-logic/Square';

export enum Castling {
  none,
  queenSide,
  kingSide,
  both
}

export enum Turn {
  white,
  black
}

export class ChessBoardCoord {
  x : number;
  y : number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface GameBoard {
  xSize: number;
  ySize: number;
}

export class ChessBoard implements GameBoard {
  xSize: number;
  ySize: number;

  boardArray: string[];

  FENString: string = '';

  constructor() {
    this.xSize = 8;
    this.ySize = 8;
    this.boardArray = Array(this.xSize * this.ySize);
  }

  getPieceStringAt(x: number, y: number): string { return this.boardArray[y * 8 + x]; }

  getPieceAt(x: number, y: number): IPiece | undefined {
    let pieceFenChar = this.getPieceStringAt(x, y);
    let pieceObj = createPieceFromFenChar(pieceFenChar);

    return pieceObj;
  }

  getPieceAtCoords(coords: ChessBoardCoord): IPiece | undefined { return this.getPieceAt(coords.x, coords.y); }

  getPieceAtSquare(square: Square): IPiece | undefined { return this.getPieceAt(square.coords.x, square.coords.y); }

  loadPositionFromFEN(FENString: string): void {
    this.FENString = FENString;
    var stringIndex = 0;
    for (let i = 0; i < 64; i++) {
      let character = FENString[stringIndex];
      //console.log('char: ' + character);
      let num = parseInt(character);
      if(num)
      {
        //console.log('num: ' + num);
        for (let j = 0; j < num; j++) {
          this.boardArray[i] = '-';
          //console.log("adding empties: " + (j+1).toString() + " of " + num);
          i++;
        }
        i--;
      } else if (character === '/') {
        i--;
        //console.log("skipping on /");
        //console.log("End of the rank at index: " + i);
      } else if (isValidPieceChar(character)) {
        //console.log("adding " + character + " to the array at index " + i);
        this.boardArray[i] = character;
      }
      stringIndex++;
    }
  }

  hasAnyPiece(coords: ChessBoardCoord): boolean {
    return this.getPieceAtCoords(coords) ? true : false; //any color
  }

  hasPieceOfActivePlayer(coords: ChessBoardCoord, gameState: ChessGameState): boolean {
    let piece = this.getPieceAtCoords(coords);
    let hasPiece = piece ? true : false;
    let pieceIsWhite = piece?.isWhite ? true : false;
    if (hasPiece) {
      if (gameState.turn == Turn.white && pieceIsWhite)
        return true;
      else if (gameState.turn == Turn.black && !pieceIsWhite)
        return true;
    }
    return false;
  }

  hasEnemyPiece(coords: ChessBoardCoord, gameState: ChessGameState): boolean {
    let piece = this.getPieceAtCoords(coords);
    let hasPiece = piece ? true : false;
    let pieceIsWhite = piece?.isWhite ? true : false;
    if (hasPiece) {
      if (gameState.turn == Turn.white && !pieceIsWhite)
        return true;
      else if (gameState.turn == Turn.black && pieceIsWhite)
        return true;
    }
    return false;
  }

  removePieceAtCoords(coords: ChessBoardCoord) {

  }
}

export class ChessGameState {
  whiteCastlingPermission: Castling = Castling.both;
  blackCastlingPermission: Castling = Castling.both;

  EnPassant?: ChessBoardCoord = undefined;

  whiteKingAttacked: boolean = false;
  blackKingAttacked: boolean = false;

  turn: Turn = Turn.white;
}

export class Move {
  from: ChessBoardCoord;
  to: ChessBoardCoord;

  piece: IPiece;

  callback = () => {};

  constructor (from: ChessBoardCoord, to: ChessBoardCoord, piece: IPiece) {
    this.from = from;
    this.to = to;
    this.piece = piece;
  }
}


@Injectable({
  providedIn: 'root'
})
export class GameStateStoreService {

  constructor() { }

  board: ChessBoard = new ChessBoard();
  whiteTakenPieces: string[] = [];
  blackTakenPieces: string[] = [];

  gameState: ChessGameState = new ChessGameState(); //default state

  // updateGameState(move: Move) {
  //   let currentEnPassant = this.gameState.EnPassant;

  //   this.gameState = move.newGameState(this.gameState);

  //   if (this.gameState.EnPassant === currentEnPassant)
  //     this.gameState.EnPassant = undefined;
  // }

  LoadInitialPosition(): void {
    this.board.loadPositionFromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  }

  updateFenString(): void {
    //TODO: FEN parser
  }
}




