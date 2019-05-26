import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoGalleryPage } from './resto-gallery.page';

describe('RestoGalleryPage', () => {
  let component: RestoGalleryPage;
  let fixture: ComponentFixture<RestoGalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoGalleryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
