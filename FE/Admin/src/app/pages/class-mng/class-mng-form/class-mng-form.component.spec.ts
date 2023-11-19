import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMngFormComponent } from './class-mng-form.component';

describe('ClassMngFormComponent', () => {
  let component: ClassMngFormComponent;
  let fixture: ComponentFixture<ClassMngFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassMngFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMngFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
