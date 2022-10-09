import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-page-action',
  templateUrl: './page-action.component.html',
  styleUrls: ['./page-action.component.css']
})
export class PageActionComponent implements OnInit {


  @Input() EntityName: String = "";
  @Input() displayLoadBtn: Boolean;
  @Output() emitter = new EventEmitter<any>();

  search: string = "";
    
  constructor() {
    this.ngOnInit();
   }

  ngOnInit(): void {
    $("#loadModal").attr('data-bs-target', "#" + this.EntityName);
    $("#search").on('keyup', function (e) {
      $("#search_btn").click();
    });
  }

  sendSearchValue() {
    this.emitter.emit($("#search").val());
  }

  setModalName() {
    $("#loadModal").attr('data-bs-target', "#" + this.EntityName);
  }

  getPlaceholder() {
    return "Search "+this.EntityName;
  }
}