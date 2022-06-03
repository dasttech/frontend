import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitePaperComponent } from './white-paper.component';

describe('WhitePaperComponent', () => {
  let component: WhitePaperComponent;
  let fixture: ComponentFixture<WhitePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitePaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
