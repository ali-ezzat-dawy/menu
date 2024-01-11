import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MenuItem } from "src/app/app.models";
import { AppService } from "src/app/app.service";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  public form!: UntypedFormGroup;
  // file: any;
  displayedColumns: string[] = [
    "id",
    "image",
    "categoryId",
    "name",
    "price",
    "actions",
  ];
  dataSource!: MatTableDataSource<MenuItem>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    public appService: AppService,
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getMenuItems();
  }
  getAllCategories() {
    this.appService.getCategories().subscribe(
      (categories: any) => {
        this.appService.Data.categories = categories.allCategories;
      },
      (err) => {
        console.log("error", err);
      }
    );
  }
  getData(data: any) {
    let allData = [];
    for (let i = 0; i < data.length; i++) {
      let dataObj = {
        ...data[i],
        image:
          "data:image/jpeg;base64," +
          this._arrayBufferToBase64(data[i].image.data),
      };
      allData.push(dataObj);
    }
    this.initDataSource(allData);
  }
  public _arrayBufferToBase64(buffer: Iterable<number>) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
    // return window.btoa(binary);
  }
  public getMenuItems() {
    this.appService.getMenuItems().subscribe((menuItems: any) => {
      this.initDataSource(menuItems.allProducts);
      this.getData(menuItems.allProducts);
    });
  }
  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public openAddItemDialog(menuItem: any | null) {
    const dialogRef = this.appService.openDialog(
      AddDialogComponent,
      menuItem,
      "theme-dialog"
    );
    dialogRef.afterClosed().subscribe((item) => {
      console.log("Add", item);

      let message = "";
      if (item) {
        this.appService.addItem(item).subscribe(
          (res) => {
            console.log("Res", res);
            this.getMenuItems();
            message = "New Item " + " added successfully!";
            this.snackBar.open(message, "×", {
              panelClass: "success",
              verticalPosition: "top",
              duration: 3000,
            });
          },
          (error) => {
            console.log(error);
          }
        );
        this.paginator.lastPage();
        message = "New Item " + " added successfully!";
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 3000,
        });
      }
    });
  }
  public openEditItemDialog(menuItem: any | null) {
    console.log(menuItem);

    const dialogRef = this.appService.openDialog(
      AddDialogComponent,
      menuItem,
      "theme-dialog"
    );
    dialogRef.afterClosed().subscribe((item) => {
      let message = "";
      if (item) {
        if (item.product_name) {
          this.appService.editItemWithoutFile(menuItem.id, item).subscribe(
            (res) => {
              console.log(res);
              this.getMenuItems();
              message = "Edit Item " + menuItem.name + " Edited successfully!";
              this.snackBar.open(message, "×", {
                panelClass: "success",
                verticalPosition: "top",
                duration: 3000,
              });
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log("Edit item with File", item);
          this.appService.editItem(menuItem.id, item).subscribe(
            (res) => {
              console.log(res);
              this.getMenuItems();
              message = "Edit Item " + menuItem.name + " Edited successfully!";
              this.snackBar.open(message, "×", {
                panelClass: "success",
                verticalPosition: "top",
                duration: 3000,
              });
            },
            (error) => {
              console.log(error);
            }
          );
        }
        this.paginator.lastPage();

        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 3000,
        });
      }
    });
  }
  public remove(menuItem: any) {
    const index: number = this.dataSource.data.indexOf(menuItem);
    if (index !== -1) {
      const message = this.appService.getTranslateValue("MESSAGE.SURE_DELETE");
      let dialogRef = this.appService.openConfirmDialog("", message!);
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.appService.removeItem(menuItem.id).subscribe(
            (res) => {
              console.log(res);
              this.getMenuItems();
            },
            (err) => {
              console.log(err);
            }
          );
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }
}
