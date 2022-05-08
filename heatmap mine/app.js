async function draw(el, clr) {
// Data
dataset = await d3.json('data.json')

// Dimensions
let dimensions = {
  width: 600,
  height: 150,
  box: 30
}

// Drawing elements
const svg = d3.select(el)
  .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

const ctr = svg.append('g')
  .attr('transpose', 'translate(2, 2)')

// Scales
let colourScale;

if (clr === 'linear') {
  colourScale = d3.scaleLinear()
    .domain(d3.extent(dataset))
    .range(['white', 'red'])
  } else if (clr === 'quantize') {
  colourScale = d3.scaleQuantize()
      .domain(d3.extent(dataset))
      .range(['white', 'pink', 'red'])
  } else if (clr === 'quantile') {
    colourScale = d3.scaleQuantile()
      .domain(dataset)
      .range(['grey', 'pink', 'red'])
  } else if (clr === 'threshold') {
    colourScale = d3.scaleThreshold()
      .domain([50000, 100000])
      .range(['grey', 'pink', 'red'])
  }

// chart
ctr.selectAll('rect')
  .data(dataset)
  .join('rect')
  .attr('x', (d, i) => i % 20 * dimensions.box)
  .attr('y', (d, i) => Math.floor(i/20, 1) * dimensions.box)
  .attr('width', dimensions.box - 3)
  .attr('height', dimensions.box - 3)
  .attr('fill', (d) => colourScale(d))
  .attr('stroke', 'grey')

d3.select('#metric')
  .on('change', function (e) {
    e.preventDefault()
    console.log(this)
})
}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'threshold')