// TODO: Optimiza this a-thing
var block = document.createElement('div')
var a = true;
var selected;
document.addEventListener("mouseup", function(event){
selected = window.getSelection().toString();
if (selected != "" && a) {

      block.style.position = 'absolute';
      block.style.left = event.clientX + 5 + "px"
      block.style.top = event.clientY + 3 + "px"
      block.style.backgroundColor = "#d3d3d3";
      block.id = 'currency_block';
      a = false;
      currency_check(callAjax);
    }
});
var currency, result_currnecy, result_number;
function currency_check(callback){
    let patt1 = /[$,€,£,￡]/i;
    let patt2 =/[0-9]+(\.[0-9][0-9]?)?/g;
    let patt4 = /[.,,]/g;
     result_currnecy = selected.match(patt1);
     result_number = selected.match(patt2);
     result_d = selected.match(patt4);
     console.log(result_d)
     if(result_d&&result_d.length == 1 && result_d[0]==','&&result_number[1]<100){
     	result_number[2] = result_number[1];
      result_number[1] = '.';
     	console.log(result_number)
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
       callback('https://api.fixer.io/latest?base='+currency,currency_changed);
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
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET",url, true);
    xmlhttp.send();
}
var changed;
function currency_changed(some_json){
changed = (result_number * some_json.rates.PLN).toFixed(2)
show_div(changed+" PLN");
}
function show_div(text){
  block.innerHTML = text;
  document.body.appendChild(block)
}
