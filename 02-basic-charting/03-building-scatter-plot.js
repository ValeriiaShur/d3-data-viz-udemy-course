"use strict";

const height = 400;
const width = 400;

const monthlySales = [
  { month: 10, sales: 200 },
  { month: 20, sales: 140 },
  { month: 30, sales: 250 },
  { month: 45, sales: 300 },
  { month: 56, sales: 107 },
  { month: 61, sales: 22 },
  { month: 65, sales: 90 },
  { month: 77, sales: 60 },
  { month: 100, sales: 100 },
];

// Function for KPI color
function salesKPI(d) {
  if (d >= 15) {
    return "#33CC666";
  } else if (d < 250) {
    return "#666666";
  }
}

// Function to show min and max and hife the rest
// ds - dataset, col - column in the array,
// val - value, type - type of the label
function showMinMax(ds, col, val, type) {
  const max = d3.max(ds, function (d) {
    return d[col];
  });
  const min = d3.min(ds, function (d) {
    return d[col];
  });

  if (type == "minmax" && (val == max || val == min)) {
    return val;
  } else {
    if (type == "all") {
      return val;
    }
  }
}

// Create SVG
const svg = d3
  .select("body")
  .append("svg")
  .attr({ width: width, height: height });

// Add dots
const dots = svg
  .selectAll("circle")
  .data(monthlySales)
  .enter()
  .append("circle")
  .attr({
    cx: function (d) {
      return d.month * 3;
    },
    cy: function (d) {
      return height - d.sales;
    },
    r: 5,
  })
  .attr("fill", function (d) {
    return salesKPI(d.sales);
  });

// Labels
const labels = svg
  .selectAll("text")
  .data(monthlySales)
  .enter()
  .append("text")
  .text(function (d) {
    return showMinMax(monthlySales, "sales", d.sales, "minmax");
  })
  .attr({
    x: function (d) {
      return d.month * 3 - 25;
    },
    y: function (d) {
      return height - d.sales;
    },
  })
  .attr("font-size", 12)
  .attr("font-family", "sans-serif")
  .attr("fill", "#666666")
  .attr("text-anchor", "start");
