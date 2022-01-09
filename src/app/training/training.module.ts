import {NgModule} from "@angular/core";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {TrainingComponent} from "./training.component";
import {
  CancelTrainingDialogComponent
} from "./current-training/cancel-training-dialog/cancel-training-dialog.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    CancelTrainingDialogComponent
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class TrainingModule {}
