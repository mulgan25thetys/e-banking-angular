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
import { ProjetImmobilier } from '../../../../models/projetImmobilier';
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
import { ProduitImmobilier } from 'src/app/models/produitImmobilier';
import { DomaineAvancement } from 'src/app/models/domaineAvancement';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MapsService } from 'src/app/services/maps.service';
import { Attachements } from 'src/app/models/attachement';
import { HttpResponse, HttpEventType } from '@angular/common/http';


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

  pdfSrc = "D:\Mulgan Thétys\CarteDeSejour.pdf";

  credit = new Credit();
  creditCapEm = new Credit();
  creditImmo = new Credit();
  simulatedCredit = new Credit();

  autreRevenus: number = 0;
  numCarteCredit: any[] =[];

  capitalEmprunte: number =0;
  dureeEmprunt: number = 0;

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

  isResidencePrincipale: Boolean = false;
  isAchatacredit: Boolean = false;

  minDate: NgbDate = new NgbDate(1789, 7, 14); 

  modelDateDeb: NgbDateStruct;
  modelDateFin: NgbDateStruct;
	placement = 'bottom';
  
  lat: number =0;
  long: number = 0;
  
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  isUpLoadError = false;
  message = '';
  classAlert ="";

  constructor(private creditService: CreditService,private mapsService: MapsService,
    private auth: AuthenticationService, private toastr: ToastrService, private router: Router,
    private moyenPaiementService: MoyenPaiementsService) {

  }

  ngOnInit(): void {
    this.creditImmo = new Credit();
    this.creditImmo.projet = new ProjetImmobilier();
    this.creditImmo.projet.produit = new ProduitImmobilier();
    this.creditImmo.projet.avancements = [];
    this.creditImmo.fichiers = [];
    this.creditImmo.uploadfichiers = [];
    
    this.isResidencePrincipale = false;
    this.isAchatacredit = false;
    
    if (this.auth.currentUserValue && this.auth.isClient) {
      this.moyenPaiementService.getProvisions(this.auth.currentUserValue.id).subscribe(
        res => {
          this.autreRevenus = res;
          this.creditCapEm.autresRevenus = this.autreRevenus;
        }
      )
    }


    window.scrollTo(0, 0);

    this.credit.montantMensuel = 0;
    this.credit.montantTransaction = 0;

    this.mapsService.getLocation().subscribe(
      data => {
        this.lat = data.latitude;
        this.long = data.longitude;
      },
      error => {
        console.log(error);
        
      }
    )
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  
  onTypeImmobilierChange(event:any) {
    let typeImmoValue = event.target.value;
    if (typeImmoValue == "RESIDENCE_SECONDAIRE") {
      this.isResidencePrincipale = true;
    } else {
      this.creditImmo.projet.produit.montant_revente = null;
      this.creditImmo.projet.produit.montant_restant_du = null;
      this.isResidencePrincipale = false;
      this.isAchatacredit = false;
    }
    
  }

  onEstAcheteACredit(event: any) {
    let isAchatACredit = event.target.checked;
    if (isAchatACredit == true) {
      this.isAchatacredit = true;
    }
  }
  onNEstPasAcheteACredit(event: any) {
    let isNestPasAchatACredit = event.target.checked;
    if (isNestPasAchatACredit == true) {
      this.isAchatacredit = false;
      this.creditImmo.projet.produit.montant_restant_du = null;
    }
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
    this.creditCapEm.montantMensuel = this.valueMensuel;
    this.creditCapEm.categorie = "CONSOMMATION";
    this.creditCapEm.typeSimulation = "CALCUL_CAPACITE_EMPRUNT";

    this.creditService.simulerCreditConso(this.creditCapEm).subscribe(
      res => {
        
        if (res.montantTransaction == 0) {
          this.toastr.warning("La mensualité est trop élévée par rapport à votre revenus", "Capacité d'emprunt");
        }

        this.capitalEmprunte = res.montantDemande;
        this.dureeEmprunt = res.duree;
        this.showCapital = true;
        this.creditCapEm.montantMensuel = res.montantMensuel;
        this.creditCapEm.montantTransaction = res.montantTransaction;
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

  addCreditImmo(form: NgForm) {

    this.creditImmo.typeSimulation = "CALCUL_CAPACITE_EMPRUNT";
    this.creditImmo.categorie = "IMMOBILIER";

    let successDest = false;
    let successStat = false;
    let successMotif = false;
    let successProjetPeriod = false;
    let inputdestination = (<HTMLSelectElement>document.getElementById('input-destination')).value;
    let inputstatus = (<HTMLSelectElement>document.getElementById('input-status')).value;
    let inputmotif = (<HTMLSelectElement>document.getElementById('input-motif')).value;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.creditImmo.uploadfichiers.push(this.currentFile);
      }
    }

    if (inputmotif == "default") {
      successMotif = false;
      this.toastr.info("Veuillez indiquer le motif de votre projet", "Crédit Immobilier");
    } else {
      this.creditImmo.projet.motif = inputmotif;
      successMotif = true;
    }

    if (inputstatus == "default") {
      successStat = false;
      this.toastr.info("Veuillez indiquer l'etat d'avancement de votre projet", "Crédit Immobilier");
    } else {
      this.creditImmo.projet.status = inputstatus;
      successStat = true;
    }

    if (inputdestination == "default") {
      successDest = false;
      this.toastr.info("Veuillez indiquer la destination de votre bien immobilier", "Crédit Immobilier");
    } else {
      this.creditImmo.projet.produit.destination = inputdestination;
      successDest = true;
    }

    if (this.modelDateDeb == null || this.modelDateFin == null) {
      successProjetPeriod = false;
      this.toastr.info("Veuillez verifier la période de votre projet", "Crédit Immobilier");
    } else {
      successProjetPeriod = true;
      this.creditImmo.projet.dateDebut =  new Date(this.modelDateDeb.year, this.modelDateDeb.month, this.modelDateDeb.day);
      this.creditImmo.projet.dateFin = new Date(this.modelDateFin.year, this.modelDateFin.month, this.modelDateFin.day);
    }

    if (successMotif && successStat && successDest && successProjetPeriod) {
        
      if (this.auth.currentUserValue && this.auth.isClient) {
        console.log(this.creditImmo);
        
        this.creditService.addCreditImmo(this.creditImmo,this.auth.currentUserValue.id).subscribe(
          res => {
            this.toastr.success(res.message, "Credit Immobilier");
            this.upload(this.creditImmo.idCredit);
            this.ngOnInit();
          
        }, error => {
            this.toastr.error(error, "Credit Immobilier");
          
          }
        )
      } else {
        this.router.navigate(['/auth/se-connecter']);
      }
    } else {
      this.toastr.warning("Veuillez vérifier les informations", "Crédit Immobilier");
    }
  }

  upload(idCredit:any): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        // if (file.type.split("/")[0] === "pdf") {
          this.creditService.upload(this.currentFile,idCredit).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.classAlert = "alert-success";
              // this.fileInfos = this.uploadService.getFiles();
              location.reload();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
              this.classAlert = "alert-danger";
            } else {
              this.message = 'Could not upload the file!';
              this.classAlert = "alert-danger";
            }
            this.currentFile = undefined;
          });
        // } else {
        //   this.isUpLoadError = true;
        //   this.message = 'Insert a PDF file please!';
        //   this.classAlert = "alert-danger";
        // }
        
      }
      this.selectedFiles = undefined;
    }
  }

  onDateDebutSelect(event:any) {
    this.creditImmo.projet.dateDebut = event.year + '-' + event.month + "-" + event.day;
    this.minDate.year = event.year;
    this.minDate.month = event.month;
    this.minDate.day = event.day;
  }

  onDateFinSelect(event:any) {
    this.creditImmo.projet.dateFin = event.year + '-' + event.month + "-"+event.day;
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
      this.moyenPaiementService.getQuickCardNumber(this.auth.currentUserValue.id).subscribe(
        res => {
          console.log(res);
          
          $("#cardumberFormBtn").click();
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
  

  showErrorMsg(msg: any) {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }

  addCreditToCard(form: any) {
    let numero = (<HTMLSelectElement>document.getElementById('numCarte')).value;
    this.creditService.AddCreditToCard(this.simulatedCredit, this.auth.currentUserValue.id,numero).subscribe(
      res => {
        form.reset();
                alert("Votre credit a été accordé!");
                location.reload();
              }, error => {
                alert(error);
              }
    )
  }
}