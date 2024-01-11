"use strict";(self.webpackChunkmox=self.webpackChunkmox||[]).push([[953],{9953:(N,l,e)=>{e.r(l),e.d(l,{LoginModule:()=>I,routes:()=>f});var g=e(6895),p=e(9299),d=e(1573),n=e(4006),o=e(4650),h=e(1481),x=e(1182),v=e(6401),a=e(1576),Z=e(5829),c=e(4859),T=e(3546),y=e(7392),L=e(4144),m=e(9549);function U(r,s){1&r&&(o.TgZ(0,"mat-error"),o._uU(1,"Username is required"),o.qZA())}function A(r,s){1&r&&(o.TgZ(0,"mat-error"),o._uU(1,"Username isn't long enough, minimum of 6 characters"),o.qZA())}function b(r,s){1&r&&(o.TgZ(0,"mat-error"),o._uU(1,"Password is required"),o.qZA())}function C(r,s){1&r&&(o.TgZ(0,"mat-error"),o._uU(1,"Password isn't long enough, minimum of 6 characters"),o.qZA())}function F(r,s){if(1&r&&(o.TgZ(0,"mat-error"),o._uU(1),o.qZA()),2&r){const i=o.oxw();o.xp6(1),o.Oqu(i.error)}}const f=[{path:"",component:(()=>{class r{constructor(i,t,u,S,J){this.fb=i,this.Router=t,this.sanitizer=u,this.appSettings=S,this._AuthService=J,this.hide=!0,this.error=""}ngOnInit(){this.bgImage=this.sanitizer.bypassSecurityTrustStyle("url(assets/images/others/login.jpg)"),this.loginForm=this.fb.group({user_phonenumber:[null,n.kI.compose([n.kI.required,n.kI.minLength(6)])],user_password:[null,n.kI.compose([n.kI.required,n.kI.minLength(6)])],rememberMe:!0})}onLoginFormSubmit(i){this._AuthService.login(i.value).subscribe(t=>{localStorage.setItem("userToken",JSON.stringify(t.user.userToken)),this._AuthService.setUserData(),this.Router.navigate(["/admin"])},t=>{400===t.status&&(this.error="the email or password is incorrect")})}}return r.\u0275fac=function(i){return new(i||r)(o.Y36(n.QS),o.Y36(p.F0),o.Y36(h.H7),o.Y36(x.d),o.Y36(v.e))},r.\u0275cmp=o.Xpm({type:r,selectors:[["app-login"]],decls:34,vars:10,consts:[[1,"px-3","py-5"],[1,"theme-container"],[1,"p-0","o-hidden"],["fxLayout","row wrap"],["fxFlex","100","fxFlex.gt-sm","50",1,"bg-cover"],["fxFlex","100","fxFlex.gt-sm","50","ngClass.gt-sm","px-5","ngClass.sm","px-3","ngClass.xs","px-3",1,"py-3"],["fxLayout","column","fxLayoutAlign","center center",1,"text-center"],[1,"secondary-font"],[3,"formGroup","ngSubmit"],["appearance","outline",1,"w-100","mt-2"],["matPrefix","",1,"mr-1","text-muted"],["matInput","","placeholder","Username","formControlName","user_phonenumber","required",""],[4,"ngIf"],["appearance","outline",1,"w-100","mt-1"],["matInput","","placeholder","Password","formControlName","user_password","required","",3,"type"],["mat-icon-button","","matSuffix","","type","button",1,"text-muted",3,"click"],[1,"text-center","mt-2"],["mat-raised-button","","color","accent","type","submit",1,"uppercase"],["fxLayout","row","fxLayoutAlign","space-between center",1,"mt-3"]],template:function(i,t){1&i&&(o.TgZ(0,"div",0)(1,"div",1)(2,"mat-card",2)(3,"div",3),o._UZ(4,"div",4),o.TgZ(5,"div",5)(6,"div",6)(7,"h1",7),o._uU(8,"Sign In"),o.qZA()(),o.TgZ(9,"form",8),o.NdJ("ngSubmit",function(){return t.onLoginFormSubmit(t.loginForm)}),o.TgZ(10,"mat-form-field",9)(11,"mat-icon",10),o._uU(12,"person"),o.qZA(),o.TgZ(13,"mat-label"),o._uU(14,"Username"),o.qZA(),o._UZ(15,"input",11),o.YNc(16,U,2,0,"mat-error",12),o.YNc(17,A,2,0,"mat-error",12),o.qZA(),o.TgZ(18,"mat-form-field",13)(19,"mat-icon",10),o._uU(20,"lock"),o.qZA(),o.TgZ(21,"mat-label"),o._uU(22,"Password"),o.qZA(),o._UZ(23,"input",14),o.YNc(24,b,2,0,"mat-error",12),o.YNc(25,C,2,0,"mat-error",12),o.TgZ(26,"button",15),o.NdJ("click",function(){return t.hide=!t.hide}),o.TgZ(27,"mat-icon"),o._uU(28),o.qZA()()(),o.YNc(29,F,2,1,"mat-error",12),o.TgZ(30,"div",16)(31,"button",17),o._uU(32," Sign to My Account "),o.qZA()(),o._UZ(33,"div",18),o.qZA()()()()()()),2&i&&(o.xp6(4),o.Udp("background-image",t.bgImage),o.xp6(5),o.Q6J("formGroup",t.loginForm),o.xp6(7),o.Q6J("ngIf",null==t.loginForm.controls.user_phonenumber.errors?null:t.loginForm.controls.user_phonenumber.errors.required),o.xp6(1),o.Q6J("ngIf",t.loginForm.controls.user_phonenumber.hasError("minlength")),o.xp6(6),o.Q6J("type",t.hide?"password":"text"),o.xp6(1),o.Q6J("ngIf",null==t.loginForm.controls.user_password.errors?null:t.loginForm.controls.user_password.errors.required),o.xp6(1),o.Q6J("ngIf",t.loginForm.controls.user_password.hasError("minlength")),o.xp6(3),o.Oqu(t.hide?"visibility_off":"visibility"),o.xp6(1),o.Q6J("ngIf",t.error))},dependencies:[g.O5,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u,a.xw,a.Wh,a.yH,Z.oO,c.lW,c.RK,T.a8,y.Hw,L.Nt,m.KE,m.hX,m.TO,m.qo,m.R9]}),r})(),pathMatch:"full"}];let I=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[g.ez,p.Bz.forChild(f),d.m]}),r})()}}]);