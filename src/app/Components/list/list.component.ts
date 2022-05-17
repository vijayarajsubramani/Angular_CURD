import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  product: any = [];
  page = 1;
  search = '';
  from_date = '';
  to_date = '';
  field = '';
  order = -1;
  skip = 0;
  limit = 1;
  filter = 'All';
  status = 1;
  overallcount = 0;

  constructor(private _api: ApiService) {
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

  searchtext(e:string){
    this.search=e;
    this.ngOnInit();
  }
  selectFilter(e:string){
    this.filter=e;
  }
  pageChanged(e:any){
    console.log('page',e)
  }
  getallproductList(data: any): void {
    this._api.getallproduct(data).subscribe({
      next: (res: any) => {
        if (res.status === 1) {
          this.product = res.response.result;
          this.overallcount = res.response.overallcount;
          console.log("count", this.overallcount)

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
