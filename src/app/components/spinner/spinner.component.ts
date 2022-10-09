import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#cover-spin').show(0);
  }

}
