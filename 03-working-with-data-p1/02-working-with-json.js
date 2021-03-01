"use strict";

const height = 100;
const width = 400;

// Function to show header
function showHeader(ds) {
  d3.select("body")
    .append("h1")
    .text(ds.category + " Sales (2013)");
}

// Function to draw a line
function buildLine(ds) {
  var lineFun = d3.svg
    .line()
    .x(function (d) {
      return (d.month - 20130001) / 3.25;
    })
    .y(function (d) {
      return height - d.sales;
    })
    .interpolate("basis");

  var svg = d3
    .select("body")
    .append("svg")
    .attr({ width: width, height: height });

  var viz = svg.append("path").attr({
    d: lineFun(ds.monthlySales),
    stroke: "purple",
    "stroke-width": 2,
    fill: "none",
  });
}

// Method that pulls csv data and parse it
// into a CSV dictionary or object
d3.json("MonthlySalesbyCategoryMultiple.json", function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }

  data.contents.forEach(function (ds) {
    showHeader(ds); // give a title to the chart
    buildLine(ds); // draw the line
  });
});
