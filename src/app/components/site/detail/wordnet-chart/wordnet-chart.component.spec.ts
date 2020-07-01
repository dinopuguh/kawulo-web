import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordnetChartComponent } from './wordnet-chart.component';

describe('WordnetChartComponent', () => {
  let component: WordnetChartComponent;
  let fixture: ComponentFixture<WordnetChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordnetChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordnetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
