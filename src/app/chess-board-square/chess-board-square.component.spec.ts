import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessBoardSquareComponent } from './chess-board-square.component';

describe('ChessBoardSquareComponent', () => {
  let component: ChessBoardSquareComponent;
  let fixture: ComponentFixture<ChessBoardSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessBoardSquareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessBoardSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
