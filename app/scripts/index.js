// Setting up jQuery, Underscore and Handlebars
var $ = require("jquery");
var _ = require("underscore");
var handlebars = require("handlebars");
// Search for Magic The Gathering
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=magic+the+gathering&includes=Images,Shop&sort_on=score";

/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
//sets up template for handlebars
var itemProfile = $('#item-profile').html();
var template = handlebars.compile(itemProfile);

var $searchReturn = $(".search-return");

//creates the searched items
fetchJSONP(url, function(data) {
  _.each(data.results, function(items){
    var specifics = {
      picture: items.Images[0].url_170x135,
      itemName: items.title,
      creator: items.Shop.shop_name,
      price: items.price
    };
    $searchReturn.append(template(specifics));
  });

});
