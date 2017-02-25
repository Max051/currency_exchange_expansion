// TODO: Optimiza this a-thing
var block = document.createElement('div')
var a = true;
var selected;




chrome.runtime.sendMessage({'currency':'s'}, function(response) {
  //    console.log(response);
   });

document.addEventListener("mouseup", function(event){
selected = window.getSelection().toString();
if (selected != "" && a) {

      block.style.position = 'absolute';
      block.style.left = event.clientX + 5 + "px"
      block.style.top = event.clientY - 45 + "px"
      block.style.backgroundColor = "#d7e4ed";
      block.style.padding = "6px";
      block.style.border = "0.5px solid #001e3c"
      block.style.borderRadius = "1em"
      block.style.fontSize = "1.2em"
      block.style.fontWeight = "600"
      block.id = 'currency_block';
      a = false;
      currency_check(callAjax);
    }
});
var base_currency;
var currency, result_currnecy, result_number;
function currency_check(callback){
    let patt1 = /[$,€,£,￡]/i;
    let patt2 =/[0-9]+(\.[0-9][0-9]?)?/g;
    let patt4 = /[.,,]/g;
     result_currnecy = selected.match(patt1);
     result_number = selected.match(patt2);
     result_d = selected.match(patt4);
     if(result_d&&result_d.length == 1 && result_d[0]==','&&result_number[1]<100){
     	result_number[2] = result_number[1];
      result_number[1] = '.';
     }
     result_number = result_number.join('')
    let notNan = isNaN(result_number)
     if (result_currnecy&&result_number && !notNan) {
       switch(result_currnecy[0]){
       case '$': currency = 'USD'
       break;
       case '€': currency = 'EUR'
       break;
       case '￡': currency = 'GBP';
       break;
       case '£': currency = 'GBP';
       }
       chrome.storage.sync.get("currency_type",function(obj){
          base_currency = obj.currency_type
callback('https://rate-exchange-1.appspot.com/currency?from='+currency+'&to='+base_currency,currency_changed);
       })
     }

}



document.addEventListener('mousedown',function(){
let block_to_remove = document.getElementById('currency_block')
		if(block_to_remove) {
		a = false;
    document.body.removeChild(block_to_remove);
    };
document.addEventListener('click',function(){a=true})
})

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",url, true);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4){
          //console.log(xmlhttp.responseText)
            callback(JSON.parse(xmlhttp.responseText));
        }
    }

    xmlhttp.send();
}
var changed;
function currency_changed(some_json){
changed = (result_number * some_json.rate).toFixed(2)
//console.log(changed)
show_div(changed+" "+base_currency);
}
function show_div(text){
  block.innerHTML = text;
  document.body.appendChild(block)
}
