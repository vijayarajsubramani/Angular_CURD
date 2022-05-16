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
  limit = 5;
  filter = 'All';
  status = 1;

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

  getallproductList(data:any): void {
    this._api.getallproduct(data).subscribe({
      next: (res: any) => {
        if(res.status===1){
          this.product=res.response.result
        }else{
          alert("Some error")
        }
      }
    })

  }
}
