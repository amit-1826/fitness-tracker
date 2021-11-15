import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTrainingDialogComponent } from './cancel-training-dialog.component';

describe('CancelTrainingDialogComponent', () => {
  let component: CancelTrainingDialogComponent;
  let fixture: ComponentFixture<CancelTrainingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelTrainingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
