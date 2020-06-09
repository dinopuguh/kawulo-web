import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHeatmapComponent } from './review-heatmap.component';

describe('ReviewHeatmapComponent', () => {
  let component: ReviewHeatmapComponent;
  let fixture: ComponentFixture<ReviewHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
