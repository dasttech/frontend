import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAssetPageComponent } from './recover-asset-page.component';

describe('RecoverAssetPageComponent', () => {
  let component: RecoverAssetPageComponent;
  let fixture: ComponentFixture<RecoverAssetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverAssetPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverAssetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
