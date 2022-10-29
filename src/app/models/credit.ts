import { PaiementCredit } from "./paiementCredit";
import { ProjetImmobilier } from "./projetImmobilier";
import { User } from "./user";

export class Credit{
    idCredit?:any;
	categorie?:any;
    montantDemande?:any;
	montantMensuel?:any;
	apportPersonnel?: any;
	 salaireNetPersonnel?:any;
	 primeAnnuelle?:any;
	 autresRevenus?:any;
	montantTransaction?:any;
	duree?:any;
	echeance?:any;
	rembourse?:any;
	dateAjout?:any;
	typeSimulation?:any;
	modeRemboursementNom?:any;
	description?:any;
	dateModification?:any;
	status?:any;
	color?:any;
	emprunteur?:User;
	paiements?:PaiementCredit[];
	projet?:ProjetImmobilier;
}