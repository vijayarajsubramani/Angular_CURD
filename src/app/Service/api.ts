import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
  } from '@angular/common/http';

  @Injectable({
    providedIn: 'root',
  })

  export class Apiservice{
      baseurl:string='http://localhost:8000/api';

      constructor(private http:HttpClient){

      }
      createTodo(data:any):Observable<any>{
          let url=`${this.baseurl}/addEditTodo`;
          return this.http.post(url,data).pipe()
      }
      listTodo(){
        let url=`${this.baseurl}/getalltodo`;
        return this.http.get(url).pipe()

      }
      getSingleTodo(id:any){
        let url=`${this.baseurl}/getsingleTodo`;
        return this.http.post(url,id).pipe()

      }
      deletetodo(id:any){
        let url=`${this.baseurl}/deletetodo`;
        return this.http.post(url,id).pipe()


        

      }
  }
  