import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEditHeaderComponent } from './player-edit-header.component';

describe('PlayerEditHeaderComponent', () => {
  let component: PlayerEditHeaderComponent;
  let fixture: ComponentFixture<PlayerEditHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerEditHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerEditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
