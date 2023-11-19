import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePointComponent } from './generate-point.component';

describe('GeneratePointComponent', () => {
  let component: GeneratePointComponent;
  let fixture: ComponentFixture<GeneratePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
