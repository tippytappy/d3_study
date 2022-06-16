// DATA ===========================================================================================
async function draw() {
data = await d3.json('https://raw.githubusercontent.com/tippytappy/d3_study/main/sample_data.json')

const xAccessor = (d) => d.value1
const yAccessor = (d) => d.value2

// group the data; this makes one array per group
const sumstat = d3.group(data, d => d.group)

// stack the data; each group will be represented on top on the previous one
const mygroups = ['A', 'B', 'C', 'D']
const mygroup = [1, 2, 3, 4]
const stack_data = d3.stack()
  .keys(mygroup)
  .value(function(d, key) {
    return d[1][key].n
  })
  (sumstat)

// SET UP =========================================================================================
dimensions = {top: 50, bottom: 50, left: 50, right: 50}
width = 600
height = 600
ctr_width = width - dimensions.left - dimensions.right
ctr_height = height - dimensions.top - dimensions.bottom
console.log(ctr_height)

const svg = d3.select('#d3_chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
    .append('g')
    .attr('transform', `translate(${dimensions.left}, ${dimensions.right})`)

// SCALES AND AXES ================================================================================
const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.year))
  .range([0, ctr_width])

svg.append('g')
  .attr('transform', `translate(0, ${ctr_height})`)
  .call(d3.axisBottom(x))

const y = d3.scaleLinear()
  .domain([0, 100])
  .range([ctr_height, 0])

svg.append('g')
  .call(d3.axisLeft(y))

// MARKS ==========================================================================================
const sel = svg.selectAll('circle')
  .data(data)
  .join('circle')
  .attr('cx', d => x(xAccessor(d)))
  .attr('cy', d => y(yAccessor(d)))
  .attr('r', 5)

  console.log(sel)
}

draw()