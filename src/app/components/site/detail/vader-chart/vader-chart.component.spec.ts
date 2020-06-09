import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaderChartComponent } from './vader-chart.component';

describe('VaderChartComponent', () => {
  let component: VaderChartComponent;
  let fixture: ComponentFixture<VaderChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaderChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
