///////////////////////////////////////////////////////////////////////////////////////////////////
// Google map customization
///////////////////////////////////////////////////////////////////////////////////////////////////

(function() {
  if (document.querySelector(".map")) {
    function initialize() {
      var mapOptions = {
        // customize zoom
        zoom: n,
        // customize coordinates
        center: new google.maps.LatLng(x,y),
        disableDefaultUI: true,
        // disable scrollwheel
        scrollwheel: false
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // customize image
      var image = "image.source";
      // customize coordinates
      var myLatLng = new google.maps.LatLng(x,y);
      var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        // customize image
        // icon: image
      });
    }

    google.maps.event.addDomListener(window, "load", initialize);
  }
})();
