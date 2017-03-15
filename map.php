<!DOCTYPE html>
<html>
  <head><title>Maps Sena</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map-canvas { height: 100% }
    </style>
<link href="style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWa7cRP_muwD__bis82-Scqx-qmLhgV7s&sensor=true">
    </script>
    <script type="text/javascript">
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-6.522973,106.807934),
          zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
  </head>
  <body>
<?php include('header.php') ?>
    <div id="map-canvas"/>
<?php include('footer.php') ?>
  </body>
</html>