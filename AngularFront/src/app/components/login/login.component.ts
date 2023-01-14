import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import * as e from 'express';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserService,private toastr:ToastrService){}

  type:string = "password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";

ngOnInit():void {
  this.loginForm = this.formBuilder.group({
    user_name:['',Validators.required,],
    password:['',Validators.required]
  })
}


changeLanguage(){
  let languageButton = document.querySelector('.language-btn') as HTMLInputElement; 
  let inputUsername = document.querySelector('.input-username');
  let inputPassword = document.querySelector('.input-password');
  let dugme = document.querySelector('.login-dugme') as HTMLInputElement;
  let divdont = document.querySelector('.div-dont')  as HTMLInputElement ;
  let signup = document.querySelector('a-signup')  as HTMLInputElement;
  let h3login = document.querySelector('.h3-login') as HTMLInputElement;

  let errorUsername = document.querySelector('.error-username') as HTMLInputElement;
  let errorPassword = document.querySelector('.error-username') as HTMLInputElement;
  let errorreq = document.querySelectorAll('.error-req');
  

 

  if(h3login.innerHTML == "Login"){

    inputUsername?.setAttribute('placeholder','Benutzername');
    inputPassword?.setAttribute('placeholder','Kennwort');
    h3login.innerHTML ="Anmelden";
    dugme.innerHTML = "Anmelden";
    divdont.innerHTML = `Sie haben kein Konto? <a class="a-signup" id="forget" routerLink="/signup">Anmeldung</a> `;
    signup.innerHTML= "Anmeldung";
    
    errorUsername.innerHTML="Bitte geben Sie einen gültigen Vornamen mit 4 bis 20 Zeichenein.";
    errorPassword.innerHTML="Bitte geben Sie einen gültigen Vornamen mit 8 bis 25 Zeichenein.";
    
    errorreq.forEach(span=>{
      span.innerHTML = "Bitte füllen Sie alle benötigten Felder aus.";
    })
   

  }else if (h3login.innerHTML == "Anmelden"){
    inputUsername?.setAttribute('placeholder','Username');
    inputPassword?.setAttribute('placeholder','Password');
    h3login.innerHTML ="Login";
    dugme.innerHTML = "Login";
    divdont.innerHTML = `Do't have account? <a class="a-signup" id="forget" routerLink="/signup">Sign up</a> `;
    signup.innerHTML= "Sign up";
    languageButton.innerHTML = "GR";
    errorUsername.innerHTML="Please enter a valid first name with 4 to 20 letters.";
    errorPassword.innerHTML="Please enter a valid first name with 8 to 25 letters.";

    errorreq.forEach(span=>{
      span.innerHTML = "Please fill all required fields.";
    })
  }

}

hideShowPass(){
this.isText = !this.isText;
this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = "fa-eye-slash";
this.isText ? this.type = "text" : this.type="password";
}

handleSubmit(){
  var formData = this.loginForm.value;
  var data = {
    user_name:formData.user_name,
    password:formData.password
  }

  this.userService.login(data).subscribe((response:any)=>{
    localStorage.setItem('token',response.token);
    this.router.navigate(['/counter']);

    let naslovNeki2 = document.querySelector('.h3-login') as HTMLInputElement

    if(naslovNeki2.innerHTML == "Login"){
      this.toastr.success("Welcome back!")
    }else{
      this.toastr.success("Willkommen zurück!") 
    }

    

  },(error)=>{
    if(error.error.message){
      this.responseMessage = error.error?.message;
    }
    else{
      this.responseMessage = GlobalConstants.genericError;
    }

    let naslovNeki = document.querySelector('.h3-login') as HTMLInputElement

    if (naslovNeki.innerHTML == "Login")
    {
      this.toastr.error("Invalid user credentials.")
    }else{
      this.toastr.error("Ungültige Benutzeranmeldeinformationen.")
    }
   
   
  })
}

/*
onSubmit(){
  if(this.loginForm.valid){
    //saljemo podatke u bazu
  }else{
    //bacamo errore bre toasterom
    this.validateALlFormFields(this.loginForm)
    alert("your form is invalid")
  }
}
*/

private validateALlFormFields(formGroup: FormGroup){

  Object.keys(formGroup.controls).forEach(field => {
  const control = formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true});
    }else if(control instanceof FormGroup){
      this.validateALlFormFields(control)
    }
  })

}





}
