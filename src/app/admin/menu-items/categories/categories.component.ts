import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Category } from "src/app/app.models";
import { AppService } from "src/app/app.service";
import { CategoryDialogComponent } from "./category-dialog/category-dialog.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "edit", "remove"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public appService: AppService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.appService.getCategories().subscribe((categories: any) => {
      console.log(categories.allCategories);
      this.initDataSource(categories.allCategories);
    });
  }
  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(category: any) {
    const index: number = this.dataSource.data.indexOf(category);
    if (index !== -1) {
      const message = this.appService.getTranslateValue("MESSAGE.SURE_DELETE");
      let dialogRef = this.appService.openConfirmDialog("", message!);
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.appService
            .removeCatogery(category.id)
            .subscribe((res) => this.getAllCategories());
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }

  public openCategoryDialog(category: any | null) {
    const dialogRef = this.appService.openDialog(
      CategoryDialogComponent,
      category,
      "theme-dialog"
    );
    dialogRef.afterClosed().subscribe((cat) => {
      let message = "";
      if (cat) {
        let catObj = {
          category_name: cat.category_name,
        };
        this.appService.addCatogery(catObj).subscribe(
          () => {
            this.getAllCategories();
          },

          (error) => {
            console.log(error);
          }
        );
        this.paginator.lastPage();
        message = "New category " + cat.category_name + " added successfully!";
        // }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 3000,
        });
      }
    });
  }
  public openCategoryDialogForEdit(category: any | null) {
    const dialogRef = this.appService.openDialog(
      CategoryDialogComponent,
      category,
      "theme-dialog"
    );
    dialogRef.afterClosed().subscribe((cat) => {
      let message = "";
      if (cat) {
        let catObj = {
          category_name: cat.category_name,
        };
        this.appService.editCatogery(category.id, catObj).subscribe(
          () => {
            this.getAllCategories();
          },
          (error) => {
            console.log(error);
          }
        );
        this.paginator.lastPage();
        message = "New category " + cat.category_name + " added successfully!";
        // }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 3000,
        });
      }
    });
  }
}
