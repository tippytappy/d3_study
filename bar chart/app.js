async function draw () {
  // Data
  const dataset = await d3.csv('d3_test_bar.csv')
  
  // Dimensions
  let dimensions = {
    width: 800,
    height: 600,
    border: 50,
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50
    }
  }

  dimensions.ctrWidth = dimensions.width - (dimensions.border * 2)
  dimensions.ctrHeight = dimensions.height - (dimensions.border * 2)

  // Containers
  const svg = d3.select('body')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const marks_ctr = svg
    .append('g')
    .attr('transform', `translate(${dimensions.margins.left}, ${dimensions.margins.top})`)

  // Accessor functions
  const xAccessor = (d) => d.Name
  const yAccessor = (d) => d.yr1
  
  
  //Scales
  const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, dimensions.ctrWidth])
    
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])


  // Draw the marks
  marks_ctr.selectAll('rect')
    .data('dataset')
    .join('rect')
    .attr('height', 50)
    .attr('width', 50)

  // Axes
}

draw()