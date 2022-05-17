import { Component, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() overallcount:any;
  @Input() limit:any;
  @Input() page:any;
  @Input() pageChanged:any;


  
  constructor() { 

  }

  ngOnInit(): void {
  }

}

