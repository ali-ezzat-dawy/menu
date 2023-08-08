import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private _HttpClient: HttpClient) {}
  url = environment.url;
  addCatogery(obj: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token)
    };
    return this._HttpClient.post(`${this.url}/category/add-category`, obj, {
      headers: headers
    });
  }
  removeCatogery(id: any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token)
    };
    return this._HttpClient.delete(
      `${this.url}/category/delete-category/${id}`,
      {
        headers
      }
    );
  }
  editCatogery(id: any , obj:any): Observable<any> {
    let token = localStorage.getItem("userToken");
    let headers = {
      "x-access-token": JSON.parse(token),
    };
    return this._HttpClient.patch(
      `${this.url}/category/edit-category/${id}`,
      {
        headers
      }
    );
  }
}
