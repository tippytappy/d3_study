// DATA ===========================================================================================
function draw() {
  // for this chart we'll just make the data here
  var data = []
    for(var i = 0; i < 100; i++) {
      data[i] = {}
      data[i].ival = i
      data[i].yval = Math.random()
      data[i].zval = Math.random() * 5
    }

    console.log(data)

  const xAccessor = d => d.ival
  const yAccessor = d => d.yval

// SET UP =========================================================================================
  dimensions = {top: 50, bottom: 50, left: 50, right: 50}
  width = 600
  height = 600
  inner_radius = width / 5
  outer_radius = width / 2
 
  ctr_width = width - dimensions.left - dimensions.right
  ctr_height = height - dimensions.top - dimensions.bottom

  const svg = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
      .append('g')
      .attr('transform', `translate(${dimensions.left}, ${dimensions.right})`)

// SCALES AND AXES ================================================================================
  const x = d3.scaleLinear()
      .domain(data, xAccessor)
      .range(0, 2 * Math.PI)

  const y = d3.scaleLinear()
    .domain(data, yAccessor)
    .range(inner_radius, outer_radius)

  const area = d3.areaRadial()
  .curve(d3.curveLinearClosed)
  .angle(d => x(d.ival))

// MARKS ==========================================================================================
  svg.append("path")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .attr("d", area
      .innerRadius(d => y(d.yval))
      .outerRadius(d => y(d.zval))
    (data))

}

draw()