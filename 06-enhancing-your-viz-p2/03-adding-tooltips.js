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
  })
  .on("mouseover", function (d) {
    svg
      .append("text")
      .text(d)
      .attr("text-anchor", "middle")
      .attr(
        "x",
        parseFloat(d3.select(this).attr("x")) +
          parseFloat(d3.select(this).attr("width") / 2)
      )

      .attr("y", parseFloat(d3.select(this).attr("y") - 2))
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("fill", "#000000")
      .attr("id", "tooltip");
  })
  .on("mouseout", function () {
    d3.select("#tooltip").remove();
  });
/* .append("title") // add html element
  .text(function (d) {
    return d;
  }) */

// Labels
/*  */
