import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
//public msg='msgg'
public arr=[
  {
    title:'title1',
    name:'name1',
    date:'2018.1'
  },
  {
    title:'title2',
    name:'name2',
    date:'2018.2'
  },
  {
    title:'title3',
    name:'name1',
    date:'2018.1'
  }
]
  constructor() { }

  ngOnInit() {
  }

}
