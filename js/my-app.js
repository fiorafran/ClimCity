  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
console.log('fran')

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var latitud, longitud, data, url;
var Api = 'd6642b200e3e8a54a5684c8a964d5c42';

$$(document).on('deviceready', function() {

    console.log("Device is ready!");
});

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  console.log('index');
	$$('#darkMode').on('change', function(){
	  
		if (this.checked) {
			$$('html').addClass('theme-dark');
		} else {
		    $$('html').removeClass('theme-dark');
		}

	});

  onSuccess = function(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    url='https://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&appid='+Api+'&lang=sp';
    console.log(url);
    app.request.json(url, (dt)=> {
      data = dt;

      city = data.name;
      imgn = data.weather[0].icon;
      desc = data.weather[0].description;
      humedad = data.main.humidity;
      vis = (data.visibility/1000);
      viento = data.wind.speed;
      temp = parseInt((data.main.temp-273.15));
      sensa = parseInt((data.main.feels_like-273.15));
      tempMin =parseInt((data.main.temp_min-273.15));
      tempMax =parseInt((data.main.temp_max-273.15));

      $$('#ubicacion').html(city);
      $$('#sensacion').html(sensa+'°C');
      $$('#humedad').html(humedad+'%');
      $$('#visibilidad').html(vis+' km');
      $$('#vientos').html(viento+' m/s')
      $$('#temperatura').html(temp+'°C');
      $$('#MinT').html(tempMin+'°C');
      $$('#MaxT').html(tempMax+'°C');
      $$('#descripcion').html(desc);
      $$('#imgID').attr('src','http://openweathermap.org/img/wn/'+imgn+'@2x.png');

    });
  };
 
  function onError(error) {
     alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
})