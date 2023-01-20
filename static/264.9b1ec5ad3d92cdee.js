"use strict";(self.webpackChunke_banking=self.webpackChunke_banking||[]).push([[264],{3264:(C,h,o)=>{o.r(h),o.d(h,{AdminModule:()=>P});var r=o(4551),m=o(6895),t=o(4650),s=o(6148);let c=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-conge"]],decls:2,vars:0,consts:[[1,"bg-light","shadow-sm","rounded","p-4","mb-4"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t._UZ(1,"router-outlet"),t.qZA())},dependencies:[s.lC]}),e})();var p=o(9709),v=o(6722),S=o(5336),A=o(7053),Z=o(4243);const x=["chart"];let T=(()=>{class e{constructor(n,i,l,d){this.userServe=n,this.cardServe=i,this.creditServe=l,this.auth=d,this.totalClient=0,this.totalCredits=0,this.totalCards=0}ngOnInit(){this.auth.isClientManager()?this.getClients():this.auth.isPersonnalManager()&&this.getPersonnals(),this.getAllCredits(),this.getAllCards(),this.getAllPaiements()}getClients(){this.userServe.getAllClients().subscribe(n=>{this.totalClient=n.length})}getPersonnals(){this.userServe.getAllPersonnals().subscribe(n=>{this.totalClient=n.length})}getAllCredits(){this.creditServe.getAllCredits().subscribe(n=>{this.totalCredits=n.length})}getAllPaiements(){this.creditServe.getAllPaiements().subscribe(n=>{let i=[],l=[],d=[];for(let u=0;u<n.length;u++){const f=n[u];i.push(f.mensualite),l.push(f.interet),d.push(f.restant_du)}this.generateStatistic(i,l,d)})}getAllCards(){this.cardServe.findAll().subscribe(n=>{this.totalCards=n.length})}generateStatistic(n,i,l){this.chartOptions={series:[{name:"Mensualit\xe9",data:n},{name:"Interet",data:i},{name:"Restant du",data:l}],chart:{height:350,type:"area",zoom:{enabled:!0}},dataLabels:{enabled:!0},stroke:{curve:"smooth"},xaxis:{type:"numeric",categories:i}}}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(p.K),t.Y36(v.M),t.Y36(S.x),t.Y36(A.$))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-dashboard"]],viewQuery:function(n,i){if(1&n&&t.Gf(x,5),2&n){let l;t.iGM(l=t.CRH())&&(i.chart=l.first)}},decls:29,vars:7,consts:[[1,"bg-light","shadow-sm","rounded","p-4","mb-4"],[1,"text-5","font-weight-400","d-flex","align-items-center","mb-3"],[1,"row","profile-completeness"],[1,"col-sm-6","col-md-3"],[1,"border","rounded","p-3","text-center"],[1,"d-block","text-10","text-light","mt-2","mb-3"],[1,"fas","fa-users"],[1,"mb-0"],["routerLink","/admin/utilisateurs/",1,"btn-link","stretched-link",2,"font-size","2rem"],[1,"col-sm-6","col-md-3","mb-4","mb-sm-0"],[1,"fas","fa-credit-card"],["routerLink","/admin/depots/",1,"btn-link","stretched-link",2,"font-size","2rem"],[1,"fas","fa-wallet"],["routerLink","/admin/credits/",1,"btn-link","stretched-link",2,"font-size","2rem"],[1,"bg-light","shadow-sm","rounded","py-4","mb-4"],[3,"series","chart","xaxis","title"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0)(1,"h3",1),t._uU(2,"Tableaux de bords"),t.qZA(),t.TgZ(3,"div",2)(4,"div",3)(5,"div",4)(6,"span",5),t._UZ(7,"i",6),t.qZA(),t.TgZ(8,"p",7)(9,"a",8),t._uU(10),t.qZA()()()(),t.TgZ(11,"div",9)(12,"div",4)(13,"span",5),t._UZ(14,"i",10),t.qZA(),t.TgZ(15,"p",7)(16,"a",11),t._uU(17),t.qZA()()()(),t.TgZ(18,"div",9)(19,"div",4)(20,"span",5),t._UZ(21,"i",12),t.qZA(),t.TgZ(22,"p",7)(23,"a",13),t._uU(24),t.qZA()()()()()(),t.TgZ(25,"h3",1),t._uU(26,"Statistique de Gain sur les cr\xe9dits"),t.qZA(),t.TgZ(27,"div",14),t._UZ(28,"apx-chart",15),t.qZA()),2&n&&(t.xp6(10),t.Oqu(i.totalClient),t.xp6(7),t.Oqu(i.totalCards),t.xp6(7),t.Oqu(i.totalCredits),t.xp6(4),t.Q6J("series",null==i.chartOptions?null:i.chartOptions.series)("chart",null==i.chartOptions?null:i.chartOptions.chart)("xaxis",null==i.chartOptions?null:i.chartOptions.xaxis)("title",null==i.chartOptions?null:i.chartOptions.title))},dependencies:[s.yS,Z.x]}),e})(),O=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-user"]],decls:2,vars:0,consts:[[1,"bg-light","shadow-sm","rounded","p-4","mb-4"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t._UZ(1,"router-outlet"),t.qZA())},dependencies:[s.lC]}),e})(),U=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-depots"]],decls:1,vars:0,template:function(n,i){1&n&&t._UZ(0,"router-outlet")},dependencies:[s.lC]}),e})(),y=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-credit"]],decls:1,vars:0,template:function(n,i){1&n&&t._UZ(0,"router-outlet")},dependencies:[s.lC]}),e})();var g=o(2846),M=o(3442),N=o(808),E=o(9317),b=o(4333);function L(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"form",7)(1,"div",8),t._UZ(2,"input",9),t.TgZ(3,"label",10),t._uU(4),t.O4$(),t.TgZ(5,"svg",11),t.NdJ("click",function(){const d=t.CHM(n).$implicit,u=t.oxw();return t.KtG(u.deleteNotification(d.id))}),t._UZ(6,"path",12)(7,"path",13),t.qZA()(),t.kcU(),t.TgZ(8,"p",14),t._uU(9),t.qZA()(),t._UZ(10,"hr",2),t.qZA()}if(2&e){const n=a.$implicit;t.xp6(2),t.Q6J("id",n.id+"_notif")("name",n.id+"_notif"),t.xp6(1),t.uIk("for",n.id+"_notif"),t.xp6(1),t.hij("",n.object," "),t.xp6(5),t.hij("",n.message,".")}}const F=[{path:"",redirectTo:"tableau-de-bords",pathMatch:"full"},{path:"tableau-de-bords",component:T},{path:"",component:O,children:[{path:"utilisateurs",loadChildren:()=>o.e(198).then(o.bind(o,7198)).then(e=>e.UserModule)}]},{path:"",component:U,children:[{path:"depots",canActivate:[g.a],data:{roles:["ROLE_GESTIONNAIRE_CLIENTELE"]},loadChildren:()=>o.e(746).then(o.bind(o,6746)).then(e=>e.DepotsModule)}]},{path:"",component:y,children:[{path:"credits",loadChildren:()=>Promise.all([o.e(592),o.e(394)]).then(o.bind(o,394)).then(e=>e.CreditModule)}]},{path:"",component:c,children:[{path:"conges",canActivate:[g.a],data:{roles:["ROLE_PERSONNEL_RH"]},loadChildren:()=>o.e(517).then(o.bind(o,5517)).then(e=>e.CongeModule)}]},{path:"",component:M.k,children:[{path:"salaires",canActivate:[g.a],data:{roles:["ROLE_PERSONNEL_RH"]},loadChildren:()=>o.e(863).then(o.bind(o,3863)).then(e=>e.SalaireModule)}]},{path:"",component:N.g,children:[{path:"formations",canActivate:[g.a],data:{roles:["ROLE_PERSONNEL_RH"]},loadChildren:()=>o.e(80).then(o.bind(o,3080)).then(e=>e.FormationModule)}]},{path:"notifications",component:(()=>{class e{constructor(n,i){this.notificationServe=n,this.auth=i,this.page=10,this.count=0,this.tableSize=10,this.tableSizes=[3,6,9,12],this.notifications=[],this.noShowedNotifications=[]}ngOnInit(){this.findAllByCurrentUSer(),this.findAllNoShowedByCurrentUSer()}findAllByCurrentUSer(){this.notificationServe.getAllNotifications(this.auth.currentUserValue.id).subscribe(n=>{this.notifications=n},n=>{console.log(n)})}findAllNoShowedByCurrentUSer(){this.notificationServe.getAllNotifications(this.auth.currentUserValue.id).subscribe(n=>{this.noShowedNotifications=n},n=>{console.log(n)})}deleteNotification(n){this.notificationServe.deleteNotification(n).subscribe(i=>{this.ngOnInit()},i=>{this.ngOnInit()})}onTableDataChange(n){this.page=n,this.findAllByCurrentUSer()}onTableSizeChange(n){this.tableSize=n.target.value,this.page=1,this.findAllByCurrentUSer()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(E.g),t.Y36(A.$))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-notification"]],decls:8,vars:1,consts:[[1,"bg-light","shadow-sm","rounded","p-4","mb-4"],[1,"text-5","font-weight-400"],[1,"mx-n4"],["id","notifications",4,"ngFor","ngForOf"],[1,"text-center","mt-4"],[1,"pagination","justify-content-center","mt-4","mb-0"],["previousLabel","Prev","nextLabel","Next",3,"pageChange"],["id","notifications"],[1,"form-check","custom-control","custom-checkbox"],["type","checkbox",1,"custom-control-input",3,"id","value","name"],[1,"custom-control-label","text-3"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-trash",2,"margin","0","color","red","cursor","pointer",3,"click"],["d","M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"],["fill-rule","evenodd","d","M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"],[1,"text-muted","line-height-3","mt-2"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0)(1,"h3",1),t._uU(2,"Notifications"),t.qZA(),t._UZ(3,"hr",2),t.YNc(4,L,11,5,"form",3),t.TgZ(5,"div",4)(6,"ul",5)(7,"pagination-controls",6),t.NdJ("pageChange",function(d){return i.onTableDataChange(d)}),t.qZA()()()()),2&n&&(t.xp6(4),t.Q6J("ngForOf",i.notifications))},dependencies:[m.sg,b.LS]}),e})()}];let I=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.Bz.forChild(F),s.Bz]}),e})();var R=o(678),z=o(7092);let P=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.ez,I,r.ClientSpaceModule,R.LandingModule,Z.X,z.IJ,b.JX]}),e})()},808:(C,h,o)=>{o.d(h,{g:()=>m});var r=o(4650);let m=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(c){return new(c||t)},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-formation"]],decls:3,vars:0,consts:[[1,"bg-light","shadow-sm","rounded","p-4","mb-4"]],template:function(c,p){1&c&&(r.TgZ(0,"div",0)(1,"p"),r._uU(2,"formation works!"),r.qZA()())}}),t})()},3442:(C,h,o)=>{o.d(h,{k:()=>t});var r=o(4650),m=o(6148);let t=(()=>{class s{constructor(){}ngOnInit(){}}return s.\u0275fac=function(p){return new(p||s)},s.\u0275cmp=r.Xpm({type:s,selectors:[["app-salaire"]],decls:2,vars:0,consts:[[1,"bg-light","shadow-sm","rounded","p-4","mb-4"]],template:function(p,v){1&p&&(r.TgZ(0,"div",0),r._UZ(1,"router-outlet"),r.qZA())},dependencies:[m.lC]}),s})()}}]);