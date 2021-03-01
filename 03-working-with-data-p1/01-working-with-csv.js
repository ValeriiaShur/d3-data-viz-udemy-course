"use strict";

const height = 100;
const width = 400;
var ds; // global variable for data
let salesTotal = 0.0;
let salesAvg = 0.0;
let metrics = [];

// Function to draw a line
function buildLine() {
  var lineFun = d3.svg
    .line()
    .x(function (d) {
      return (d.month - 20130001) / 3.25;
    })
    .y(function (d) {
      return height - d.sales;
    })
    .interpolate("linear");

  var svg = d3
    .select("body")
    .append("svg")
    .attr({ width: width, height: height });

  var viz = svg.append("path").attr({
    d: lineFun(ds),
    stroke: "purple",
    "stroke-width": 2,
    fill: "none",
  });
}

// Function to show totals
function showTotals() {
  const t = d3.select("body").append("table");

  // Get total value
  for (let i = 0; i < ds.length; i++) {
    salesTotal += ds[i]["sales"] * 1; // convert to a number
  }

  // Get average
  salesAvg = salesTotal / ds.length;

  // Add metrics to array
  metrics.push("Sales Total:" + salesTotal);
  metrics.push("Sales Average: " + salesAvg);

  // Add total to table
  const tr = t
    .selectAll("tr")
    .data(metrics)
    .enter()
    .append("tr")
    .append("td")
    .text(function (d) {
      return d;
    });
}

// Method that pulls csv data and parse it
// into a CSV dictionary or object
d3.csv("MonthlySales.csv", function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    ds = data;
  }

  buildLine();
  showTotals();
});
