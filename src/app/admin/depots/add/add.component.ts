import { ToastrService } from 'ngx-toastr';
import { DeviseService } from './../../../services/devise/devise.service';
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CarteBancaire } from '../../../models/carteBancaire';
import { ContratAssurance } from 'src/app/models/contratAssurance';
import { TypeCarteBancaire } from '../../../models/typeCarteBancaire';
import { TarifCarteBancaire } from 'src/app/models/tarifCarteBancaire';
import { Devises } from 'src/app/models/devises';
import { ReseauPaiement } from 'src/app/models/reseauPaiement';
import { ReseauspaiementService } from '../../../services/reseauxpaiement/reseauspaiement.service';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  devises: Devises[] = [];
  reseauxPay: ReseauPaiement[] = [];

  isAddedContratAssurance: Boolean = false;

  carteBanq = new CarteBancaire();

  constructor(private moyenPayServe: MoyenPaiementsService, private reseauPayService: ReseauspaiementService
  ,private deviseServe:DeviseService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.carteBanq.contratAssurance = new ContratAssurance();
    this.carteBanq.reseauPaiements = [];
    this.carteBanq.typeCarte = new TypeCarteBancaire();
    this.carteBanq.typeCarte.details = [];
    this.carteBanq.typeCarte.tarif = new TarifCarteBancaire();
    this.carteBanq.typeCarte.tarif.devise = new Devises();

    this.getDevises();
    this.getReseauxPay();
  }

  getDevises() {
    this.moyenPayServe.getDevises().subscribe(
      res => {
        this.devises = res;
      }
    )
  }

  getReseauxPay() {
    this.moyenPayServe.getReseauxPay().subscribe(
      res => {
        this.reseauxPay = res;
      }
    )
  }

  addTypeCarteDetail(){
    
    this.carteBanq.typeCarte.details.push(
      {idInformation:'',description :'',dateCreation :'',dateModification :''}
      );
  }
  removeTypeCarteDetail(i){
    this.carteBanq.typeCarte.details.splice(i,1);
    
  }

  addCarte(form:NgForm) {
    let firstSuccess = false;
    let secondSuccess = false;

    let reseauPay = (<HTMLSelectElement>document.getElementById('reseauPay')).value;
    let modePaiement = (<HTMLSelectElement>document.getElementById('modePaiement')).value;
    let typePlatfond = (<HTMLSelectElement>document.getElementById('typePlatfond')).value;
    let devise = (<HTMLSelectElement>document.getElementById('devise')).value;

    firstSuccess = this.checkReseauPay(reseauPay) == true && this.checkModePaiement(modePaiement) == true
      && this.checktypePlatfond(typePlatfond) == true && this.checkDevise(devise) == true ? true : false;
    
    if (this.isAddedContratAssurance) {
      let natureAssu = (<HTMLSelectElement>document.getElementById('natureAssu')).value;
      let categorieAssu = (<HTMLSelectElement>document.getElementById('categorieAssu')).value;
      let dureeAssu = (<HTMLSelectElement>document.getElementById('dureeAssu')).value;
      let typeAssu = (<HTMLSelectElement>document.getElementById('typeAssu')).value;
  
      secondSuccess = this.checknatureAssu(natureAssu) == true && this.checkcategorieAssu(categorieAssu) == true
        && this.checkdureeAssu(dureeAssu) == true && this.checktypeAssu(typeAssu) == true ? true : false;
      if (secondSuccess == true && firstSuccess == true) {
          this.addCard(form);
        } else {
          this.toastr.warning("Veuillez verifier les données!");
        }
    } else {
      if (firstSuccess == true) {
        this.addCard(form);
      } else {
        this.toastr.warning("Veuillez verifier les données!");
      }
    }
 
  }

  addCard(form: any) {
    this.moyenPayServe.addCardsBank(this.carteBanq).subscribe(
            res => {
              this.emitter.emit("ajoute");
              
              $("#closeModal").click();
              form.reset();
              this.ngOnInit();
            }, error => {
              this.toastr.error("Une erreur s'est produite", "Ajout de carte bancaire");
            }
          )
  }

  afficherFormulaireContrat() {
    this.isAddedContratAssurance = true;
  }

  enleverFormulaireContrat() {
    this.isAddedContratAssurance = false;
    this.carteBanq.contratAssurance = new ContratAssurance();
  }

  checkReseauPay(reseauPay:any) {
    if (reseauPay == "default") { 
      this.toastr.info("Choisir le reseau de paiement");
      return false;
    
    } else {
      this.reseauPayService.find(reseauPay).subscribe(
        res => {
          if (this.carteBanq.reseauPaiements.length == 0) {
            this.carteBanq.reseauPaiements.push(res);
          }
        }
      )
      return true;
    }
  }
  checkDevise(devise:any) {
    if (devise == "default") { 
      
      this.toastr.info("Choisir la devise utilisée");
      return false;
    } else {
      this.deviseServe.find(devise).subscribe(
        res => {
          console.log(res);
          
          this.carteBanq.typeCarte.tarif.devise = res;
        }
      )
      return true;
    }
  }

  checkModePaiement(mode:any) {
    if (mode == "default") { 
      
      this.toastr.info("Choisir le mode de paiement");
      return false;
    } else {
      this.carteBanq.typeCarte.tarif.modePaiement = mode;
      return true;
    }
  }

  checktypePlatfond(typePlatfond:any) {
    if (typePlatfond == "default") { 
      
      this.toastr.info("Choisir le type de platfond");
      return false;
    } else {
      this.carteBanq.typeCarte.tarif.typePlatfond = typePlatfond;
      return true;
    }
  }

  checknatureAssu(natureAssu:any) {
    if (natureAssu == "default") { 
      
      this.toastr.info("Indiquer la nature du contrat");
      return false;
    } else {
      this.carteBanq.contratAssurance.nature = natureAssu;
      return true;
    }
  }
  checkcategorieAssu(categorieAssu:any) {
    if (categorieAssu == "default") { 
      
      this.toastr.info("Indiquer la categorie du contrat");
      return false;
    } else {
      this.carteBanq.contratAssurance.categorie = categorieAssu;
      return true;
    }
  }
  checkdureeAssu(dureeAssu:any) {
    if (dureeAssu == "default") { 
      
      this.toastr.info("Indiquer la durée du contrat");
      return false;
    } else {
      this.carteBanq.contratAssurance.duree = dureeAssu;
      return true;
    }
  }
  checktypeAssu(typeAssu:any) {
    if (typeAssu == "default") { 
      
      this.toastr.info("Indiquer le type du contrat");
      return false;
    } else {
      this.carteBanq.contratAssurance.type = typeAssu;
      return true;
    }
  }

}
