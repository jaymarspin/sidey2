import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwningPage } from './owning.page';

describe('OwningPage', () => {
  let component: OwningPage;
  let fixture: ComponentFixture<OwningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
