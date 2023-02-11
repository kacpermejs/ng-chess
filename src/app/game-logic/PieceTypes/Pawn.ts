import { ChessBoard, ChessBoardCoord, ChessGameState, GameStateStoreService, Move, Turn } from "../../stores/game-state-store.service";
import { AbstractMovementPattern } from "../AbstractMovementPattern";
import { IPiece, PieceType } from "../Piece";
import { AbstractPiece } from "./AbstractPiece";

class OneSquareStraight extends AbstractMovementPattern {

  constructor() {
    super();
  }

  computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[] {

    let result: Move[] = [];

    let computedMove: Move;
    if ( piece.isWhite )
      computedMove = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x, startingPosition.y - 1),
        piece);
    else
      computedMove = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x, startingPosition.y + 1),
        piece);
    result.push(computedMove);
    return result;
  }

  condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean {
    //if there is any piece in front =>  condition isn't met
    if(board.hasAnyPiece(move.to))
      return false

    return true;
  }
}

class TwoSquareStraight extends AbstractMovementPattern {
  constructor() {
    super();
  }

  computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[] {

    let result: Move[] = [];

    let computedMove: Move;
    if ( piece.isWhite )
      computedMove = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x, startingPosition.y - 2),
        piece);
    else
      computedMove = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x, startingPosition.y + 2),
        piece);
    result.push(computedMove);
    return result;
  }

  condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean {
    if(board.hasAnyPiece(move.to))
      return false

    let startingRank = gameState.turn == Turn.white ? 6 : 1;
    if(move.from.y != startingRank)
      return false;

    let forwardOffset = gameState.turn == Turn.white ? -1 : 1;
    if(board.hasAnyPiece(new ChessBoardCoord(move.from.x, move.from.y + forwardOffset)))
      return false

    return true;
  }

}

class NormalPawnAttack extends AbstractMovementPattern {
  constructor() {
    super();
  }

  computeMoves(startingPosition: ChessBoardCoord, piece: IPiece, board: ChessBoard, gameState: ChessGameState): Move[] {

    let result: Move[] = [];

    let leftAttack: Move;
    let rightAttack: Move;
    if ( piece.isWhite ) {
      leftAttack = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x - 1, startingPosition.y - 1),
        piece);
      rightAttack = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x + 1, startingPosition.y - 1),
        piece);
      }
    else {
      leftAttack = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x + 1, startingPosition.y + 1),
        piece);
      rightAttack = new Move(startingPosition,
        new ChessBoardCoord(startingPosition.x - 1, startingPosition.y + 1),
        piece);
    }
    result.push(leftAttack);
    result.push(rightAttack);
    return result;
  }

  condition(move: Move, board: ChessBoard, gameState: ChessGameState): boolean {
    if(!board.hasEnemyPiece(move.to, gameState))
      return false

    return true;
  }

}

export class Pawn extends AbstractPiece {

  type: PieceType;

  constructor(isWhite: boolean) {
    super(isWhite);
    this.type = PieceType.pawn;
    this.moves.push(new OneSquareStraight());
    this.moves.push(new TwoSquareStraight());
    this.moves.push(new NormalPawnAttack());
  }




  // isValidMove(move: Move): boolean {
  //   let leftAttackedCoord: ChessBoardCoord;
  //   let rightAttackedCoord: ChessBoardCoord;

  //   if(this.isWhite) {
  //     leftAttackedCoord = new ChessBoardCoord(move.from.x + 1, move.from.y - 1);
  //     rightAttackedCoord = new ChessBoardCoord(move.from.x - 1, move.from.y - 1);
  //     console.log("White: ");
  //     console.log(leftAttackedCoord);
  //     console.log(rightAttackedCoord);
  //   } else {
  //     leftAttackedCoord = new ChessBoardCoord(move.from.x - 1, move.from.y + 1);
  //     rightAttackedCoord = new ChessBoardCoord(move.from.x + 1, move.from.y + 1);
  //     console.log("Black: ");
  //     console.log(leftAttackedCoord);
  //     console.log(rightAttackedCoord);
  //   }

