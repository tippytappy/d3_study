async function draw() {
  // Data =========================================================================================
  const dataset = await d3.json('data.json')

  // Accessor functions
  const xAccessor = (d) => d.currently.humidity
  const yAccessor = (d) => d.currently.apparentTemperature
  
  // Set up the svg and containers ================================================================
  let dimensions = {
    width: 800,
    height: 800,
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50
    }
  }

  const svg = d3.select('#chart')
    .append('svg')
    .attr('height', dimensions.height)
    .attr('width', dimensions.width)
  
  const ctr = svg
    .append('g')
    .attr('transform',
          `translate(${dimensions.margins.left}, ${dimensions.margins.top})`)

  const tooltip = d3.select('#tooltip')
  
  dimensions.ctrWidth = dimensions.width - dimensions.margins.left - dimensions.margins.right
  dimensions.ctrHeight = dimensions.height - dimensions.margins.top - dimensions.margins.bottom 
  
  // Scales =======================================================================================
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
    .attr('fill', 'grey')
    .attr('stroke', '#000')
    .attr('stroke-width', 2)
    .on('mousedown', function (event, datum) {
      d3.select(this)
        .attr('r', 10)
        .attr('fill', 'orange')
      
      tooltip.style('display', 'block')
        .style('top', yScale(yAccessor(datum)) - 25 + "px")
        .style('left', xScale(xAccessor(datum)) + "px")

      tooltip.select('.metric-date span')
        // .text(dateAccessor(datum))
        .text(datum.currently.time)

      tooltip.select('.metric-humidity span')
        .text(yAccessor(datum))
      
      tooltip.select('.metric-temperature span')
        .text(xAccessor(datum))
    })
    .on('mouseup', function(event, datum) {
      d3.select(this)
        .attr('r', 5)
        .attr('fill', 'grey')

      tooltip.style('display', 'none')
    })

  // Axes =========================================================================================
  const xAxis = d3.axisBottom(xScale)
    .ticks(5)

  const xAxisGroup = ctr.append('g')
    .call(xAxis)
    .style('transform',
          `translateY(${dimensions.ctrHeight}px)`
          )
  
  const yAxis = d3.axisLeft(yScale)
  
  const yAxisGroup = ctr.append('g')
    .call(yAxis)
    
}

draw()