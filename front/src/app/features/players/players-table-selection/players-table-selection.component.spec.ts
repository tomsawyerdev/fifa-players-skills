import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersTableSelectionComponent } from './players-table-selection.component';

describe('PlayersTableSelectionComponent', () => {
  let component: PlayersTableSelectionComponent;
  let fixture: ComponentFixture<PlayersTableSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersTableSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersTableSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
