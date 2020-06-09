import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueStatsComponent } from './value-stats.component';

describe('ValueStatsComponent', () => {
  let component: ValueStatsComponent;
  let fixture: ComponentFixture<ValueStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
