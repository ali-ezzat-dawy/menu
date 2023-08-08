import { Component, OnInit } from "@angular/core";
import { Settings, AppSettings } from "src/app/app.settings";
import { AppService } from "src/app/app.service";
import { MenuItem } from "src/app/app.models";
import { ApplicationService } from "src/app/application.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public slides = [];
  public specialMenuItems: Array<MenuItem> = [];
  public pizza: Array<MenuItem> = [];
  public product = [];
  public category = [];
  public bestMenuItems: Array<MenuItem> = [];
  public todayMenu!: MenuItem;

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
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    // this.appService.getPizza('pizza').subscribe((res) => {
    //   this.pizza = res.recipes;
    // });
    this.ApplicationService.getProduct().subscribe((res: any) => {
      this.product = res;
      console.log(this.product);
    });
    this.ApplicationService.getCategory().subscribe((res: any) => {
      this.product = res;
      console.log(this.product);
    });
  }

  public getSlides() {
    this.appService.getHomeCarouselSlides().subscribe((res: any) => {
      this.slides = res;
    });
  }

  public getSpecialMenuItems() {
    this.appService.getSpecialMenuItems().subscribe((menuItems) => {
      this.specialMenuItems = menuItems;
    });
  }

  public getBestMenuItems() {
    this.appService.getBestMenuItems().subscribe((menuItems) => {
      this.bestMenuItems = menuItems;
    });
  }

  public getproducts() {
    this.appService.getMenuItemById(23).subscribe((data) => {
      this.todayMenu = data;
    });
  }
}
