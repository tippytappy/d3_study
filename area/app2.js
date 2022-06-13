// DATA ===========================================================================================
async function draw() {
data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
d => {
  return {
    date: d3.timeParse('%Y-%m-%d')(d.date),
    value: d.value
  }
})

// SET UP =========================================================================================
dimensions = {top: 50, bottom: 50, left: 50, right: 50}
width = 600
height = 600
ctr_width = width - dimensions.left - dimensions.right
ctr_height = height - dimensions.top - dimensions.bottom
console.log(ctr_height)

const svg = d3.select('#my_dataviz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
    .append('g')
    .attr('transform', `translate(${dimensions.left}, ${dimensions.right})`)

// SCALES AND AXES ================================================================================
const x = d3.scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([0, ctr_width])
svg.append('g')
  .attr('transform', `translate(0, ${ctr_height})`)
  .call(d3.axisBottom(x))

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => +d.value)])
  .range([ctr_height, 0])

svg.append('g')
  .call(d3.axisLeft(y))

// MARKS ==========================================================================================
svg.append('path')
  .datum(data)
  .attr('fill', 'pink')
  .attr('stroke', 'blue')
  .attr('stroke-width', 1)
  .attr('d', d3.area()
    .x(d => x(d.date))
    .y0(y(0))
    .y1(d => y(d.value))
  )

} // end of the draw function

draw()