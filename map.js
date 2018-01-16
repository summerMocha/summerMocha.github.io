
// var mymap = L.map('mapid')
//              .setView([42.360083,-71.058889], 13);

var mondayCircleGroup = L.layerGroup();
var tuesdayCircleGroup = L.layerGroup();
var WednesdayCircleGroup = L.layerGroup();
var ThursdayCircleGroup = L.layerGroup();
var FridayCircleGroup = L.layerGroup();
var SaturdayCircleGroup =L.layerGroup();
var SundayCircleGroup= L.layerGroup();


var overlayMaps = {
    "Monday": mondayCircleGroup,
    "Tuesday": tuesdayCircleGroup,
    "Wednesday": WednesdayCircleGroup,
    "Thursday":ThursdayCircleGroup,
    "Friday":FridayCircleGroup,
    "Saturday": SaturdayCircleGroup,
    "Sunday":SundayCircleGroup
};
var bgMapTile = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2VpdGFuZzAzMjYiLCJhIjoiY2o4ZzN1MWY4MDhndTJxbjZsZmZ6YjZocSJ9.T2rAE5ilNhq3doaqBfqTpw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoid2VpdGFuZzAzMjYiLCJhIjoiY2o4ZzN1MWY4MDhndTJxbjZsZmZ6YjZocSJ9.T2rAE5ilNhq3doaqBfqTpw'
});

var baseMap = {
    "BaseMap": bgMapTile
};

var mymap = L.map('mapid', {
    center: [42.360083,-71.058889],
    zoom: 13,
    layers:[bgMapTile, mondayCircleGroup, tuesdayCircleGroup,WednesdayCircleGroup,ThursdayCircleGroup,FridayCircleGroup,SaturdayCircleGroup,SundayCircleGroup]
});

L.control.layers(baseMap, overlayMaps, {hideSingleBase: true}).addTo(mymap);




var myIcon = L.divIcon({className: 'my-div-icon'});

var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

    d3.csv('towedUpdated.csv', function (data) {
    console.log(data);

    var dayOfWeek =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


     var mondayData = data.filter(function (obj) {
        return obj['DAY_OF_WEEK'] == 'Monday';
     });
    var tuesdayData = data.filter(function (obj) {
        return obj['DAY_OF_WEEK'] == 'Tuesday';
    });

    var WednesdayData = data.filter(function (obj) {
            return obj['DAY_OF_WEEK'] == 'Wednesday';
        });
    var ThursdayData = data.filter(function (obj) {
            return obj['DAY_OF_WEEK'] == 'Thursday';
        });
    var FridayData = data.filter(function (obj) {
            return obj['DAY_OF_WEEK'] == 'Friday';
        });
    var SaturdayData = data.filter(function (obj) {
            return obj['DAY_OF_WEEK'] == 'Saturday';
        });
    var SundayData = data.filter(function (obj) {
            return obj['DAY_OF_WEEK'] == 'Sunday';
        });




        mondayData.forEach(function (d) {
        if(d['Lat']&&d['Long']){
            var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
            mondayCircleGroup.addLayer(circle);

           // {color: 'red'}
            //pass location of array
        }
    });
        tuesdayData.forEach(function (d) {
            if(d['Lat']&&d['Long']){
                var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
                tuesdayCircleGroup.addLayer(circle);
            }
        });

        WednesdayData.forEach(function (d) {
            if(d['Lat']&&d['Long']){
                var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
                WednesdayCircleGroup.addLayer(circle);
            }
        });
        ThursdayData.forEach(function (d) {
            if(d['Lat']&&d['Long']){
                var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
                ThursdayCircleGroup.addLayer(circle);
            }
        });
        FridayData.forEach(function (d) {
            if(d['Lat']&&d['Long']){
                var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
               FridayCircleGroup.addLayer(circle);
            }
        });
        SaturdayData.forEach(function (d) {
            if(d['Lat']&&d['Long']){
                var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
              SaturdayCircleGroup.addLayer(circle);
            }
        });
        SundayData.forEach(function (d) {
            if(d['Lat']&&d['Long']){
                var circle =L.circle([d['Lat'], d['Long']], circleStyle(d['DAY_OF_WEEK']));
                SundayCircleGroup.addLayer(circle);
            }
        });





    });




function circleStyle(style) {
    if(style == 'Monday'){
        return {color: 'red'}
    }
    if(style == 'Tuesday'){
        return {color: 'orange'}
    }
    if(style == 'Thursday'){
        return {color: 'yellow'}
    }
    if(style == 'Wednesday'){
        return {color: 'green'}
    }
    if(style == 'Friday'){
        return {color: 'blue'}
    }
    if(style == 'Sunday'){
        return {color: 'black'}
    }
    if(style == 'Saturday'){
        return {color: 'purple'}
    }
}


