
var Extension  = function(){
  this.block = document.createElement('div')
  this.no_block_displaying = true;
  this.selected;
  Extension.base_currency;
};


var Extension = new Extension();



Extension.getNumber = function () {
  let patt2 =/[0-9]+(\.[0-9][0-9]?)?/g;
  let patt4 = /[.,,]/g;

  let result_number = Extension.selected.match(patt2);
  let result_decimal = Extension.selected.match(patt4);
  //console.log(result_decimal)
   if(result_decimal && result_decimal.length == 1 && result_decimal[0]==','&&result_number[1]<100){
    result_number[2] = result_number[1];
    result_number[1] = '.';
   }
  //   console.log(result_number.join(''))
  if (result_number) {
    return result_number.join('')
  }

};

Extension.currency_check = function (callback) {

  let patt1 = /[$€£￡]/i;
  let result_currnecy = Extension.selected.match(patt1);
  let currency;

     if (result_currnecy&& Extension.getNumber() && !(isNaN( Extension.getNumber() )) ) {

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
         callback('https://rate-exchange-1.appspot.com/currency?from='+currency+'&to='+obj.currency_type,Extension.calculateCurrency);
       })

     }
};

Extension.callAjax = function (url,callback) {
      let xmlhttp;
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

};

Extension.calculateCurrency = function (json_response) {

let changed;
changed = (Extension.getNumber() * json_response.rate).toFixed(2)
chrome.storage.sync.get("currency_type",function(obj){
   Extension.show_div(changed+" "+obj.currency_type);
 })

};

Extension.show_div = function(text) {
//  console.log(Extension.block)
  Extension.block.innerHTML = text;
  document.body.appendChild(Extension.block)
}



document.addEventListener("mouseup",function(event){

          Extension.selected = window.getSelection().toString();

      if (Extension.selected != "" && Extension.no_block_displaying) {

            Extension.block.style.position = 'absolute';
            Extension.block.style.left = event.pageX + 5 + "px"
            Extension.block.style.top = event.pageY - 45 + "px"
            Extension.block.style.backgroundColor = "#d7e4ed";
            Extension.block.style.padding = "6px";
            Extension.block.style.border = "0.5px solid #001e3c"
            Extension.block.style.borderRadius = "1em"
            Extension.block.style.fontSize = "1.2em"
            Extension.block.style.fontWeight = "600"
            Extension.block.id = 'currency_block';
            Extension.block.style.zIndex = 1;
            Extension.block.style.color = '#3c3c3c';
            Extension.no_block_displaying = false;
            Extension.currency_check(Extension.callAjax);
          }
        });
document.addEventListener('mousedown',function(){
  let block_to_remove = document.getElementById('currency_block')
    if(block_to_remove) {
        Extension.no_block_displaying = false;
        document.body.removeChild(block_to_remove);
    };
 document.addEventListener('click',function(){
 Extension.no_block_displaying=true
})
});
