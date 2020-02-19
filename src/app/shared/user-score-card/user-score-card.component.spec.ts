import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScoreCardComponent } from './user-score-card.component';

describe('UserScoreCardComponent', () => {
  let component: UserScoreCardComponent;
  let fixture: ComponentFixture<UserScoreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserScoreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
