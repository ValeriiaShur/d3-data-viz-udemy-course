"use strict";

const width = 100;
const height = 100;
const padding = 2;
const dataset = [5, 10, 15, 20, 25];
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create rectangles
svg
  .selectAll("rect")
  .data(dataset) // pass the dataset
  .enter() // create for each element in the dataset
  .append("rect")
  .attr("x", function (d, i) {
    // d - dataset
    // i - index of the dataset
    return i * (width / dataset.length); // evenly distributes rectangles along the X axis
  })
  // Turn coordinate system (0,0) upside down
  // * 4 simply streches the height out
  .attr("y", function (d) {
    return height - d * 4;
  })
  .attr("width", width / dataset.length - padding) // stretch rectangles width
  // Use data to set the height of the rctangles
  .attr("height", function (d) {
    return d * 4;
  });
