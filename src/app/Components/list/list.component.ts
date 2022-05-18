import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Api_Services } from 'src/app/Service/api.services';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  product: any = [];
  page = 1;
  search :any;
  from_date = '';
  to_date = '';
  field = '';
  order = -1;
  skip = 0;
  limit = 10;
  filter = 'All';
  status = 1;
  overallcount = 1;
  maxSize=5;
  base_url=this.baseurl.baseurl
 

  constructor(private _api: ApiService,public baseurl:Api_Services) {
  }

  ngOnInit(): void {
    const data = {
      search: this.search,
      from_date: this.from_date,
      to_date: this.to_date,
      field: this.field,
      order: this.order,
      skip: this.skip,
      limit: this.limit,
      filter: this.filter,
      status: this.status
    }
    this.getallproductList(data);
  };

  searchtext(e:any){
    this.search=e;
    this.ngOnInit();
  }
  selectFilter(e:string){
    this.filter=e;
  }
  setPage(pageNo: PageChangedEvent): void {
    this.skip= pageNo.page*this.limit-this.limit;
    this.ngOnInit();
  }
  handeleFrom_date(e:string){
    this.from_date=e
  }
  handeleTo_date(e:string){
    this.to_date=e;
    this.ngOnInit();
  }
  pagelimit(pageNo:number):void{
    this.limit=pageNo;
    this.ngOnInit();
  }
  getallproductList(data: any): void {
    this._api.getallproduct(data).subscribe({
      next: (res: any) => {
        if (res.status === 1) {
          this.product = res.response.result;
          this.overallcount = res.response.overallcount;
        } else {
          alert("Some error")
        }
      }
    })

  }
  deleteProduct(data: any) {
    if (window.confirm('Are you Sure Delete?'))
      this._api.deleteProduct(data).subscribe({
        next: (res: any) => {
          if (res.status === 1) {
            console.log('delete the product succesfully')
            this.ngOnInit();
          }
        },
        error: (err) => {
          alert("Some error")
        }
      })
  }
}
