import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodStatsComponent } from './food-stats.component';

describe('FoodStatsComponent', () => {
  let component: FoodStatsComponent;
  let fixture: ComponentFixture<FoodStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
