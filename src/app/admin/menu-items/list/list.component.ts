import {Component,OnInit,ViewChild,PLATFORM_ID,Output,EventEmitter,Input,Inject} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MenuItem } from "src/app/app.models";
import { AppService } from "src/app/app.service";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  public form!: UntypedFormGroup;
  private sub: any;
  public id: any;
  public showImage: boolean = false;
  file: any;
  @Output() onFileChange: EventEmitter<any> = new EventEmitter();
  @Output() onFileUploadClick: EventEmitter<any> = new EventEmitter();
  @Input("fileSize") fileSize = 500;
  @Input("acceptTypes") acceptTypes: any;
  imgFile: any;
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
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.appService.getMenuItems().subscribe((menuItems: MenuItem[]) => {
      this.initDataSource(menuItems);
    });
    
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe((categories) => {
        this.appService.Data.categories = categories;
      });
    }
  }

  public remove(menuItem: MenuItem) {
    const index: number = this.dataSource.data.indexOf(menuItem);
    if (index !== -1) {
      const message = this.appService.getTranslateValue("MESSAGE.SURE_DELETE");
      let dialogRef = this.appService.openConfirmDialog("", message!);
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.dataSource.data.splice(index, 1);
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }
}
