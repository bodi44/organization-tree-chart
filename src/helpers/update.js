import * as d3 from 'd3';
import { db } from '../firebaseConfig';
import { color, graph, stratify, tree } from '../graph';

const update = data => {
  //remove nodes
  graph.selectAll('.node').remove();
  graph.selectAll('.link').remove();

  //update ordinal scale
  color.domain(data.map(item => item.department));

  //get updated root node
  const rootNode = stratify(data);
  const treeData = tree(rootNode);

  const nodes = graph.selectAll('.node').data(treeData.descendants());

  //get link selection
  const links = graph.selectAll('.link').data(treeData.links());
  //enter new links
  links.enter()
    .append('path')
    .transition().duration(300)
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#555555')
    .attr('stroke-width', 2)
    .attr('d', d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y),
    );

  const enterNodes = nodes.enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

  //append rects to enter nodes
  enterNodes.append('rect')
    .attr('fill', d => color(d.data.department))
    .attr('stroke', '#555555')
    .attr('stroke-width', 2)
    .attr('height', 50)
    .attr('width', d => d.data.name.length * 20)
    .attr('transform', d => {
      let x = d.data.name.length * 10;
      return `translate(${-x},-30)`;
    });

  //append text
  enterNodes.append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', '#000000')
    .attr('font-weight', 500)
    .text(d => d.data.name);


  graph.selectAll('.node').on('click', data => {
    if (data.children) {
      data.children.forEach(child => db.collection('employees').doc(child.data.id).delete());
      db.collection('employees').doc(data.data.id).delete();
    } else {
      db.collection('employees').doc(data.data.id).delete();
    }
  });
};

export default update;
