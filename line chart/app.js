async function draw() {
// DATA ===================================================================================
const dataset = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
  function(d){
    return {
      date : d3.timeParse("%Y-%m-%d")(d.date), 
      value : +d.value
    }
  }
)

const xAccessor = (d) => d.date
const yAccessor = (d) => d.value

// PLOT AREA SET UP ===============================================================================
const dimensions = {
  width: 500,
  height: 500,
  top: 50,
  bottom: 50,
  left: 50,
  right: 50
}

dimensions.ctr_width = dimensions.width - dimensions.left - dimensions.right
dimensions.ctr_height = dimensions.height - dimensions.top - dimensions.bottom

const svg = d3.select('#d3chart')
  .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
      .append('g')
      .attr('transform', `translate(${dimensions.left}, ${dimensions.top})`)


// SCALES =========================================================================================
const xScale = d3.scaleTime()
  .domain(d3.extent(dataset, xAccessor))
  .range([0, dimensions.ctr_width])

const yScale = d3.scaleLinear()
  .domain(d3.extent(dataset, yAccessor))
  .range([dimensions.ctr_height, 0])

// CHART ==========================================================================================
svg.append('path')
  .datum(dataset)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    )

// AXES ===========================================================================================
svg.append('g')
  .style('transform', `translateY(${dimensions.ctr_height}px)`)
  .call(d3.axisBottom(xScale))

svg.append('g')
.call(d3.axisLeft(yScale))

}

draw()