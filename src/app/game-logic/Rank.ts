import { Labeled } from './Labeled';
import { Square } from './Square';


export class Rank implements Labeled {
  id: number;
  label: string;

  squares: Square[] = Array(8);

  constructor(pos: number, size: number) {
    this.id = pos;
    this.label = ConvertRankIdToLabel(pos, size);
    this.squares = Array(size);

    for (let i = 0; i < size; i++) {
      this.squares[i] = new Square(i, this);
    }


  }
}

export function ConvertRankIdToLabel(id: number, size: number): string {
  return (size-1-id + 1).toString();
}

