import {NgModule} from "@angular/core";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ]
})
export class SharedModule {}
