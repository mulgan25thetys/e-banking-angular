import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/models/credit';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreditService } from 'src/app/services/credit/credit.service';
import { PaiementCredit } from '../../models/paiementCredit';
declare var $: any;

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  errorMsg: String = "";

  search: string = "";
  limit: any;
  totalUsers = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  credit = new Credit(); 
  paiement = new PaiementCredit();

  constructor(private auth: AuthenticationService,
    private creditService: CreditService) { }

  ngOnInit(): void {
    this.getMyCredit();
  }

  getMyCredit() {
    this.creditService.getCreditByUser(this.auth.currentUserValue.id).subscribe(
      res => {
        this.credit = res;
        this.credit.modeRemboursementNom = '';
        
        let tab = this.credit.modeRemboursement.split("_");
        
        for (let i = 0; i < tab.length; i++) {
          const mode = tab[i];
          this.credit.modeRemboursementNom += mode + " ";
        }

        this.creditService.getMensualityByUser(this.auth.currentUserValue.id).subscribe(
          res => {
            this.paiement = res;
            
          }, error => {
            this.errorMsg = error;
          }
        )
      }, error => {
        alert(error);
      }
    )
  }

  procederAuVersement() {
    let cardNumber = prompt("Votre numéro de carte bancaire si vous plait!", "xxxx-xxxx-xxxx-xxxx");
    if (cardNumber != "xxxx-xxxx-xxxx-xxxx") {
      this.creditService.rembourserCrdit(this.auth.currentUserValue.id, cardNumber, this.credit.idCredit, this.paiement.idPaiement).subscribe(
        res => {
          
          $("#closeModal").click();
          this.paiement = new PaiementCredit();
          alert(res.message);
          window.location.reload();
        }, error => {
          alert(error);
          
        }
      )
    } else {
      alert("Veuillez indiquer le numéro de votre carte bancaire!");
      this.procederAuVersement();
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMyCredit();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMyCredit();
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
