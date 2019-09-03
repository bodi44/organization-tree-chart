import * as d3 from 'd3';

import { DIMENSIONS } from './constants';

const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', DIMENSIONS.width + 150)
  .attr('height', DIMENSIONS.height + 150);

export const graph = svg.append('g')
  .attr('transform', 'translate(50,50)');

export const stratify = d3.stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

export const tree = d3.tree()
  .size([DIMENSIONS.width, DIMENSIONS.height]);

export const color = d3.scaleOrdinal(d3['schemeCategory10']);