  //   let leftAttackedPiece = move.state.getPiece(leftAttackedCoord.x, leftAttackedCoord.y);
  //   let rightAttackedPiece = move.state.getPiece(rightAttackedCoord.x, rightAttackedCoord.y);

  //   //normal attack
  //   if ( move.to.x == leftAttackedCoord.x
  //     && move.to.y == leftAttackedCoord.y
  //     && leftAttackedPiece
  //     && this.isWhite != leftAttackedPiece.isWhite) {

  //     return true;
  //   }
  //   if ( move.to.x == rightAttackedCoord.x
  //     && move.to.y == rightAttackedCoord.y
  //     && rightAttackedPiece
  //     && this.isWhite != rightAttackedPiece.isWhite) {

  //     return true;
  //   }
  //   //en passant
  //   if ( move.to.x == leftAttackedCoord.x
  //     && move.to.y == leftAttackedCoord.y
  //     && leftAttackedCoord.x == move.state.gameState.EnPassant?.x
  //     && leftAttackedCoord.y == move.state.gameState.EnPassant?.y) {

  //     return true;
  //   }
  //   if ( move.to.x == rightAttackedCoord.x
  //     && move.to.y == rightAttackedCoord.y
  //     && rightAttackedCoord.x == move.state.gameState.EnPassant?.x
  //     && rightAttackedCoord.y == move.state.gameState.EnPassant?.y) {

  //     return true;
  //   }

  //   //normal movement
  //   let canMove2Squares = true;
  //   if( this.isWhite )
  //     canMove2Squares = move.from.y == 6;
  //   else
  //     canMove2Squares = move.from.y == 1;
  //   //blocking piece in front
  //   let isBlocked = false;
  //   if (this.isWhite) {
  //     isBlocked = move.state.getPiece(move.from.x, move.from.y - 1) ? true : false;
  //   } else {
  //     isBlocked = move.state.getPiece(move.from.x, move.from.y + 1) ? true : false;
  //   }

  //   if (!isBlocked) {
  //     if ( this.isWhite ) {

  //       if (move.from.x == move.to.x && move.to.y == move.from.y - 1) //normal one square move
  //         return true;
  //       else if (canMove2Squares && move.from.x == move.to.x && move.to.y == move.from.y - 2) //two square move
  //         return true;

  //     } else {

  //       if (move.from.x == move.to.x && move.to.y == move.from.y + 1)
  //         return true;
  //       else if (canMove2Squares && move.from.x == move.to.x && move.to.y == move.from.y + 2)
  //         return true;
  //     }
  //   }

  //   return false;
  // }

  // newGameStateAfterMove(move: Move, currentState: GameStateStoreService): ChessGameState {
  //   let newState : ChessGameState = {
  //     whiteCastlingPermission: move.state.gameState.whiteCastlingPermission,
  //     blackCastlingPermission: move.state.gameState.blackCastlingPermission,
  //     EnPassant: move.state.gameState.EnPassant,
  //     whiteKingAttacked: move.state.gameState.whiteKingAttacked,
  //     blackKingAttacked: move.state.gameState.blackKingAttacked,
  //   };
  //   if (this.isWhite) {
  //     if (move.from.x == move.to.x && move.to.y == move.from.y - 2 ) { //moved 2 squares
  //       newState.EnPassant = new ChessBoardCoord(move.from.x, move.from.y - 1);
  //     }
  //   } else {
  //     if (move.from.x == move.to.x && move.to.y == move.from.y + 2 ) { //moved 2 squares
  //       newState.EnPassant = new ChessBoardCoord(move.from.x, move.from.y + 1);
  //     }
  //   }

  //   return newState; //no change
  // }
}
