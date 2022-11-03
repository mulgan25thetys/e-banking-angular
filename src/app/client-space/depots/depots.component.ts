import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarteBancaire } from 'src/app/models/carteBancaire';
import { TransfertCarte } from 'src/app/models/transfertCarte';
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

  transfertCarte = new TransfertCarte();
  messageTransfert: String = '';
  msgAlertColor: String = 'alert-info';

  constructor(private moyenPaiementService: MoyenPaiementsService,private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.getAllCardBanks();
    this.messageTransfert = '';
    this.msgAlertColor = 'alert-info';
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

  initializeComponent() {
    this.ngOnInit();
  }

  transfertCardToCard(form: NgForm) {
    this.moyenPaiementService.TransfertCardToCard(this.auth.currentUserValue.id, this.transfertCarte.numCarteDeb,
      this.transfertCarte.numCarteCred, this.transfertCarte.montant).subscribe(
        res => {
          this.messageTransfert = res.message;
          this.msgAlertColor = "alert-success";

          setInterval(function () {
            form.reset();
            window.location.reload();
          }, 1500);
          
        }, error => {
          this.messageTransfert = error;
          this.msgAlertColor = "alert-danger";
      }
    )
  }

}
 