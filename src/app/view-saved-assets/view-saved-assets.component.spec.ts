import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavedAssetsComponent } from './view-saved-assets.component';

describe('ViewSavedAssetsComponent', () => {
  let component: ViewSavedAssetsComponent;
  let fixture: ComponentFixture<ViewSavedAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSavedAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSavedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
