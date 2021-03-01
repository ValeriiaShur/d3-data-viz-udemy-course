"use strict";

const height = 100;
const width = 400;
const padding = 20;

// Function to show header
function showHeader(ds) {
  d3.select("body")
    .append("h1")
    .text(ds.category + " Sales (2013)");
}

// Function to get dates
function getDate(d) {
  //20130101
  const strDate = new String(d);
  const year = strDate.substr(0, 4);
  const month = strDate.substr(4, 2) - 1; //zero based index
  const day = strDate.substr(6, 2);

  return new Date(year, month, day);
}

// Function to draw a line
function buildLine(ds) {
  //console.log(
  //  "xscale-max: " +
  //    d3.max(ds.monthlySales, function (d) {
  //      return d.month;
  //    })
  //);
  //console.log(
  //  "yscale-max: " +
  //    d3.max(ds.monthlySales, function (d) {
  //      return d.sales;
  //    })
  //);

  // Get min and max dates
  const minDate = getDate(ds.monthlySales[0]["month"]);
  const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]["month"]);

  console.log(minDate, maxDate);

  //scales
  const xScale = d3.time
    .scale()
    .domain([minDate, maxDate])
    .range([padding + 5, width - padding]);

  const yScale = d3.scale
    .linear()
    .domain([
      0,
      d3.max(ds.monthlySales, function (d) {
        return d.sales;
      }),
    ])
    .range([height - padding, 10])
    .nice();

  const xAxisLine = d3.svg
    .axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));
  const yAxisLine = d3.svg.axis().scale(yScale).orient("left").ticks(4);

  const lineFun = d3.svg
    .line()
    .x(function (d) {
      return xScale(getDate(d.month));
    })
    .y(function (d) {
      return yScale(d.sales);
    })
    .interpolate("basis");

  const svg = d3
    .select("body")
    .append("svg")
    .attr({ width: width, height: height });

  const xAxis = svg
    .append("g")
    .call(xAxisLine)
    .attr("class", "axis")
    .attr("transform", "translate(0, " + (height - padding) + ")");

  const yAxis = svg
    .append("g")
    .call(yAxisLine)
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ", 0)");

  const viz = svg.append("path").attr({
    d: lineFun(ds.monthlySales),
    stroke: "purple",
    "stroke-width": 2,
    fill: "none",
  });
}

// Method that pulls csv data and parse it
// into a CSV dictionary or object
d3.json(
  "https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json",
  function (error, data) {
    if (error) {
      console.log(error);
    } else {
      //console.log(data);
    }

    // Decode the data
    const decodedData = JSON.parse(window.atob(data.content));

    //console.log(decodedData.contents);

    decodedData.contents.forEach(function (ds) {
      showHeader(ds); // give a title to the chart
      buildLine(ds); // draw the line
    });
  }
);
