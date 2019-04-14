import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleEditPage } from './title-edit.page';

describe('TitleEditPage', () => {
  let component: TitleEditPage;
  let fixture: ComponentFixture<TitleEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
