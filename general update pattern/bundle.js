(function (d3) {
  'use strict';

  const colorScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range(['#c11d1d', '#eae600']);

  const radiusScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range([80, 50]);

  const fruitBowl = (selection, props) => {
    const { fruits, height } = props;
    
    const bowl = selection.selectAll('rect')
      .data([null])
      .enter().append('rect')
        .attr('y', 110)
        .attr('width', 920)
        .attr('height', 300)
        .attr('rx', 300 / 2);
    
    const groups = selection.selectAll('g')
      .data(fruits);
    const groupsEnter = groups.enter().append('g');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(${i * 180 + 100},${height / 2})`
        );
    groups.exit().remove();
    
    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', d => radiusScale(d.type))
        .attr('fill', d => colorScale(d.type));
    
    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d.type)
        .attr('y', 120);
  };

  const svg = d3.select('svg');
  let fruits;

  const render = () => {
    fruitBowl(svg, {
      fruits,
      height: +svg.attr('height')
    });
  };

  // Buy 5 apples.
  const makeFruit = type => ({ type });
  fruits = d3.range(5).map(() => makeFruit('apple'));
  render();

  // Eat an apple.
  setTimeout(() => {
    fruits.pop();
    render();
  }, 1000);

  // Replace an apple with a lemon.
  setTimeout(() => {
    fruits[2].type = 'lemon';
    render();
  }, 2000);

  // Eat an apple (second one from the left).
  setTimeout(() => {
    fruits = fruits.filter((d, i) => i !== 1);
    render();
  }, 3000);

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2ZydWl0Qm93bC5qcyIsIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjYWxlT3JkaW5hbCB9IGZyb20gJ2QzJztcblxuY29uc3QgY29sb3JTY2FsZSA9IHNjYWxlT3JkaW5hbCgpXG4gIC5kb21haW4oWydhcHBsZScsICdsZW1vbiddKVxuICAucmFuZ2UoWycjYzExZDFkJywgJyNlYWU2MDAnXSk7XG5cbmNvbnN0IHJhZGl1c1NjYWxlID0gc2NhbGVPcmRpbmFsKClcbiAgLmRvbWFpbihbJ2FwcGxlJywgJ2xlbW9uJ10pXG4gIC5yYW5nZShbODAsIDUwXSk7XG5cbmV4cG9ydCBjb25zdCBmcnVpdEJvd2wgPSAoc2VsZWN0aW9uLCBwcm9wcykgPT4ge1xuICBjb25zdCB7IGZydWl0cywgaGVpZ2h0IH0gPSBwcm9wcztcbiAgXG4gIGNvbnN0IGJvd2wgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCdyZWN0JylcbiAgICAuZGF0YShbbnVsbF0pXG4gICAgLmVudGVyKCkuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd5JywgMTEwKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgOTIwKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIDMwMClcbiAgICAgIC5hdHRyKCdyeCcsIDMwMCAvIDIpO1xuICBcbiAgY29uc3QgZ3JvdXBzID0gc2VsZWN0aW9uLnNlbGVjdEFsbCgnZycpXG4gICAgLmRhdGEoZnJ1aXRzKTtcbiAgY29uc3QgZ3JvdXBzRW50ZXIgPSBncm91cHMuZW50ZXIoKS5hcHBlbmQoJ2cnKTtcbiAgZ3JvdXBzRW50ZXJcbiAgICAubWVyZ2UoZ3JvdXBzKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpKSA9PlxuICAgICAgICBgdHJhbnNsYXRlKCR7aSAqIDE4MCArIDEwMH0sJHtoZWlnaHQgLyAyfSlgXG4gICAgICApO1xuICBncm91cHMuZXhpdCgpLnJlbW92ZSgpO1xuICBcbiAgZ3JvdXBzRW50ZXIuYXBwZW5kKCdjaXJjbGUnKVxuICAgIC5tZXJnZShncm91cHMuc2VsZWN0KCdjaXJjbGUnKSlcbiAgICAgIC5hdHRyKCdyJywgZCA9PiByYWRpdXNTY2FsZShkLnR5cGUpKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IGNvbG9yU2NhbGUoZC50eXBlKSk7XG4gIFxuICBncm91cHNFbnRlci5hcHBlbmQoJ3RleHQnKVxuICAgIC5tZXJnZShncm91cHMuc2VsZWN0KCd0ZXh0JykpXG4gICAgICAudGV4dChkID0+IGQudHlwZSlcbiAgICAgIC5hdHRyKCd5JywgMTIwKTtcbn0iLCJpbXBvcnQgeyBzZWxlY3QsIHJhbmdlIH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgZnJ1aXRCb3dsIH0gZnJvbSAnLi9mcnVpdEJvd2wnO1xuXG5jb25zdCBzdmcgPSBzZWxlY3QoJ3N2ZycpO1xubGV0IGZydWl0cztcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICBmcnVpdEJvd2woc3ZnLCB7XG4gICAgZnJ1aXRzLFxuICAgIGhlaWdodDogK3N2Zy5hdHRyKCdoZWlnaHQnKVxuICB9KTtcbn07XG5cbi8vIEJ1eSA1IGFwcGxlcy5cbmNvbnN0IG1ha2VGcnVpdCA9IHR5cGUgPT4gKHsgdHlwZSB9KTtcbmZydWl0cyA9IHJhbmdlKDUpLm1hcCgoKSA9PiBtYWtlRnJ1aXQoJ2FwcGxlJykpO1xucmVuZGVyKCk7XG5cbi8vIEVhdCBhbiBhcHBsZS5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICBmcnVpdHMucG9wKCk7XG4gIHJlbmRlcigpO1xufSwgMTAwMCk7XG5cbi8vIFJlcGxhY2UgYW4gYXBwbGUgd2l0aCBhIGxlbW9uLlxuc2V0VGltZW91dCgoKSA9PiB7XG4gIGZydWl0c1syXS50eXBlID0gJ2xlbW9uJztcbiAgcmVuZGVyKCk7XG59LCAyMDAwKTtcblxuLy8gRWF0IGFuIGFwcGxlIChzZWNvbmQgb25lIGZyb20gdGhlIGxlZnQpLlxuc2V0VGltZW91dCgoKSA9PiB7XG4gIGZydWl0cyA9IGZydWl0cy5maWx0ZXIoKGQsIGkpID0+IGkgIT09IDEpO1xuICByZW5kZXIoKTtcbn0sIDMwMDApOyJdLCJuYW1lcyI6WyJzY2FsZU9yZGluYWwiLCJzZWxlY3QiLCJyYW5nZSJdLCJtYXBwaW5ncyI6Ijs7O0VBRUEsTUFBTSxVQUFVLEdBQUdBLGVBQVksRUFBRTtLQUM5QixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDMUIsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0VBRWpDLE1BQU0sV0FBVyxHQUFHQSxlQUFZLEVBQUU7S0FDL0IsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzFCLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVuQixFQUFPLE1BQU0sU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssS0FBSztJQUM3QyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQzs7SUFFakMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7T0FDckMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDWixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3BCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7U0FDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRXpCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO09BQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLFdBQVc7T0FDUixLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1VBQ3RCLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QyxDQUFDO0lBQ04sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDOztJQUV2QixXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztPQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7SUFFM0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7T0FDdkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2pCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7OztFQ3BDdEIsTUFBTSxHQUFHLEdBQUdDLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMxQixJQUFJLE1BQU0sQ0FBQzs7RUFFWCxNQUFNLE1BQU0sR0FBRyxNQUFNO0lBQ25CLFNBQVMsQ0FBQyxHQUFHLEVBQUU7TUFDYixNQUFNO01BQ04sTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDNUIsQ0FBQyxDQUFDO0dBQ0osQ0FBQzs7O0VBR0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztFQUNyQyxNQUFNLEdBQUdDLFFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNoRCxNQUFNLEVBQUUsQ0FBQzs7O0VBR1QsVUFBVSxDQUFDLE1BQU07SUFDZixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDYixNQUFNLEVBQUUsQ0FBQztHQUNWLEVBQUUsSUFBSSxDQUFDLENBQUM7OztFQUdULFVBQVUsQ0FBQyxNQUFNO0lBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDekIsTUFBTSxFQUFFLENBQUM7R0FDVixFQUFFLElBQUksQ0FBQyxDQUFDOzs7RUFHVCxVQUFVLENBQUMsTUFBTTtJQUNmLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsTUFBTSxFQUFFLENBQUM7R0FDVixFQUFFLElBQUksQ0FBQzs7OzsifQ==