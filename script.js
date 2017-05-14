//Logic for popup menu

document.addEventListener('DOMContentLoaded',function() {
    var h4 = document.createElement("h4")
    h4.id = 'show_currency'
//Get current defoult currency
  chrome.storage.sync.get("currency_type", function (obj) {
      if(obj.currency_type){
        h4.innerHTML = "Your current currency is "+obj.currency_type
        document.body.prepend(h4);
      }else {
        //Set defoult currency to Euros on first run
        chrome.storage.sync.set({'currency_type':'EUR'})
        h4.innerHTML = "Your defoult currency is euro"
        document.body.prepend(h4);
      }
  });
    document.querySelector('select[name="currency_select"]').addEventListener('change',set_curreny);
},false);
function set_curreny(){
  var base_currency = this.value;
  //Set new defoult currency and add to chome starage
  chrome.storage.sync.set({'currency_type':base_currency})
  document.getElementById('show_currency').innerHTML =  "Your current currency is "+base_currency
}
