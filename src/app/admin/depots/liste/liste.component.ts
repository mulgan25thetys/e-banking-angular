import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarteBancaire } from 'src/app/models/carteBancaire';
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  search: string = '';
  cardBanks: CarteBancaire[] = [];
  constructor(private moyenPaiementService:MoyenPaiementsService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllCardBanks();
  } 

  getAllCardBanks() {
    this.moyenPaiementService.findAll().subscribe(
      res => {
        this.cardBanks = res.reverse();
      },
      error => {
        this.toastr.error(error, "Listes des cartes bancaires");
      }
    )
  }

  deleteCard(idcard: any) {
    alert("fdgh")
    this.moyenPaiementService.delete(idcard).subscribe(
      () => {
        this.ngOnInit();
      }, error => {
        this.toastr.info(error, "Suppression d'une carte bancaire!");
      }
    )
  }

  getReseauPaymentImage(nomReseau:String) {
    return './assets/images/payment/' + nomReseau + '.png';
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllCardBanks();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllCardBanks();
  }

  getEmitter(event: any) {
    if (event == "ajoute") {
      this.ngOnInit();
    }
  }
}
