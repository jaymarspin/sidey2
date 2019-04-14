import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeraterestoPage } from './moderateresto.page';

describe('ModeraterestoPage', () => {
  let component: ModeraterestoPage;
  let fixture: ComponentFixture<ModeraterestoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeraterestoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeraterestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
