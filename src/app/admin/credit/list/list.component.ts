import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CreditService } from 'src/app/services/credit/credit.service';
import { Credit } from '../../../models/credit';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjetImmobilier } from '../../../models/projetImmobilier';
import { ProduitImmobilier } from 'src/app/models/produitImmobilier';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { FileUploadeService } from 'src/app/services/file-uploade.service';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  search: string = "";
  limit: any;
  totalUsers = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  credits: Credit[] = [];
  fileInfos?: Observable<any>;

  lookedCredit = new Credit();
  constructor(private auth: AuthenticationService, private fileUpload:FileUploadeService,
    private creditService: CreditService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.lookedCredit.projet = new ProjetImmobilier();
    this.lookedCredit.projet.produit = new ProduitImmobilier();
    this.lookedCredit.emprunteur = new User();
    this.getAllCredits();
  }

  getAllCredits() {
    this.creditService.getAllCredits().subscribe(
      res => {
        this.credits = res;
        
        this.credits.forEach(credit => {
          credit.modeRemboursementNom = 'Mensualité Constante';
        });
      }, error => {
        this.toastr.error(error, "Liste des credits");
      }
    )
  }

  showDetails(idCredit:any) {
    this.creditService.getCredit(idCredit).subscribe(
      res => {
        this.lookedCredit = res;
        this.lookedCredit.fichiers.forEach(file => {
         this.lookedCredit.fileInfos = this.creditService.getFiles(file.name);
        })
        
        this.creditService.findEmprunteur(this.lookedCredit.idCredit).subscribe(
          res => {
            this.lookedCredit.emprunteur = res;

          }, error => {
            
          }
        )
        $("#showCreditDetailModal").click();
      }, error => {
        this.toastr.info(error, "Recherche de crédit");
      }
    )
  }

  accorderCreditImmoBilier(idCredit:any) {
    this.creditService.accordCreditimmo(idCredit).subscribe(
      res => {
        window.location.reload();
        this.ngOnInit();
      }, error => {
        this.toastr.error(error, "Accorder le credit Immobilier");
      }
    )
  }
 
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllCredits();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllCredits();
  }

  getIfCreditInProgree(dateLimit: any) {
    const newdate = new Date(dateLimit);
    let today = new Date();
    if (newdate > today) {
      return true;
    } else {
      return false;
    }
  }
}
