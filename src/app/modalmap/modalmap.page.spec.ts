import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmapPage } from './modalmap.page';

describe('ModalmapPage', () => {
  let component: ModalmapPage;
  let fixture: ComponentFixture<ModalmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
