import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMngComponent } from './class-mng.component';

describe('ClassMngComponent', () => {
  let component: ClassMngComponent;
  let fixture: ComponentFixture<ClassMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassMngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
