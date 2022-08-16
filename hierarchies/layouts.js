{
    'type': 'module'
}

export function treemap(){
    // plot area
    const ctr = d3.select('#treemap_div')
      .append('svg')
      .attr('width', dims.width)
      .attr('height', dims.height)
        .append('g')
        .attr('transform', 'translate(5, 5)')

    // add a layout to the root object
    d3.treemap()
      .tile(d3.treemapBinary)
      .size([dims.width, dims.height])
      .padding(2)
      (root)

    const regions = root.children.map(d => d.data.country)
    
    colourScale = d3.scaleOrdinal()
      .domain(regions)
      .range(['red', 'blue', 'orange', 'green', 'pink'])

    // plot the chart
    ctr
      .selectAll('rect')
      .data(root.leaves())
      .join('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('stroke', 'black')
      .style('fill', d => colourScale(d.data.region))

    ctr
      .selectAll('text')
      .data(root.leaves())
      .join('text')
      .attr('x', d => d.x0 + 2)
      .attr('y', d => d.y0 + 10)
      .text(d => d.data.country)
      .attr('font-size', 10)
      .style('font-family', 'sans-serif')
      .attr('fill', 'white')
}

export function circlepack(){
    // plot area
    const ctr = d3.select('#circlepack_div')
      .append('svg')
      .attr('width', dims.width)
      .attr('height', dims.height)
        .append('g')
        .attr('transform', 'translate(5, 5)')

    // add a layout to the root object
    const layout = d3.pack()
      .size([300, 300])
      (root)

    const regions = root.children.map(d => d.data.country)
    //console.log(regions)
    colourScale = d3.scaleOrdinal()
      .domain(regions)
      .range(['red', 'blue', 'orange', 'green', 'pink'])

    // plot the chart
    ctr
      .selectAll('circle')
      .data(root.descendants())
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('stroke', 'black')
      .style('fill', d => colourScale(d.data.region))

}

export function tree(){
    // plot area
    const ctr = d3.select('#tree_div')
      .append('svg')
      .attr('width', dims.width)
      .attr('height', dims.height)
        .append('g')
        .attr('transform', 'translate(10, 10)')

    // add a layout to the root object
    const layout = d3.tree()
      .size([1200, 400])
      (root)

    console.log(layout)
    console.log(root.descendants())
    console.log(root.links())


    // plot the chart
    //links
    ctr.selectAll('line')
      .data(root.links())
      .join('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', 'grey')
      .attr('stroke-width', 3)
    
    // nodes
    ctr.selectAll('circle')
      .data(root.descendants())
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 10)
}