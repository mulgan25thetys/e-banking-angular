import { DomaineAvancement } from './domaineAvancement';
import { ProduitImmobilier } from './produitImmobilier';
export class ProjetImmobilier{
    idProjet?:any;
	motif?:any;
	description?:any;
	status?:any;
	dateDebut?:any;
	dateFin?:any;
	dateAjout?:any;
	dateModification?:any;
	avancements?:DomaineAvancement[];
	produit?:ProduitImmobilier;
}