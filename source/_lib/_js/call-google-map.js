/**
 * Google map
 *
 * html: .map#map
 * <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8CKWprvquDtLkwJSlppUgO9R4ndPa6iA"></script>
 */

 (function() {
   if (!document.querySelector(".map")) {
     return;
   }

   function initMap() {
     // див, в котором будет жить карта
     var mapElem = document.getElementById("map");

     // координаты
     var coords = new google.maps.LatLng(-35.7642221, 150.1074482);

     // параметры для карты
     var options = {
       center: coords,
       zoom: 10,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       disableDefaultUI: true,
       // scrollwheel: false
     };

     // изображение для маркера
     // var image = "img/icon_map-marker.png";

     // создание карты
     var map = new google.maps.Map(mapElem, options);

     // создание маркера и размещение на карте
     var marker = new google.maps.Marker({
       position: coords,
       map: map,
       // icon: image,
       // animation: google.maps.Animation.BOUNCE
       // animation: google.maps.Animation.DROP,
     });

     // центровка карты при смещении
     // google.maps.event.addListener(map, "center_changed", function() {
     //   window.setTimeout(function() {
     //     map.panTo(marker.getPosition());
     //   }, 1000);
     // });
   }

   // инициализиация карты
   google.maps.event.addDomListener(window, "load", initMap);
 })();
