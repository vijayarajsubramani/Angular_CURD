import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Api_Services} from './api.services';


@Injectable({
  providedIn: 'root',
})

export class ApiService{
  constructor(private _api:Api_Services){
  }
  register(payload:any){
    return this._api.postTypeRequest('/adminregister',{
      username:payload.username,
      email:payload.email,
      password:payload.password,
      confirm_password:payload.confirm_password
    }).pipe(
      map(res=>{
        return res
      })
    )
  }
  login(payload:any){
    return this._api.postTypeRequest('/adminlogin/login',{
      email:payload.username,
      password:payload.password
    }).pipe(
      map((res:any)=>{
        return res
      })
    )
  }

  createproduct(payload:any){
    console.log('payload------>',payload)
    return this._api.postTypeRequest('/addproduct',{
      name:payload.name,
      price:payload.price,
      quantity:payload.quantity,
      description:payload.description,
      image:payload.image
    }).pipe(
      map((res)=>{
        return res
      })
    )
  }

  getallproduct(payload:any){
    console.log('payload------>',payload)
    return this._api.postTypeRequest('/getallproduct',{
      skip:payload.skip,
      limit:payload.limit,
      search:payload.search,
      from_date:payload.from_date,
      to_date:payload.to_date,
      order:payload.order,
      filter:payload.filter,
      status:payload.status,
      field:payload.field
    }).pipe(
      map(res=>{
        return res
      })
    )
  }
}