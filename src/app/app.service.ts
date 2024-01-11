import { menuItems } from "./admin/components/menu/menu";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem, Order, Category } from "src/app/app.models";
import { AppSettings } from "src/app/app.settings";
import { environment } from "src/environments/environment";
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
    public orderList: Order[],
    public favorites: MenuItem[],
    public totalPrice: number,
    public totalCartCount: number
  ) {}
}

@Injectable({
  providedIn: "root",
})
export class AppService {
  convertImgToBase64(medium: string, arg1: (dataUrl: string) => void) {
    throw new Error("Method not implemented.");
  }
  public Data = new Data(
    [], // categories
    [], // cartList
    [], // orderList
    [], // favorites
    0, // totalPrice
    0 //totalCartCount
  );

  public url = "https://backend.menu-list.online";

  constructor(
    public http: HttpClient,
    private datePipe: DatePipe,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public translateService: TranslateService
  ) {}

  public getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "/product");
  }
  public getMenuItemsForUser(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "/product/cat-items");
  }
  public getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(this.url + "menu-item-" + id + ".json");
  }

  public getSpecialMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "special-menu-items.json");
  }

  public getBestMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + "best-menu-items.json");
  }

  public getCategories(): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.get<Category[]>(this.url + "/category", {
      headers: headers,
    });
  }
  addCatogery(obj: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.post(`${this.url}/category/add-category`, obj, {
      headers: headers,
    });
  }
  addItem(obj: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.post(`${this.url}/product/add-product`, obj, {
      headers: headers,
    });
  }
  editItem(id: any, obj: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.patch(`${this.url}/product/edit-product/${id}`, obj, {
      headers: headers,
    });
  }
  editItemWithoutFile(id: any, obj: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.patch(`${this.url}/product/edit-product-main-info/${id}`, obj, {
      headers: headers,
    });
  }
  removeItem(id: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.delete(`${this.url}/product/delete-product/${id}`, {
      headers,
    });
  }
  removeCatogery(id: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.delete(`${this.url}/category/delete-category/${id}`, {
      headers,
    });
  }
  editCatogery(id: any, obj: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this.http.patch(`${this.url}/category/edit-category/${id}`, obj, {
      headers,
    });
  }

  public getHomeCarouselSlides() {
    return this.http.get<any[]>("assets/data/slides.json");
  }

  public getGUID() {
    let guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      .replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .toLowerCase();
    return guid;
  }

  public openDialog(component: any, data: any, panelClass: any) {
    return this.dialog.open(component, {
      data: data,
      panelClass: panelClass,
      autoFocus: false,
      direction: this.appSettings.settings.rtl ? "rtl" : "ltr",
    });
  }

  public openConfirmDialog(title: string, message: string) {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });
    return dialogRef;
  }

  public openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: message,
    });
    return dialogRef;
  }

  public getTranslateValue(key: string, param: string = "") {
    let value = null;
    this.translateService
      .get(key, { param: param })
      .subscribe((res: string) => {
        value = res;
      });
    return value;
  }

  public addToCart(menuItem: MenuItem, component: any) {
    if (!this.Data.cartList.find((item) => item.id == menuItem.id)) {
      menuItem.cartCount = menuItem.cartCount ? menuItem.cartCount : 1;
      this.Data.cartList.push(menuItem);
      this.calculateCartTotal();
      if (component) {
        this.openCart(component);
      } else {
        this.snackBar.open(
          'The menu item "' + menuItem.name + '" has been added to cart.',
          "×",
          {
            verticalPosition: "top",
            duration: 3000,
            direction: this.appSettings.settings.rtl ? "rtl" : "ltr",
            panelClass: ["success"],
          }
        );
      }
    }
  }

  public openCart(component: any) {
    this.bottomSheet
      .open(component, {
        direction: this.appSettings.settings.rtl ? "rtl" : "ltr",
      })
      .afterDismissed()
      .subscribe((isRedirect) => {
        if (isRedirect) {
          window.scrollTo(0, 0);
        }
      });
  }

  public calculateCartTotal() {
    this.Data.totalPrice = 0;
    this.Data.totalCartCount = 0;
    this.Data.cartList.forEach((item) => {
      let price = 0;
      if (item) {
        price = item.price;
      } else {
        price = item.price;
      }
      this.Data.totalPrice = this.Data.totalPrice + price * item.cartCount;
      this.Data.totalCartCount = this.Data.totalCartCount + item.cartCount;
    });
  }
  public filterData(
    data: any,
    category_name: string,
    sort?: string,
    page?: number,
    perPage?: number
  ) {
    if (category_name) {
      data = data.filter((item: any) => item.category_name == category_name);
    }

    this.sortData(sort, data);
    return this.paginator(data, page, perPage);
  }

  public sortData(sort?: string, data?: any) {
    if (sort) {
      switch (sort) {
        case "Popular":
          data = data.sort((a: any, b: any) => {
            if (
              a.ratingsValue / a.ratingsCount <
              b.ratingsValue / b.ratingsCount
            ) {
              return 1;
            }
            if (
              a.ratingsValue / a.ratingsCount >
              b.ratingsValue / b.ratingsCount
            ) {
              return -1;
            }
            return 0;
          });
          break;
        case "Price (Low to High)":
          data = data.sort((a: any, b: any) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
          break;
        case "Price (High to Low)":
          data = data.sort((a: any, b: any) => {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          });
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items: any, page?: any, perPage?: any) {
    var page = page || 1,
      perPage = perPage || 4,
      offset = (page - 1) * perPage,
      paginatedItems = items.slice(offset).slice(0, perPage),
      totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination: {
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: totalPages > page ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      },
    };
  }

  // public getYears() {
  //   const startYear = new Date().getFullYear();
  //   let years = Array();
  //   for (let i = 0; i <= 10; i++) {
  //     years.push(startYear + i);
  //   }
  //   return years;
  // }

  public shuffleArray(array: any) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
