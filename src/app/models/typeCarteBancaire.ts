import { InformationComplementaire } from "./informationComplementaire";
import { TarifCarteBancaire } from "./tarifCarteBancaire";

export class TypeCarteBancaire {
    idTypeCarte?:any;
	nom?:any;
	dateCreation?:any;
	dateModification?:any;
	details?:InformationComplementaire[];
	tarif?:TarifCarteBancaire;
}