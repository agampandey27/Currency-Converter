import {countryList} from './countryCodes.js' ;

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns =  document.querySelectorAll(".dropdown select") ;
const btn = document.querySelector("form button") ;
const fromCurr = document.querySelector(".from select") ;
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg") ;
const exchangeBtn = document.querySelector(".exchange") ;

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerHTML=currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target) ;
    })
}

exchangeBtn.addEventListener("click" , ()=>{
    
    let i1 = document.querySelector(".i1");
    let i2 = document.querySelector(".i2");
    let support ;
    support = i1.src;
    i1.src = i2.src ;
    i2.src = support ;

    support = fromCurr.value ;
    fromCurr.value = toCurr.value ;
    toCurr.value = support ;
});

const updateFlag = (element) => {
    let currCode =  element.value ;
    let countryCode = countryList[currCode];
    let newSRC =  `https://flagsapi.com/${countryCode}/shiny/64.png` ;
    let image = element.parentElement.querySelector('img');
    image.src = newSRC ;
}

btn.addEventListener("click" , async (evt)=>{
    evt.preventDefault() ;
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value ;
    if(amtVal ==="" || amtVal<1){
        amtVal = 1 ;
        amount.value = 1 ;
    }

    let country1 = fromCurr.value.toLowerCase();
    let country2 = toCurr.value.toLowerCase();
    let URL = `${BASE_URL}/${country1}.json` ;

    let response = await fetch(URL) ;
    let data = await response.json();
    let num = data[fromCurr.value.toLowerCase()] ;
    let rate = num[toCurr.value.toLowerCase()];

    let finalAmount = amtVal*rate ;
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})