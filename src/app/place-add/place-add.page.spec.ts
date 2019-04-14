import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAddPage } from './place-add.page';

describe('PlaceAddPage', () => {
  let component: PlaceAddPage;
  let fixture: ComponentFixture<PlaceAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
