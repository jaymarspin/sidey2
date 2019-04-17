import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedPage } from './edit-sched.page';

describe('EditSchedPage', () => {
  let component: EditSchedPage;
  let fixture: ComponentFixture<EditSchedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
