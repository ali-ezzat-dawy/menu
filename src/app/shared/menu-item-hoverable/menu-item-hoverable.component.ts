import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-menu-item-hoverable',
  templateUrl: './menu-item-hoverable.component.html',
  styleUrls: ['./menu-item-hoverable.component.scss']
})
export class MenuItemHoverableComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() onlyImage: boolean = false;
  constructor(public appService:AppService) { }

  ngOnInit(): void {
  }



  public onCart(){
    if(this.appService.Data.cartList.find(item=>item.id == this.menuItem.id)){
      return true;
    }
    return false;
  }

  public onFavorites(){
    if(this.appService.Data.favorites.find(item=>item.id == this.menuItem.id)){
      return true;
    }
    return false;
  }

}
