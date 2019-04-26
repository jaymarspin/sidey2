import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakereviewPage } from './makereview.page';

describe('MakereviewPage', () => {
  let component: MakereviewPage;
  let fixture: ComponentFixture<MakereviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakereviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakereviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
