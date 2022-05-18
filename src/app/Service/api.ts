import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Api_Services } from './api.services';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _api: Api_Services) {
  }
  register(payload: any) {
    return this._api.postTypeRequest('/api/adminregister', payload).pipe(map((res => res)))
  }
  login(payload: any) {
    return this._api.postTypeRequest('/api/adminlogin/login', payload).pipe(map((res => res)))
  }

  createproduct(payload: any) {
    return this._api.postTypeRequest('/api/addproduct', payload).pipe(map((res => res)))
  }

  getallproduct(payload: any) {
    return this._api.postTypeRequest('/api/getallproduct', payload).pipe(map((res => res)))
  }

  getSingleProduct(_id: string) {
    return this._api.postTypeRequest('/api/editview', _id).pipe(map((res => res)))
  }
  deleteProduct(_id: string) {
    return this._api.postTypeRequest('/api/deleteproduct', _id).pipe(map((res => res)))
  }
}