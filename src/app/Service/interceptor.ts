import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpEvent,HttpResponse,HttpRequest,HttpHandler,HTTP_INTERCEPTORS,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token';


const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class  MyInterceptor  implements HttpInterceptor{
    constructor(private _token:TokenStorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
          setHeaders: {
            'Authorization': `${this._token.getToken()}`,
          },
        });
        return next.handle(req);
      }
    }    
    export const authInterceptorProviders = [
        { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
      ];

