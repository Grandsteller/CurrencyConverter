const currencyTypesUrl="https://api.frankfurter.app/currencies";
var fromCurrency,toCurrency;

    async function loadCurrencies(){
        try{
            const response=await fetch(currencyTypesUrl);
            const currencyData = await response.json();
            const currencyArr = Object.keys(currencyData);
            var currencies=`<option value="select">--select--</option>`;
            for(let i=0;i<currencyArr.length;i++){
                currencies +=`<option value="${currencyArr[i]}">${currencyArr[i]}</option>`;
            }
            var fromCurrency = document.getElementById("fromCurrency");
            var toCurrency = document.getElementById("toCurrency");
            toCurrency.innerHTML=currencies;
            fromCurrency.innerHTML=currencies;
        }
        catch(e){
            document.getElementById("dialogbox").style.display="block";
        }
   }

    function setCurrency(){
        document.getElementById("currencyValue").value="";
        fromCurrency=document.getElementById("fromCurrency").value;
        toCurrency=document.getElementById("toCurrency").value;
        if(fromCurrency === "--select--" && toCurrency !== "select")
            document.querySelector("h3").innerHTML="Kindly select appropriate currencies";
        else if(fromCurrency != "--select--" && toCurrency == "select")
            document.querySelector("h3").innerHTML="Kindly select appropriate currencies";
        else if(fromCurrency === toCurrency){
            document.querySelector("h3").innerHTML="Kindly select different currencies"
        }
        else{
            document.querySelector("h3").innerHTML=""
        }
   }



    loadCurrencies();

    async function convertCurrency(){
        var currencyValue=document.getElementById("fromCurrencyValue").value;
        if(currencyValue==""){
            document.querySelector("h3").innerHTML="Insert some value to Convert";
            return;
        }
        else if(currencyValue!=""){
            document.querySelector("h3").innerHTML="";
        }
        if(currencyValue==0){
            document.getElementById("currencyValue").value="0.00";
            return;
        }        

        if(document.querySelector("h3").innerHTML===""){
        try{
            const host = "api.frankfurter.app";
            const response = await fetch(`https://${host}/latest?amount=${currencyValue}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await response.json();
            document.getElementById("currencyValue").value=Object.values(data.rates)[0]; 
        }
        catch(e){
            document.getElementById("dialogbox").style.display="block";
        }
        }
    }


    function refreshPage(){
        document.getElementById("dialogbox").style.display="none";
        document.location.href="index.html";

    }