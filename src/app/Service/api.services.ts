import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class Api_Services {
    public baseurl = 'http://localhost:8000';

    constructor(private _http: HttpClient) { }

    getTypeRequest(url: string) {
        return this._http.get(`${this.baseurl}${url}`).pipe(map((res => res)))
    }
    postTypeRequest(url: string, payload: any) {
        return this._http.post(`${this.baseurl}${url}`, payload).pipe(map((res) => res))
    }
}