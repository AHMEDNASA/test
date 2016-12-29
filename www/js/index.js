
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        navigator.geolocation.getCurrentPosition(app.onSuccess,app.onError,{timeout:5000, enableAccuracy:false});
    },

    initMap: function(lat,long){
      var options ={
        zoom:8,
        center:new google.maps.LatLang(lat,long),
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map'),options);
      var markerPoint = new google.maps.LatLng(lat,long);
      var marker= new google.maps.Marker({
        position:markerPoint,
        map:map,
        title:"Device Location"
      });
    },

    onSuccess:function(position){
      var coords = position.coords;
      app.initMap(coords.latitude,coords.longitude);
    },

    onFailure: function(error){
      navigator.notification.alert(error.messsage,null);
    }

};

app.initialize();
