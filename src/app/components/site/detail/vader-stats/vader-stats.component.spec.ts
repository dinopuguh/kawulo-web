import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaderStatsComponent } from './vader-stats.component';

describe('VaderStatsComponent', () => {
  let component: VaderStatsComponent;
  let fixture: ComponentFixture<VaderStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaderStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
