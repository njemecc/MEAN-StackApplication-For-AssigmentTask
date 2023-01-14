import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import * as e from 'express';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  textForm:any = FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private toastr:ToastrService){}


  ngOnInit():void {
    if(!localStorage.getItem("token")){
      this.router.navigate(['/login']);
    }


    this.textForm = this.formBuilder.group({
      text:['',Validators.required,Validators.pattern("(^[A-Za-z]( ?[A-Za-z] ?)*$")],
      
    })
  }


  handleLogout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);

    let h3Naslov = document.querySelector(".h3-naslov") as HTMLInputElement;

    if(h3Naslov.innerHTML == "Wortzähler"){
      this.toastr.success("Sie sind abgemeldet")
    }else{
      this.toastr.success("You are logged out!")
    }

   
  }


  deleteWords(){

let textInput = document.querySelector('.input-text') as HTMLInputElement
let h3 = document.querySelector('.numberOfWords') as HTMLInputElement
let brojevi = document.querySelector('.numberOfDigits') as HTMLInputElement


    textInput.value = ""
    h3.innerHTML = ""
    brojevi.innerHTML = ""


  }


  changeLanguage(){
    let naslov = document.querySelector('.h3-naslov') as HTMLInputElement
    let btnCount = document.querySelector('.count-dugme') as HTMLInputElement
    let btnCancel = document.querySelector('.cancel-dugme') as HTMLInputElement
    let btnLogout = document.querySelector('.logout-dugme') as HTMLInputElement
    let inputText = document.querySelector('.input-text') as HTMLInputElement

    let errorSmall = document.querySelector('.error-small') as HTMLInputElement



    if(naslov.innerHTML == "Word Counter"){
      btnCount.innerHTML="Berechnen"
      btnCancel.innerHTML="Löschen"
      btnLogout.innerHTML="Ausloggen"
      naslov.innerHTML = "Wortzähler"
    }else if (naslov.innerHTML == "Wortzähler" ){
      btnCount.innerHTML="Calculate"
      btnCancel.innerHTML="Cancel"
      btnLogout.innerHTML="Logout"
      naslov.innerHTML="Word Counter"

      errorSmall.innerText = "Bitte geben Sie einen gültigen Text mit 10 bis 390 Zeichen"
    }

  }

countWords(){

var formData = this.textForm.value;



let textInput = document.querySelector('.input-text') as HTMLInputElement


let h3 = document.querySelector('.numberOfWords') as HTMLInputElement
let brojevi = document.querySelector('.numberOfDigits') as HTMLInputElement
let naslov = document.querySelector('.h3-naslov') as HTMLInputElement


let brojeviTekst = ""
let nemackiTekst = ""



//let bezRazmaka = textInput.value.replace(/(\s{2,})|[^a-zA-Z']/g, ' ');

let bezRazmaka = textInput.value.replace(/^\s*/, '')

let vrednost = bezRazmaka.trim().split(' ');

//let vrednost = textInput.value.trim().split(' ');



let brojReci = vrednost.length;

let resultText = document.querySelector('.result-text-2') as HTMLInputElement





if (naslov.innerHTML == "Word Counter"){
  h3.innerHTML = `Words amount: ${brojReci}`
  resultText.innerHTML = "Result of your Text:"
}else if (naslov.innerHTML == "Wortzähler"){
  resultText.innerHTML = "Ergebnis Ihres Textes:"
  h3.innerHTML = `Wörter Anzahl: ${brojReci}`
}

vrednost.forEach(rec => {

  let umanjioc = rec.length

  let nizSamoBrojevi = rec.replace(/[^0-9]/g,'').split('')

  let brojBrojeva = nizSamoBrojevi.length

  brojeviTekst += `'${rec}' Numbers amount: ${brojBrojeva}. </br>`
  nemackiTekst +=`'${rec}'  Zahlen Anzahl: ${brojBrojeva} </br> `

  //console.log(nemackiTekst)

  if (naslov.innerHTML == "Word Counter"){

    
    
    brojevi.innerHTML = brojeviTekst

   
  }else{
    
   
    brojevi.innerHTML = nemackiTekst
  }



  //Palindromes

  
});

let palindromi = ""
let palindromCounter = 0;

vrednost.forEach(rec => {
 if (this.checkPalin(rec)){

palindromi += `"${rec}",`
palindromCounter++;

 }
})

let pPalindromi = document.querySelector('.p-palindromi') as HTMLInputElement;

let btnCalculate = document.querySelector('.count-dugme') as HTMLInputElement;



if (naslov.innerHTML == "Word Counter"){
  pPalindromi.innerHTML = `Palindrome words amount: ${palindromCounter} and they are:${palindromi}`
}

else if (btnCalculate.innerHTML == "Berechnen"){
 pPalindromi.innerHTML = `Palindrom Wörter Anzahl: ${palindromCounter} und sie sind:${palindromi}`
}




}

 checkPalin(word:string)
{
    var n = word.length
    word = word.toLowerCase();
 
    for (var i = 0; i < n; i++,n--)
    if (word[i] != word[n - 1])
        return false;    
    return true;
}

 brojacSpaceova = 0;


oneSpace(event:any){

console.log(event)

 
  
  if(event.code =="Space"){

    this.brojacSpaceova++

    if(this.brojacSpaceova > 1 ){
      event.preventDefault();
    }


    console.log(` broj space-ova:${this.brojacSpaceova}.`)

  }else if (event.code != "Space"){
    this.brojacSpaceova = 0;
  }


}

}
