// google map customization

function initialize() {
  var mapOptions = {
    // customize zoom
    zoom: n,
    // customize coordinates
    center: new google.maps.LatLng(x,y),
    disableDefaultUI: true
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // customize image
  // var image = "image.source";
  var myLatLng = new google.maps.LatLng(34.87,-111.76);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    // customize image
    // icon: image
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


