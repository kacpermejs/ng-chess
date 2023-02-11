import { ChessBoardSquareComponent } from "../chess-board-square/chess-board-square.component";
import { Labeled } from "./Labeled";
import { ALPHABETICAL_INDEX, IPiece } from "./Piece";
import { Rank } from "./Rank";
import { ChessBoardCoord } from "../stores/game-state-store.service";

export class Square implements Labeled {
  id: number;
  label: string;

  parentRank: Rank;

  coords: ChessBoardCoord;

  constructor(x: number, rank: Rank) {
    this.id = x;
    this.label = ALPHABETICAL_INDEX[x];

    this.parentRank = rank;
    this.coords = new ChessBoardCoord(x, rank.id);
  }
}
