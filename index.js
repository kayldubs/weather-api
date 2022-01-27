var cityList = $('#city-list');
var allCities = [];
var sourceKey = "fc8bffadcdca6a94d021c093eac22797";

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