import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Credit } from '../../../../models/credit';
import swal from 'sweetalert2';
import { CreditService } from 'src/app/services/credit/credit.service';
import { CookieService } from 'src/app/services/cookie.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';
import { ToastrService } from 'ngx-toastr';

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


const getSymbolFromCurrency = require('currency-symbol-map');
//const currencyConverter = require('currency-converter-lt');

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

  remboursement_infinetext: String = "Une seule fois";
  remboursement_Mensualitytext: String = "Mensualité constante";
  remboursement_Amortissemnttext: String = "Amortissement constante";

  credit = new Credit();
  simulatedCredit = new Credit();

  isCreditImmoForm: boolean = false;
  isCreditConsoForm: boolean = true;

  showStatistic: boolean = false;
  showCapital: boolean = false;


  valueMontant: number = 50000;
  optionsMontant: Options = {
    floor: 1000,
    ceil: 100000
  };

  valueMensuel: number = 1000;
  optionsMensuel: Options = {
    floor: 0,
    ceil: 10000
  };

  valueTransaction: number = 1000;
  optionsTransaction: Options = {
    floor: 0,
    ceil: 100000
  };

  valueDuree: number = 6;
  optionsDuree: Options = {
    floor: 1,
    ceil: 12
  };

  constructor(private creditService: CreditService,
    private auth: AuthenticationService,private toastr:ToastrService, private router: Router,
    private cookie: CookieService, private moyenPaiementService: MoyenPaiementsService) {

  }

  ngOnInit(): void {
    console.log(getSymbolFromCurrency('XAF'));


    window.scrollTo(0, 0);

    this.credit.montantMensuel = 0;
    this.credit.montantTransaction = 0;
  }

  getMontantDemandeValue() {
    return this.valueMontant;
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

  showValuesForMensuality(value: any) {
    this.credit.montantDemande = this.valueMontant;
    this.credit.duree = this.valueDuree;
    
    this.simulerCreditConsoMensuality();
  }
  showValuesForEcheance(value: any) {
    if (this.valueMensuel > this.valueMontant) {
      this.valueMensuel = this.valueMontant;
    } else {
      this.credit.montantDemande = this.valueMontant;
      this.credit.montantMensuel = this.valueMensuel;
    }
  
  }

  simulerCreditConsoMensuality() {
    //window.scrollTo(0, 0);
    this.credit.categorie = "CONSOMMATION";
    this.credit.typeSimulation = "CALCUL_MENSUALITE";

    this.creditService.simulerCreditConso(this.credit).subscribe(
      res => {
        this.credit.duree = res.duree;
        this.credit.montantMensuel = res.montantMensuel;
        this.credit.montantTransaction = res.montantTransaction;
        this.simulatedCredit = res;

        this.simulatedCredit.color = res.status == "hight" ? "badge badge-danger" : "badge badge-success";
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
  }

  simulerCreditConsoCapaciteEmprunt() {
    this.credit.montantMensuel = this.valueMensuel;
    this.credit.categorie = "CONSOMMATION";
    this.credit.typeSimulation = "CALCUL_CAPACITE_EMPRUNT";

    this.creditService.simulerCreditConso(this.credit).subscribe(
      res => {
        if (res.montantTransaction == 0) {
          this.toastr.warning("La mensualité est trop élévée par rapport à votre revenus", "Capacité d'emprunt");
        }
        this.showCapital = true;
        this.credit.duree = res.duree;
        this.credit.montantMensuel = res.montantMensuel;
        this.credit.montantTransaction = res.montantTransaction;
        this.credit.montantDemande = res.montantDemande;
        this.simulatedCredit = res;
        console.log(this.credit.duree);
        
        this.simulatedCredit.color = res.status == "hight" ? "badge badge-danger" : "badge badge-success";
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
            this.creditService.AddCreditToCard(this.simulatedCredit, this.auth.currentUserValue.id, res.numero).subscribe(
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