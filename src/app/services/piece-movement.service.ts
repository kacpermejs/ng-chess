import { Injectable } from '@angular/core';
import { Move } from '../stores/game-state-store.service';

@Injectable({
  providedIn: 'root'
})
export class PieceMovementService {

  constructor() { }

  performMove(move: Move): void {

  }

  validateMove(): boolean {
    return true;
  }

  private updateGameState(): void {

  }

}
