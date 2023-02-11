import { ChessBoard, ChessBoardCoord, ChessGameState, GameStateStoreService, Move } from "../stores/game-state-store.service";
import { IMovementPattern } from "./IMovementPattern";
import { Bishop } from "./PieceTypes/Bishop";
import { King } from "./PieceTypes/King";
import { Knight } from "./PieceTypes/Knight";
import { Pawn } from "./PieceTypes/Pawn";
import { Queen } from "./PieceTypes/Queen";
import { Rook } from "./PieceTypes/Rook";

export interface IPiece {
  isWhite: boolean;
  type: PieceType;

  moves: IMovementPattern[];

  getAllPossibleMoves(startingPosition: ChessBoardCoord, board: ChessBoard, gameState: ChessGameState): Move[];
}



export enum PieceType {
  pawn,
  king,
  queen,
  bishop,
  knight,
  rook
}

export enum ALPHABETICAL_INDEX {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H
}

export function getPieceChar(piece: IPiece): string {
  let type = piece.type;
  let isWhite: boolean = piece.isWhite;
  let character: string;

  //piece type
  switch (type) {
    case PieceType.rook:
      character = 'r';
      break;
    case PieceType.knight:
      character = 'n';
      break;
    case PieceType.bishop:
      character = 'b';
      break;
    case PieceType.queen:
      character = 'q';
      break;
    case PieceType.king:
      character = 'k';
      break;
    case PieceType.pawn:
      character = 'p';
      break;
  }

  let result = isWhite ? character.toUpperCase() : character;

  return result;
}

export function createPieceFromFenChar(FenChar: string): IPiece | undefined {
  let type: PieceType = PieceType.pawn;
  let isWhite: boolean = false;

  //piece color
  if (FenChar == FenChar.toLowerCase()) {
    //it is lower case
    isWhite = false;
  } else {
    //it is upper case
    isWhite = true;
  }

  //piece type
  if(FenChar === '-')
    return undefined;

  switch (FenChar.toLowerCase()) {
    case 'r':
      type = PieceType.rook;
      break;
    case 'n':
      type = PieceType.knight;
      break;
    case 'b':
      type = PieceType.bishop;
      break;
    case 'q':
      type = PieceType.queen;
      break;
    case 'k':
      type = PieceType.king;
      break;
    case 'p':
      type = PieceType.pawn;
      break;
  }

  let result = CreatePiece(isWhite, type);

  return result;

}

export function isValidPieceChar(character: string): boolean {
  switch (character.toLocaleLowerCase()) {
    case 'r':
      return true;
    case 'n':
      return true;
    case 'b':
      return true;
    case 'q':
      return true;
    case 'k':
      return true;
    case 'p':
      return true;
    default:
      return false;
  }
}

export function CreatePiece(isWhite: boolean, type: PieceType): IPiece {
  switch (type) {
    case PieceType.pawn:
      return new Pawn(isWhite);
    case PieceType.king:
      return new King(isWhite);
    case PieceType.queen:
      return new Queen(isWhite);
    case PieceType.bishop:
      return new Bishop(isWhite);
    case PieceType.knight:
      return new Knight(isWhite);
    case PieceType.rook:
      return new Rook(isWhite);

  }
}

