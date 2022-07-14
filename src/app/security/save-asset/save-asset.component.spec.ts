import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAssetComponent } from './save-asset.component';

describe('SaveAssetComponent', () => {
  let component: SaveAssetComponent;
  let fixture: ComponentFixture<SaveAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
