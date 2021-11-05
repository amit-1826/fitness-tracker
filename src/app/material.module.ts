import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NativeDateModule} from "@angular/material/core";

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, NativeDateModule,
    MatInputModule],
  providers: [MatDatepickerModule, NativeDateModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, NativeDateModule,
    MatInputModule]
})
export class MaterialModule { }
