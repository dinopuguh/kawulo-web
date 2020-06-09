import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordnetStatsComponent } from './wordnet-stats.component';

describe('WordnetStatsComponent', () => {
  let component: WordnetStatsComponent;
  let fixture: ComponentFixture<WordnetStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordnetStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordnetStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
