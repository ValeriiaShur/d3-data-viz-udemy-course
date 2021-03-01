"use strict";
//Width and height
var w = 500;
var h = 300;

//Define map projection
var projection = d3.geo
  .albersUsa()
  .translate([w / 2, h / 2])
  .scale([500]);

//Define path generator
var path = d3.geo.path().projection(projection);

//Define quantize scale to sort data values into buckets of color
var color = d3.scale
  .linear()
  .range(["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#2ca25f", "#006d2c"]);

//Create SVG element
var svg = d3.select("body").append("svg").attr({ width: w, height: h });

//Load in Sales Data
d3.csv("state-sales.csv", function (data) {
  //Set input domain for color scale
  color.domain([
    // d3.min(data, function(d) { return d.sales; }),
    0,
    d3.max(data, function (d) {
      return d.sales;
    }),
  ]);

  //Load in GeoJSON data
  d3.json("us.json", function (json) {
    //Merge the ag. data and GeoJSON
    //Loop through once for each ag. data value
    for (var i = 0; i < data.length; i++) {
      //Grab state name
      var dataState = data[i].state;

      //Grab data value, and convert from string to float
      var dataValue = parseFloat(data[i].sales);

      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        // console.log(json.features[j].properties.NAME);

        var jsonState = json.features[j].properties.NAME;
        // console.log(jsonState + "=" + dataState);

        if (dataState == jsonState) {
          //Copy the data value into the JSON
          json.features[j].properties.value = dataValue;

          //Stop looking through the JSON
          break;
        }
      }
    }

    //Bind data and create one path per GeoJSON feature
    svg
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function (d) {
        var value = d.properties.value;

        if (value) {
          return color(value);
        } else {
          return "#ccc";
        }
      });
  });
});
