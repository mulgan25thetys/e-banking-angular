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

  cardBanks: CarteBancaire[] = [];
  constructor(private moyenPaiementService:MoyenPaiementsService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllCardBanks();
  }

  getAllCardBanks() {
    this.moyenPaiementService.findAll().subscribe(
      res => {
        this.cardBanks = res;
      },
      error => {
        this.toastr.error(error, "Listes des cartes bancaires");
      }
    )
  }
}
