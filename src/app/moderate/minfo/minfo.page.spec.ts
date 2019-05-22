import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinfoPage } from './minfo.page';

describe('MinfoPage', () => {
  let component: MinfoPage;
  let fixture: ComponentFixture<MinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
