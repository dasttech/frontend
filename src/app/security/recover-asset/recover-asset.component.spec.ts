import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAssetComponent } from './recover-asset.component';

describe('RecoverAssetComponent', () => {
  let component: RecoverAssetComponent;
  let fixture: ComponentFixture<RecoverAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
