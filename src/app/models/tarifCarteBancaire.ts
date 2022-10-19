import { Devises } from "./devises";

export class TarifCarteBancaire {
    idTarif?:any;
	cotationAnnuelle?:any;
	modePaiement?:any;
	prixCarte?:any;
	prixRenouvellement?:any;
	seuilPaiementMensuel?:any;
	typePlatfond?:any;
	platfondRetrait?:any;
	provision?:any;
	dateCreation?:any;
	dateModification?:any;
	devise?:Devises;
}