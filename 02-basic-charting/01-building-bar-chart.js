"use strict";

const width = 300;
const height = 200;
const padding = 2;
const dataset = [40, 10, 15, 20, 25, 11, 21];
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Set color according to the element value
function colorPicker(v) {
  if (v <= 20) {
    return "#666666";
  } else if (v > 20) {
    return "#FF0033";
  }
}

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return i * (width / dataset.length);
  })
  .attr("y", function (d) {
    return height - d * 4;
  })
  .attr("width", width / dataset.length - padding)
  .attr("height", function (d) {
    return d * 4;
  })
  .attr("fill", function (d) {
    //return "rgb(0," + d * 10 + ", 0)";
    return colorPicker(d);
  });

// Labels
svg
  .selectAll("text")
  .data("dataset")
  .enter()
  .append("text")
  .text(function (d, i) {
    //console.log(dataset[i]);
    return dataset[i];
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return (
      i * (width / dataset.length) + (width / dataset.length - padding) / 2
    );
  })
  .attr("y", function (d, i) {
    return height - dataset[i] * 4.2;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", 12)
  .attr("fill", "#000000");
