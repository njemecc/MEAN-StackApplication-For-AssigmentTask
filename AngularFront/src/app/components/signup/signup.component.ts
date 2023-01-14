import { Component, enableProdMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { SnackbarService } from 'src/app/services/snackbar.service';

import { GlobalConstants } from 'src/app/shared/global-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type:string = "password";

  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";

  signupForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserService,private toastr:ToastrService){
  }

  ngOnInit():void{
    this.signupForm = this.formBuilder.group({
      user_name:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
    }



hideShowPass(){
this.isText = !this.isText;
this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = "fa-eye-slash";
this.isText ? this.type = "text" : this.type="password";
}



handleSubmit(){
  var formData = this.signupForm.value;
  var data = {
  user_name:formData.user_name,
  password:formData.password
  }


  this.userService.signup(data).subscribe((response:any)=>{
    this.responseMessage = response?.message;
    this.toastr.success("You are successfully registered")
    this.router.navigate(['/login']);
  },(error)=>{
    if(error.error?.message){
      this.responseMessage = error.error?.message
    }else{
      this.responseMessage = GlobalConstants.genericError
      this.toastr.error("Invalid user credentials.")
    }
    //this.snackbar
  })

}



changeLanguage(){
  let naslov = document.querySelector('.naslov') as HTMLInputElement
  let btnSigUp = document.querySelector('.btn-signUp') as HTMLInputElement
  let alredy = document.querySelector('.alredy') as HTMLInputElement
  let inputUsername = document.querySelector('.input-username') as HTMLInputElement
  let inputPassword = document.querySelector('.input-password') as HTMLInputElement

if(naslov.innerHTML == "Sign up"){
  naslov.innerHTML = "Anmelden"
  btnSigUp.innerHTML= "Anmelden"
 inputUsername.setAttribute('placeholder','Benutzername')
 inputPassword.setAttribute('placeholder','Kennwort')
  alredy.innerHTML = `Haben Sie bereits ein Konto? <a id="forget" routerLink="/login" >Anmeldung</a>`
}else if (naslov.innerHTML="Anmelden"){
  naslov.innerHTML = "Sign up"
  btnSigUp.innerHTML="Sign up"
  inputPassword.setAttribute("placeholder","Password")
  inputUsername.setAttribute("placeholder","Username")
  alredy.innerHTML=`Alredy have an account? <a id="forget" routerLink="/login" >Login</a>`
}


}


}
