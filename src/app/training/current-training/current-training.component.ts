import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CancelTrainingDialogComponent} from "./cancel-training-dialog/cancel-training-dialog.component";
import {TrainingService} from "../training.service";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {

  progress = 0;
  timer: any;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = (this.trainingService.getCurrentExercise().duration / 1000) * 100;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStopOrStartAgain() {
    if (this.progress < 100) {
      clearInterval(this.timer);
      this.dialog.open(CancelTrainingDialogComponent, {
        data: {
          progress: this.progress
        }
      }).afterClosed()
        .subscribe((res) => {
          if (res && this.timer) {
            this.trainingService.cancelExercise(this.progress);
            clearInterval(this.timer);
          } else {
            this.startOrResumeTimer();
          }
        })
    } else {
      this.progress = 0;
      this.startOrResumeTimer();
    }
  }

  ngOnDestroy() {

  }

}
