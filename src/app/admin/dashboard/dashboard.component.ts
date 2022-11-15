import { Component, OnInit ,ViewChild} from '@angular/core';
import { User } from 'src/app/models/user';
import { CreditService } from 'src/app/services/credit/credit.service';
import { MoyenPaiementsService } from 'src/app/services/moyenPaiements/moyen-paiements.service';
import { UserService } from 'src/app/services/user/user.service';

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
import { ChartOptions } from '../../landing/pages/reception/credit/credit.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  totalClient: number = 0;
  totalCredits: number = 0;
  totalCards: number = 0;
  constructor(private userServe: UserService,private cardServe:MoyenPaiementsService,
    private creditServe: CreditService,private auth:AuthenticationService) { }

  ngOnInit(): void {

    if (this.auth.isClientManager()) {
       this.getClients();
    } else if (this.auth.isPersonnalManager()) {
      this.getPersonnals();
    }
   
    this.getAllCredits();
    this.getAllCards();
    this.getAllPaiements();
  }

  getClients() {
    this.userServe.getAllClients().subscribe(
      res => {
        this.totalClient = res.length;
      }
    )
  }

  getPersonnals() {
    this.userServe.getAllPersonnals().subscribe(
      res => {
        this.totalClient = res.length;
      }
    )
  }

  getAllCredits() {
    this.creditServe.getAllCredits().subscribe(
      res => {
        this.totalCredits = res.length;
      }
    )
  }
  getAllPaiements() {
    this.creditServe.getAllPaiements().subscribe(
      res => {
        let xaxisDatas: any[] = [];
        let yaxisDatas: any[] = [];
        let zaxisDatas: any[] = [];
        for (let i = 0; i < res.length; i++) {
          const paiement = res[i];
          xaxisDatas.push(paiement.mensualite)
          yaxisDatas.push(paiement.interet);
          zaxisDatas.push(paiement.restant_du);
        }
        this.generateStatistic(xaxisDatas, yaxisDatas,zaxisDatas);
      }
    )
  }

  getAllCards() {
    this.cardServe.findAll().subscribe(
      res => {
        this.totalCards = res.length;
      }
    )
  }

  generateStatistic(xaxisDatas: any[], yaxisDatas: any[],zaxisDatas: any[]) {
    this.chartOptions = {
      series: [
      
        {
          name: "Mensualité",
          data: xaxisDatas
        },
        {
          name: "Interet",
          data: yaxisDatas
        },
        {
          name: "Restant du",
          data: zaxisDatas
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
        type: "numeric",
        categories:  yaxisDatas
      },
    };
  }
}