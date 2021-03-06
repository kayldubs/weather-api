var cityList = $("#city-list");
var allCities = [];
var sourceKey = "fc8bffadcdca6a94d021c093eac22797";

//date format from stackOF
function dayFormat(date) {
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();

    var dateOutput = date.getFullYear() + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;
    return dateOutput
}

//trigger search
start();

function start() {
    var storeCities = JSON.parse(localStorage.getItem("allCities"));
    if (storeCities !== null) {
        allCities = storeCities;
    }
    renderCities();
}

function saveCities() {
    localStorage.setItem('allCities', JSON.stringify(allCities));
    console.log(localStorage);
}

function renderCities() {
    cityList.empty();
    //find city by looping through the search API by city
    for (var i=0; i < allCities.length; i++) {
        var city = allCities[i];
        var li = $("<li>").text(city);
        li.attr("id", "listCity");
        li.attr("data", city);
        li.attr("class", "list-group-item");
        console.log(li);
        cityList.prepend(li);
    }
    if (!city) {
        return
    } else {
        getWeather(city)
    };
}

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    if (city === '') {
        return;
    }
    allCities.push(city);
    saveCities();
    renderCities();
});
// start weather search implementation 
function getWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + sourceKey;
    $("#today-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
      // All current day weather table creation to output display
      cityTitle = $("<h3>").text(response.name + " "+ dayFormat());
      $("#today-weather").append(cityTitle);
      var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " ??F");
      $("#today-weather").append(cityTemperature);
      var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#today-weather").append(cityHumidity);
      var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#today-weather").append(cityWindSpeed);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;
    
        //Api for UV index
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ sourceKey+ "&lat=" + CoordLat +"&lon=" + CoordLon;
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseuv) {
            var cityUV = $("<span>").text(responseuv.value);
            var cityUVp = $("<p>").text("UV Index: ");
            cityUVp.append(cityUV);
            $("#today-weather").append(cityUVp);
            console.log(typeof responseuv.value);
            if(responseuv.value > 0 && responseuv.value <=2){
                cityUV.attr()
            }
            else if (responseuv.value > 2 && responseuv.value <= 5){
                cityUV.attr()
            }
            else if (responseuv.value >5 && responseuv.value <= 7){
                cityUV.attr()
            }
            else if (responseuv.value >7 && responseuv.value <= 10){
                cityUV.attr()
            }
            else{
                cityUV.attr()
            }
        });
    
        //Api to get 5-day forecast  
        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + sourceKey;
            $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function(response5day) { 
            $("#boxes").empty();
            console.log(response5day);
            for(var i=0, j=0; j<=5; i=i+6){
                var read_date = response5day.list[i].dt;
                if(response5day.list[i].dt != response5day.list[i+1].dt){
                    var FivedayDiv = $("<div>");
                    FivedayDiv.attr("class","col-3 m-2 bg-primary")
                    var d = new Date(0); 
                    d.setUTCSeconds(read_date);
                    var date = d;
                    console.log(date);
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    var dayOutput = date.getFullYear() + '/' +
                    (month<10 ? '0' : '') + month + '/' +
                    (day<10 ? '0' : '') + day;
                    var Fivedayh4 = $("<h6>").text(dayOutput);

                    var pTemperatureK = response5day.list[i].main.temp;
                    console.log(skyconditions);
                    var TempetureToNum = parseInt((pTemperatureK)* 9/5 - 459);
                    var pTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " ??F");
                    var pHumidity = $("<p>").text("Humidity: "+ response5day.list[i].main.humidity + " %");
                    FivedayDiv.append(Fivedayh4);
                    FivedayDiv.append(imgtag);
                    FivedayDiv.append(pTemperature);
                    FivedayDiv.append(pHumidity);
                    $("#boxes").append(FivedayDiv);
                    console.log(response5day);
                    j++;
                }
            
        }
      
    });
      

    });
    
  }

  //display search results
  $(document).on("click", "#listC", function() {
    var thisCity = $(this).attr("data");
    getWeather(thisCity);
  });
