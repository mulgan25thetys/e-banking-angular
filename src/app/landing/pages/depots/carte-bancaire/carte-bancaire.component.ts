import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarteBancaire } from 'src/app/models/carteBancaire';
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';
import { AuthenticationService } from '../../../../services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-carte-bancaire',
  templateUrl: './carte-bancaire.component.html',
  styleUrls: ['./carte-bancaire.component.css']
})
export class CarteBancaireComponent implements OnInit {

  confirmation: Boolean = false;
  cardBanks: CarteBancaire[] = [];
  
  cardBank = new CarteBancaire();
  constructor(private moyenPaiementService: MoyenPaiementsService,
    private toastr: ToastrService,private auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.getAllCardBanks();
  }

  getAllCardBanks() {
    this.moyenPaiementService.findAllCardsB().subscribe(
      res => {
        this.cardBanks = res;
      },
      error => {
        this.toastr.error(error, "Listes des cartes bancaires");
      }
    )
  }

  souscrire(idCarte: any) {
    this.moyenPaiementService.getcards(idCarte).subscribe(
      res => {
        this.confirmation = true;
        this.cardBank = res;
        $("#showCardDetailBtn").click();
      }
    )
    
  }

  confirmerSubScription(idCarte: any) {
  
    
    if (this.auth.currentUserValue ==null || this.auth.currentUserValue.roles[0] != "ROLE_CLIENT") {
      alert("Veuillez vous abonner pour continuer!");
       $("#closeModal").click();
      this.router.navigateByUrl('/auth/se-connecter');
    } else {
      this.moyenPaiementService.souscrireCardsB(idCarte, this.auth.currentUserValue.id).subscribe(
      res => {
        this.ngOnInit();
        $("#closeModal").click();
      }
      )
    }
    
  }
}