import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CancelTrainingDialogComponent} from "./cancel-training-dialog/cancel-training-dialog.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() onTrainingExit: EventEmitter<any> = new EventEmitter<any>();
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
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
            clearInterval(this.timer);
            this.onTrainingExit.emit();
          } else {
            this.startOrResumeTimer();
          }
        })
    } else {
      this.progress = 0;
      this.startOrResumeTimer();
    }
  }

}
