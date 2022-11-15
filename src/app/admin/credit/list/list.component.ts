import { ToastrService } from 'ngx-toastr';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { CreditService } from 'src/app/services/credit/credit.service';
import { Credit } from '../../../models/credit';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjetImmobilier } from '../../../models/projetImmobilier';
import { ProduitImmobilier } from 'src/app/models/produitImmobilier';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { FileUploadeService } from 'src/app/services/file-uploade.service';
import { ChartOptions } from '../../../landing/pages/reception/credit/credit.component';
declare var $: any;

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  loader: Boolean = false;
  search: string = "";
  limit: any;
  totalUsers = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  dateD: String = '';
  dateF: String = '';

  credits: Credit[] = [];
  fileInfos?: Observable<any>;

  showStatistic: Boolean = false;
  lookedCredit = new Credit();

  minDate: NgbDate = new NgbDate(1789, 7, 14); 

  modelDateDeb: NgbDateStruct;
  modelDateFin: NgbDateStruct;
  placement = 'bottom';

  constructor(private auth: AuthenticationService, private fileUpload:FileUploadeService,
    private creditService: CreditService,private toastr:ToastrService) { }
 
  ngOnInit(): void {
    this.lookedCredit.projet = new ProjetImmobilier();
    this.lookedCredit.projet.produit = new ProduitImmobilier();
    this.lookedCredit.emprunteur = new User();
    this.getAllCredits();

    let currentTime = new Date();
    let year = currentTime.getFullYear();
    this.dateD = year + '-01-01';
    this.dateF = year + '-12-31';
    //this.getStats(this.dateD, this.dateF);
  }

  getAllCredits() {
    this.creditService.getAllCredits().subscribe(
      res => {
        this.credits = res.reverse();
        
        this.credits.forEach(credit => {
          credit.modeRemboursementNom = 'Mensualité Constante';
        });
        
      }, error => {
        this.toastr.error(error, "Liste des credits");
      }
    )
  }

  visualiserStats() {
    this.dateD = this.modelDateDeb.year + '-' + this.modelDateDeb.month + "-" + this.modelDateDeb.day;
    this.dateF = this.modelDateFin.year + '-' + this.modelDateFin.month + "-" + this.modelDateFin.day;
    this.getStats(this.dateD, this.dateF);
  }

  getStats(dateD:String,dateF:String) {
    this.creditService.getStatsDate(dateD, dateF).subscribe(
      res => {
        this.credits = res;
        let yaxisDatas: any[] = [];
        
        for (let i = 0; i < this.credits.length; i++) {
          const credit = this.credits[i];
          yaxisDatas.push(credit.dateAjout);
        }
        
        this.creditService.getStatsNombre(dateD, dateF).subscribe(
          res => {
            let xaxisDatas: any[] = [];
            for (let i = 0; i < res.length; i++) {
              const nombre = res[i];
              xaxisDatas.push(nombre);
            }
            this.showStatistic = true;
            this.generateStatistic(xaxisDatas, yaxisDatas);
          }, error => {
            this.toastr.error(error, "Statistiques des crédits");
          }
        )
      }, error => {
        this.toastr.error(error, "Statistiques des crédits");
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

  accorderCreditImmoBilier(idCredit: any) {
    this.loader = true;
    $("#btn-accorder-cred").prop('disabled', true);
    this.creditService.accordCreditimmo(idCredit).subscribe(
      res => {
        this.loader = false;
        $("#btn-accorder-cred").prop('disabled', false);
        window.location.reload();
        this.ngOnInit();
      }, error => {
        this.loader = false;
        $("#btn-accorder-cred").prop('disabled', false);
        this.toastr.error(error.message, "Accorder le credit Immobilier");
      }
    )
  }  

  refuserOuSupprimerCredit(idCredit: any) {
    this.creditService.deleteCredit(idCredit).subscribe(
      res => {
        window.location.reload();
        this.ngOnInit();
      }, error => {
        
        this.toastr.error(error, "Annuler le credit Immobilier");
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

  onDateDebutSelect(event:any) {
    this.dateD = event.year + '-' + event.month + "-" + event.day;
    this.minDate.year = event.year;
    this.minDate.month = event.month;
    this.minDate.day = event.day;
    this.getStats(this.dateD, this.dateF);
  }

  onDateFinSelect(event:any) {
    this.dateF = event.year + '-' + event.month + "-" + event.day;
    this.getStats(this.dateD, this.dateF);
  }

    generateStatistic(xaxisDatas: any[], yaxisDatas: any[]) {
    this.chartOptions = {
      series: [
        {
          name: "Nombre de Crédits",
          data: xaxisDatas
        }
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: yaxisDatas
      },
      tooltip: {
        x: {
          format: "yy-MM-dd"
        }
      }
    };
  }
}
