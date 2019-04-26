import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmealPage } from './viewmeal.page';

describe('ViewmealPage', () => {
  let component: ViewmealPage;
  let fixture: ComponentFixture<ViewmealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
