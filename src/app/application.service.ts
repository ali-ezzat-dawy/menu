import { menuItems } from "./admin/components/menu/menu";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem, Category } from "src/app/app.models";
import { AppSettings } from "src/app/app.settings";
import { environment } from 'src/environments/environment.prod'; 
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "./shared/confirm-dialog/confirm-dialog.component";
import { AlertDialogComponent } from "./shared/alert-dialog/alert-dialog.component";
import { map } from "rxjs/operators";
export class Data {
  constructor(
    public categories: Category[],
    public cartList: MenuItem[],

  ) {}
}

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  public url = environment.url;
  constructor(
    public http: HttpClient,
    private datePipe: DatePipe,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public translateService: TranslateService
  ) {
  }
  public getProduct(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "/product");
  }
  public getCategory(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "/category");
  }
}
// category