import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class UiService {
  showLoaderEvent: Subject<boolean> = new Subject<boolean>();

  constructor(private matSnackBar: MatSnackBar) {
  }

  showSnackbar(message: string, action: string|undefined, duration: number) {
    this.matSnackBar.open(message, action, {
      duration: duration
    });
  }



}
