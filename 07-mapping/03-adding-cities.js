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

//Create SVG element
var svg = d3.select("body").append("svg").attr({ width: w, height: h });

//Load in GeoJSON data
d3.json("us.json", function (json) {
  //Bind data and create one path per GeoJSON feature
  svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#666666");

  //Load in cities data
  d3.csv("sales-by-city.csv", function (data) {
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        //console.log([d.lon, d.lat][0]);
        if ([d.lon, d.lat][0] !== "#N/A") {
          return projection([d.lon, d.lat])[0];
        }
      })
      .attr("cy", function (d) {
        if ([d.lon, d.lat][1] !== "#N/A") {
          return projection([d.lon, d.lat])[1];
        }
      })
      .attr("r", function (d) {
        return Math.sqrt(parseInt(d.sales) * 0.00005);
      })
      .style("fill", "blue");
  });
});
