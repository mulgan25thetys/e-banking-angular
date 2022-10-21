import { ContratAssurance } from "./contratAssurance";
import { ReseauPaiement } from "./reseauPaiement";
import { TypeCarteBancaire } from "./typeCarteBancaire";

export class CarteBancaire {
    idCarteB?:any;
	nomBanque = "JMLessous";
    estSoucrite?:any;
	numero?:any;
	echeance?:any;
	dureeContractuelle?:any;
	dateCreation?:any;
	dateModification?:any;
	contratAssurance?:ContratAssurance;
	reseauPaiements?:ReseauPaiement[]; 
	typeCarte?:TypeCarteBancaire; 
}