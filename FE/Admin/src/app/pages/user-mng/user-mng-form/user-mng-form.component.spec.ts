import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngFormComponent } from './user-mng-form.component';

describe('UserMngFormComponent', () => {
  let component: UserMngFormComponent;
  let fixture: ComponentFixture<UserMngFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMngFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
