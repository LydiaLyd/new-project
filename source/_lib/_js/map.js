(function() {
  if (!document.querySelector(".map")) {
    return;
  }

  function initialize() {
    var coordinates = new google.maps.LatLng(latitude,longitude);
    var options = {
      center: coordinates,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById("map"), options);

    // var image = "img/icon_map-marker.png";
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      // icon: image,
      animation: google.maps.Animation.BOUNCE
    });

    google.maps.event.addListener(map, "center_changed", function() {
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 3000);
    });
  }

  google.maps.event.addDomListener(window, "load", initialize);
})();
