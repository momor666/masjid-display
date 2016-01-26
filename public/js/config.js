(function() {

  'use strict';
  
  helpers.asyncConfig().success(function(data) {
    
    // Fill in known information
    $("#org_name").val(data['org_name']);
    $("#location").val(data['location']);
  });

  $(document).ready(function() {
    $("#config").submit(function(e){
      e.preventDefault();
      var formData = {};
      $("#config").find("input[name]").each(function (index, node) {
        formData[node.name] = node.value;
      });
      $.post('/config', formData).done(function(res) {
        if(res.response.status == "OK") {
          helpers.alert('success', 'Configuration updated successfully!');
        } else {
          helpers.alert('danger', 'Error updating configuration.');
        }
      });
    });

    $("#get-location").click(function(e) {
      e.preventDefault();
      populateLocation();
    }); 
  });

  function populateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'address': pos['lat'] + ',' + pos['lng'] }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              $('#location').val(results[0].formatted_address);
            }
          }); 
      }, function() {
        handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
  }
  

  function handleLocationError(browserHasGeolocation) {
    browserHasGeolocation ?
                          alert('Error: The Geolocation service failed.') :
                          alert('Error: Your browser doesn\'t support geolocation.');
  }


})();
