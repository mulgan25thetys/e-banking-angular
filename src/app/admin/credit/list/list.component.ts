import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CreditService } from 'src/app/services/credit/credit.service';
import { Credit } from '../../../models/credit';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  search: string = "";
  limit: any;
  totalUsers = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  credits: Credit[] = [];
  constructor(private auth: AuthenticationService,
    private creditService: CreditService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllCredits();
  }

  getAllCredits() {
    this.creditService.getAllCredits().subscribe(
      res => {
        this.credits = res.reverse();
        this.credits.forEach(credit => {
          credit.modeRemboursementNom = '';
          let tab = credit.modeRemboursement.split("_");
          
          for (let i = 0; i < tab.length; i++) {
            const mode = tab[i];
            credit.modeRemboursementNom += mode + " ";
          }
        });
      }, error => {
        this.toastr.error(error, "Liste des credits");
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllCredits();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllCredits();
  }

  getIfCreditInProgree(dateLimit: any) {
    const newdate = new Date(dateLimit);
    let today = new Date();
    if (newdate > today) {
      return true;
    } else {
      return false;
    }
  }
}
