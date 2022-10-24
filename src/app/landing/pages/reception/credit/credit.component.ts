import { Router } from '@angular/router';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Credit } from '../../../../models/credit';
import swal from 'sweetalert2'; 
import { CreditService } from 'src/app/services/credit/credit.service';
import { CookieService } from 'src/app/services/cookie.service';
import { AuthenticationService } from '../../../../services/authentication.service';
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
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  remboursement_infinetext :String = "Une seule fois";
  remboursement_Mensualitytext :String = "Mensualité constante";
  remboursement_Amortissemnttext :String = "Amortissement constante";
    
  credit = new Credit();
  simulatedCredit = new Credit();

  isCreditImmoForm: boolean = false;
  isCreditConsoForm: boolean = true;

  showStatistic: boolean = false;

  constructor(private creditService: CreditService,
    private auth: AuthenticationService, private router: Router,
    private cookie: CookieService, private moyenPaiementService:MoyenPaiementsService) {
        
   }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.cookie.getCookie('simulated_credit')) {
      //this.simulatedCredit = this.cookie.getCookie('simulated_credit');
    }
  }
 
  setCreditImmoForm(event) {
    this.simulatedCredit = new Credit();
    this.showStatistic = false;
    if (event.target.checked == true) {
      this.isCreditConsoForm = false;
      this.isCreditImmoForm = true;
    }
  }
  setCreditConsoForm(event: any) {
    this.simulatedCredit = new Credit();
    this.showStatistic = false;
    if (event.target.checked == true) {
      this.isCreditConsoForm = true;
      this.isCreditImmoForm = false;
    }
  }

  simulerCreditConso() {
    window.scrollTo(0, 0);
    this.credit.categorie = "CONSOMMATION";
    let modeRemoursement = (<HTMLSelectElement>document.getElementById('input-mode')).value;
    if (modeRemoursement != "default") { 
      this.credit.modeRemboursement = modeRemoursement;
      this.creditService.simulerCreditConso(this.credit).subscribe(
        res => {
          this.simulatedCredit = res;
          let xaxisDatas: any[] = [];
          let yaxisDatas: any[] = [];
          for (let i = 0; i < this.simulatedCredit.paiements.length; i++) {
            const paiement = this.simulatedCredit.paiements[i];
            xaxisDatas.push(paiement.restant_du);
            yaxisDatas.push(paiement.dateLimit);
          }
          this.generateStatistic(xaxisDatas, yaxisDatas);
          this.showStatistic = true;
        }, error => {
          this.showErrorMsg(error);
        }
      )
      
    } else {
      swal.fire('Veuillez selectionner un mode de remboursement');
    }
  }

  generateStatistic(xaxisDatas: any[], yaxisDatas: any[]) {
    this.chartOptions = {
      series: [
        {
          name: "Restant du",
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

  addCreditConso() {
    if (this.auth.currentUserValue != null && this.auth.isClient()) {
      this.rechercherCarteBancaire();
    } else { 
      alert("Veuillez vous connecter pour continuer!");
      this.router.navigateByUrl("/auth/se-connecter");
    }
  }

  showErrorMsg(msg: any) {
    swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg,
  })
  }

  rechercherCarteBancaire() {
    let numeroCarte: any;
    swal.fire({
      title: 'Entrer le numéro de votre carte bancaire',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Rechercher',
      showLoaderOnConfirm: true,
      preConfirm: (numero) => {
        numeroCarte = numero;
        this.moyenPaiementService.getCreditByNumber(numero, this.auth.currentUserValue.id).subscribe(
          res => {
            this.creditService.AddCreditToCard(this.simulatedCredit,this.auth.currentUserValue.id,res.numero).subscribe(
              res => {
                alert("Votre credit a été accordé!");
                location.reload();
              }, error => {
                alert(error);
               }
            )
          }, error => {
            alert(error);
          }
        )
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }
}