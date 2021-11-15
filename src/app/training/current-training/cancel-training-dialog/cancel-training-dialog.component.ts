import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-cancel-training-dialog',
  templateUrl: './cancel-training-dialog.component.html',
  styleUrls: ['./cancel-training-dialog.component.css']
})
export class CancelTrainingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit(): void {
  }

}
