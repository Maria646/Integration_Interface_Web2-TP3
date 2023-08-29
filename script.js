const nom = document.getElementById("nom");
const numero = document.getElementById("numero");
const message= document.getElementById("message");
const input = document.querySelector(".inputSend__formulaire");
let verification = 0;

const conditions = () => {
const nameValue = nom.value.trim();
const numeroValue = numero.value.trim();
const messageValue = message.value.trim();

verification = 0;
let noError = true;

    if(nameValue === '') {
        setError(nom, 'Le nom ne peut pas être vide');
        noError = false;
    } else {
        setSucces(nom);
    }
    
    if(numeroValue === ''){
        setError(numero,'Le numero ne peut être vide');
        noError = false;
    }
    else{
        setSucces(numero);
    }
    
    if(messageValue === ''){
        setSucces(message);
        noError = true;
    }else{
        setSucces(message);
        noError = true;
    }
    
    console.log(noError);
    return noError;
}


const setError = (element, message) =>{
    const inputControl = element.parentElement;
    const fusionInputParent = inputControl.querySelector(".messageError");

    fusionInputParent.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSucces = (element) =>{
    verification++;
    const inputControl = element.parentElement; 
    const fusionInputParent = inputControl.querySelector(".messageError");

    fusionInputParent.innerText = "";
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
    if(verification === 3){
        redirection();
    }
}

input.addEventListener("click", function(event) {
    event.preventDefault();
    conditions();
  })
  
  function redirection(){
    window.location.replace("./confirmationForm.html");
  }