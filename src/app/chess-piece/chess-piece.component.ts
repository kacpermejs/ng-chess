import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IPiece, PieceType } from '../game-logic/Piece';

@Component({
  selector: 'app-chess-piece',
  templateUrl: './chess-piece.component.html',
  styleUrls: ['./chess-piece.component.css']
})
export class ChessPieceComponent {
  @Input() pieceType: string = '';
  @Input() pieceColor: string = '';

  constructor(public viewContainerRef: ViewContainerRef) {
    //this.updateImagePath(new Piece(true, this.pieceType));
  }

  get imagePath(): string
  {
    return this.getPath(this.pieceType, this.pieceColor);
  };

  getPath(pieceTypeName: string, pieceColor: string): string {

    //console.log(PieceType[(<any>PieceType)[pieceTypeName]]);

    let typeName = PieceType[(<any>PieceType)[pieceTypeName]];

    //console.log(pieceTypeName);

    let colorMarker: string = ChessPieceComponent.extractColorMarker(pieceColor);
    let resolvedPath = IMG_FOLDER_PATH
                        + colorMarker
                        + '_'
                        + typeName
                        + '_png_shadow_128px.png';

    //console.log("Path: " + resolvedPath);

    return resolvedPath;

  }


  private static extractColorMarker(pieceColor: string): string {
    switch (pieceColor.toLowerCase()) {
      case 'white': return 'w';
      case 'black': return 'b';
      default: return 'w';
    }
  }
}

const IMG_FOLDER_PATH = './assets/img/'
