import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  @Input() pretitle: String="";
  @Input() title: String="";
  @Input() textmuted: String ="";
  constructor() { }

  ngOnInit(): void {
  }

}
