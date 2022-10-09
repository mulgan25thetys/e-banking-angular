import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() items: any;
  @Output() itemsOuput = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
