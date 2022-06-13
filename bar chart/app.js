// DATA ===========================================================================================
async function draw() {
  data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
    function(d) {
      return {
        Country: d.Country,
        Value: +d.Value
      }
    })
  console.log(data)

  xAccessor = d => d.Country
  yAccessor = d => d.Value
  
  // SET UP =========================================================================================
  dimensions = {top: 50, bottom: 50, left: 50, right: 50}
  width = 600
  height = 600
  ctr_width = width - dimensions.left - dimensions.right
  ctr_height = height - dimensions.top - dimensions.bottom
  
  const svg = d3.select('#d3chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
      .append('g')
      .attr('transform', `translate(${dimensions.left}, ${dimensions.right})`)
  
  // SCALES AND AXES ================================================================================
  const x = d3.scaleBand()
    .domain(data.map(xAccessor))
    .range([0, ctr_width])
    .padding(0.1)
  
  svg.append('g')
    .attr('transform', `translate(0, ${ctr_height})`)
    .call(d3.axisBottom(x))

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, yAccessor)])
    .range([ctr_height, 0])
console.log(d3.max(data, yAccessor))
  svg.append('g')
    .call(d3.axisLeft(y))
  
  // MARKS ==========================================================================================
  svg.selectAll('mybar')
    .data(data)
    .join('rect')
      .attr('x', d => x(d.Country))
      .attr('y', d => y(d.Value))
      .attr('height', d => ctr_height - y(d.Value))
      .attr('width', x.bandwidth())
      .attr('fill', 'pink')

  }
  
  draw()