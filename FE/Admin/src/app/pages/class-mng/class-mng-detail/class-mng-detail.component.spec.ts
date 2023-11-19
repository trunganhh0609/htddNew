import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMngDetailComponent } from './class-mng-detail.component';

describe('ClassMngDetailComponent', () => {
  let component: ClassMngDetailComponent;
  let fixture: ComponentFixture<ClassMngDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassMngDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMngDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
