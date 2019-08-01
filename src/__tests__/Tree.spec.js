import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import Tree from '../.';

const items = [
  {id: 1, text: 'node_1', rootId: null},
  {id: 2, text: 'node_11', rootId: 1},
  {id: 3, text: 'node_12', rootId: 1},
  {id: 4, text: 'node_13', rootId: 1},
  {id: 5, text: 'node_2', rootId: null},
  {id: 6, text: 'node_21', rootId: 5},
  {id: 7, text: 'node_22', rootId: 5},
  {id: 8, text: 'node_221', rootId: 7},
];

const props = {
  items
};

describe('Tree Component', () => {
  let rendered;
  
  beforeEach(() => {
    rendered = ReactTestUtils.renderIntoDocument(<Tree {...props} />);
  });

  it('has right root nodes number', () => {
    const nodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      rendered,
      'rvtree_node'
    );
    expect(nodes.length).toBe(2);
  });
  
  it('has only closed nodes', () => {
    const nodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      rendered,
      'rvtree_node_expand-open'
    );
    expect(nodes.length).toBe(0);
  });
  
  describe('when expand', () => {
    beforeEach(() => {
      const nodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        rendered,
        'rvtree_node_expand-close'
      );

      ReactTestUtils.Simulate.click(nodes[0]);
    });

    it('shows children rows', () => {
      const nodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        rendered,
        'rvtree_node'
      );

      expect(nodes.length).toBe(5);
    });
  });
  
  describe('when collapsed', () => {
    beforeEach(() => {
      const nodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        rendered,
        'rvtree_node_expand-close'
      );

      ReactTestUtils.Simulate.click(nodes[0]);

      const opened = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        rendered,
        'rvtree_node_expand-open'
      );
      
      ReactTestUtils.Simulate.click(opened[0]);
    });

    it('hides children rows', () => {
      const nodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        rendered,
        'rvtree_node'
      );

      expect(nodes.length).toBe(2);
    });
  });
});
