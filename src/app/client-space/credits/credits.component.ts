import { Component, OnInit ,ViewChild} from '@angular/core';
import { Credit } from 'src/app/models/credit';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreditService } from 'src/app/services/credit/credit.service';
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';
import { PaiementCredit } from '../../models/paiementCredit';
declare var $: any;
import swal from 'sweetalert2';
import { Router } from '@angular/router';
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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

const getSymbolFromCurrency = require('currency-symbol-map');

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  errorMsg: String = "";
  showStatistic: Boolean = false;

  search: string = "";
  limit: any;
  totalUsers = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  credit = new Credit(); 
  isThereACredit: Boolean = false;
  paiement = new PaiementCredit(); 

  numCarteCredit: any[] =[];

  constructor(private auth: AuthenticationService,private router:Router,
    private creditService: CreditService,private moyenPaiementService: MoyenPaiementsService) { }

  ngOnInit(): void {
    if (this.auth.currentUserValue) {
      this.getMyCredit();
    }
    
  }
  
  getMyCredit() {
  
    if (this.auth.currentUserValue) {
       this.creditService.getCreditByUser(this.auth.currentUserValue.id).subscribe(
      res => {
        
        if (res != null) {
          this.isThereACredit = true;
          this.credit = res;
          this.credit.modeRemboursementNom = 'Mensualité Constante';
        
          this.creditService.getMensualityByUser(this.auth.currentUserValue.id).subscribe(
            res => { 
              this.paiement = res;
              this.creditService.getAllPaiementsByCredit(this.credit.idCredit).subscribe(
                res => {
                  this.showStatistic = true;
                  let xaxisDatas : any[] = [];
                  let yaxisDatas: any[] = [];
                  res.forEach(paiement => {
                    xaxisDatas.push(paiement.dateLimit);
                    yaxisDatas.push(paiement.restant_du);
                  });
                  this.generateStatistic(xaxisDatas, yaxisDatas);
                }
              )
              
            }, error => {
              this.errorMsg = error;
            }
          )
        } else {
          this.credit = null;
        }
      }, error => {
        alert(error);
      }
    )
    }
  }

  checkIfCreditInUse(credit:Credit) {
    return credit.inUse == true ? "modal" : "";
  }
 
  getColorByUsingCredit(credit:Credit) {
    return credit.inUse == true ? "#ffffff" : '#f5f5f5';
  }

   addCreditToUse() {
    if (this.auth.currentUserValue != null && this.auth.isClient()) {
      this.addCreditConso();
    } 
  }
  
  generateStatistic(xaxisDatas: any[], yaxisDatas: any[]) {
    this.chartOptions = {
      series: [
        {
          name: "Restant du",
          data: yaxisDatas
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
        categories: xaxisDatas
      },
      tooltip: {
        x: {
          format: "yy-MM-dd"
        }
      }
    };
  }

  showErrorMsg(msg: any) {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }

 addCreditConso() {
    if (this.auth.currentUserValue != null && this.auth.isClient()) {
      this.moyenPaiementService.getQuickCardNumber(this.auth.currentUserValue.id).subscribe(
        res => {
          
          $("#cardumberFormBtnTouseCredit").click();
          this.numCarteCredit = res;

        }, error => {
          console.log(error);
        }
      )
    } else {
      alert("Veuillez vous connecter pour continuer!");
      this.router.navigateByUrl("/auth/se-connecter");
    }
  }
  
  

  addCreditToCard(form: any) {
    let numero = (<HTMLSelectElement>document.getElementById('numCarte')).value;
    this.creditService.useCreditInCard(this.credit, this.auth.currentUserValue.id,numero).subscribe(
      res => {
        form.reset();
                alert(res.message);
                location.reload();
              }, error => {
                alert(error);
              }
    )
  }  

  

  procederAuVersement() { 
    this.moyenPaiementService.getQuickCardNumber(this.auth.currentUserValue.id).subscribe(
      res => {
          $("#cardumberFormBtn").click();
          this.numCarteCredit = res;
        }, error => {
          console.log(error);
        }
    )
  } 

  rembourser(formcarte: any) {
    let numero = (<HTMLSelectElement>document.getElementById('numCarte')).value;
    this.creditService.rembourserCrdit(this.auth.currentUserValue.id, numero, this.credit.idCredit, this.paiement.idPaiement).subscribe(
        res => {
        formcarte.reset();
          $("#closeModal").click();
          this.paiement = new PaiementCredit();
          alert(res.message);
          window.location.reload();
        }, error => {
          alert(error);
          
        }
      )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMyCredit();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMyCredit();
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
