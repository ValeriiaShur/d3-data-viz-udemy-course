"use strict";

const height = 200;
const width = 300;

const monthlySales = [
  { month: 10, sales: 20 },
  { month: 20, sales: 14 },
  { month: 30, sales: 25 },
  { month: 45, sales: 30 },
  { month: 56, sales: 7 },
  { month: 61, sales: 22 },
  { month: 65, sales: 9 },
  { month: 77, sales: 6 },
  { month: 100, sales: 10 },
];

// Function creating lines
const lineFunction = d3.svg
  .line()
  .x(function (d) {
    return d.month * 3;
  })
  .y(function (d) {
    return height - d.sales;
  })
  .interpolate("basis");

const svg = d3
  .select("body")
  .append("svg")
  .attr({ width: width, height: height });

// Create a path using the function for creating lines
const viz = svg.append("path").attr({
  d: lineFunction(monthlySales),
  stroke: "purple",
  "stroke-width": 2,
  fill: "none",
});

// Labels
const labels = svg
  .selectAll("text")
  .data(monthlySales)
  .enter()
  .append("text")
  .text(function (d) {
    return d.sales;
  })
  .attr({
    x: function (d) {
      return d.month * 3;
    },
    y: function (d) {
      return height - d.sales;
    },
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "#666666")
  .attr("text-anchor", "middle")
  .attr("dy", "-5px")
  // Make the first and last elements bold
  .attr("font-weight", function (d, i) {
    if (i === 0 || i == monthlySales.length - 1) {
      return "bold";
    } else {
      return "normal";
    }
  });
