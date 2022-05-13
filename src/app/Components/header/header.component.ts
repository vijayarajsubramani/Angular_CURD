import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Service/token';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedin:boolean=false;

  constructor(private _token:TokenStorageService) { }

  ngOnInit(): void {
    if(this._token.getToken()) this.isLoggedin=true;
    else this.isLoggedin=false;
  }



}
