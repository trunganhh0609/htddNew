import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPointComponent } from './class-point.component';

describe('ClassPointComponent', () => {
  let component: ClassPointComponent;
  let fixture: ComponentFixture<ClassPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
