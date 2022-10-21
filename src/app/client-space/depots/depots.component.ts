import { Component, OnInit } from '@angular/core';
import { CarteBancaire } from 'src/app/models/carteBancaire';
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';
import { AuthenticationService } from '../../services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-depots',
  templateUrl: './depots.component.html',
  styleUrls: ['./depots.component.css']
})
export class DepotsComponent implements OnInit {

  cardBanks: CarteBancaire[] = [];
  
  cardBank = new CarteBancaire();
  constructor(private moyenPaiementService: MoyenPaiementsService,private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.getAllCardBanks();
  }

  getAllCardBanks() {
    this.moyenPaiementService.getcardsByUser(this.auth.currentUserValue.id).subscribe(
      res => {
        this.cardBanks = res;
      },
      error => {
        // this.toastr.error(error, "Listes des cartes bancaires");
      }
    )
  }

}
 