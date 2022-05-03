async function draw() {
  // Data
  const dataset = await d3.json('data.json')

  // Accessor functions
  const xAccessor = (d) => d.currently.humidity
  const yAccessor = (d) => d.currently.apparentTemperature

  // Dimensions
  let dimensions = {
    width: 500,
    height: 500,
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50
    }
  }

  // Set up the svg and containers
  const svg = d3.select('#chart')
    .append('svg')
    .attr('height', dimensions.height)
    .attr('width', dimensions.width)
  
    const ctr = svg
    .append('g')
    .attr('transform',
          `translate(${dimensions.margins.left}, ${dimensions.margins.top})`)

  dimensions.ctrWidth = dimensions.width - dimensions.margins.left - dimensions.margins.right
  dimensions.ctrHeight = dimensions.height - dimensions.margins.top - dimensions.margins.bottom 
  
  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])
    .clamp(true)
    
   const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .clamp(true)

  // Draw the data
  ctr.selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', d => xScale(xAccessor(d)))
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', 5)
    .attr('fill', 'red')
    .attr('stroke', 'grey')
    .attr('stroke-width', 2)
    // .attr('opacity', 50)

  // Axes
}

draw()