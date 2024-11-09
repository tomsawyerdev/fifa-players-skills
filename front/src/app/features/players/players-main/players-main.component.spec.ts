import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersMainComponent } from './players-main.component';

describe('PlayersMainComponent', () => {
  let component: PlayersMainComponent;
  let fixture: ComponentFixture<PlayersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
