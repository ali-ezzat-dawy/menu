import { Component, OnInit, ViewChild } from "@angular/core";
import { Settings, AppSettings } from "src/app/app.settings";
import { AppService } from "src/app/app.service";
import { MenuItem } from "src/app/app.models";
import { ApplicationService } from "src/app/application.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public slides = [];
  public specialMenuItems: Array<MenuItem> = [];
  public pizza: Array<MenuItem> = [];
  public product: any = [];
  public category = [];
  public bestMenuItems: Array<MenuItem> = [];
  public todayMenu!: MenuItem;

  dataSource!: MatTableDataSource<MenuItem>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public appService: AppService,
    public ApplicationService: ApplicationService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getSlides();
    this.getMenuItems();
  }

  public getSlides() {
    this.appService.getHomeCarouselSlides().subscribe((res: any) => {
      this.slides = res;
    });
  }

  public _arrayBufferToBase64(buffer:any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}

  public getMenuItems() {
    this.appService.getMenuItemsForUser().subscribe((menuItems: any) => {
      let res = menuItems.allProducts
      console.log('mark',res)
      for ( var i = 0; i< res.length; i++){
        let item:any = {
          category_id:res[i].category_id ,
          category_name:res[i].category_name ,
          products: res[i].products.map((prod:any) =>{
            console.log("image", this._arrayBufferToBase64(prod.image.data))
            return {
              ...prod ,
              image:"data:image/jpeg;base64," + this._arrayBufferToBase64(prod.image.data)
            }
          })
        }
        this.product.push(item)
      }
      console.log("menuItems", menuItems.allProducts);
      console.log("product", this.product);
    });
  }
  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
