
document.addEventListener('DOMContentLoaded',function() {
    var h4 = document.createElement("h4")
    h4.id = 'show_currency'

  chrome.storage.sync.get("currency_type", function (obj) {
      if(obj.currency_type){
      //  var h4 = document.createElement("h4")
        h4.innerHTML = "Your current currency is "+obj.currency_type
        document.body.prepend(h4);
      }else {
        chrome.storage.sync.set({'currency_type':'EUR'})
        h4.innerHTML = "Your defoult currency is euro"
        document.body.prepend(h4);
      }
  });

    document.querySelector('select[name="currency_select"]').addEventListener('change',get_curency);
},false);
function get_curency(){

  var base_currency = this.value;
  chrome.storage.sync.set({'currency_type':base_currency})
  document.getElementById('show_currency').innerHTML =  "Your current currency is "+base_currency
}
