import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMngDeailFormComponent } from './class-mng-deail-form.component';

describe('ClassMngDeailFormComponent', () => {
  let component: ClassMngDeailFormComponent;
  let fixture: ComponentFixture<ClassMngDeailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassMngDeailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMngDeailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
