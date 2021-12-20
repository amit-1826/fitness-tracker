import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class UiService {
  showLoaderEvent: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }



}
