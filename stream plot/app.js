// DATA ===========================================================================================
async function draw() {
data = await 

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


// MARKS ==========================================================================================


}

draw()