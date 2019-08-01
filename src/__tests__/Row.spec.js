import React from 'react';
import Row from '../Row';
import Node from '../Node';
import renderer from 'react-test-renderer';
  
const item = {
  id: 1,
  text: 'text',
  rootId: null,
};

const props = {
  style: {
    height: 24,
  },
  onClick: () => {},
  onExpand: () => {},
  index: 0,
};

const rootNode = new Node(item, false);
const leafNode = new Node(item, true);

describe('Root node', () => {
  describe('when closed', () => {
    const component = renderer.create(
      <Row {...props} item={rootNode} />
    );

    let row = component.toJSON();

    it('has "rvtree_node_expand-close" class', () => {
      expect(row).toMatchSnapshot();
    });
  });
  
  describe('when opened', () => {
    rootNode.isOpen = true;

    const component = renderer.create(
      <Row {...props} item={rootNode} />
    );

    let row = component.toJSON();

    it('has "rvtree_node_expand-open" class', () => {
      expect(row).toMatchSnapshot();
    });
  });
});

describe('Leaf node', () => {
  const component = renderer.create(
    <Row {...props} item={leafNode} />
  );

  let row = component.toJSON();

  it('has not expand button', () => {
    expect(row).toMatchSnapshot();
  });
});
