import React from 'react';
import Node from '../Node';

const item = {
  id: 1,
  text: 'text',
  rootId: null,
};

describe('Node', () => {
  let instance;

  beforeEach(() => {
    instance = new Node(item, false);
  });

  it('has right properties', () => {
    ['id', 'text', 'rootId'].forEach(prop => {
      expect(instance.hasOwnProperty(prop)).toBeTruthy();
    });
  });

  it('has right init value of level property', () => {
    expect(instance.level).toEqual(Node.FIRST_LEVEL);
  });

  it('has right init value of open property', () => {
    expect(instance.isOpen).toBe(false);
  });
});

describe('Leaf', () => {
  const leaf = new Node(item, false);

  beforeEach(() => {
    Node.setNodes([]);
  });

  it('has right value of isLeaf property', () => {
    expect(leaf.isLeaf).toBe(false);
  });

  it('has not any children', () => {
    expect(leaf.children.length).toBe(0);
  });
});

describe('Root', () => {
  const root = new Node(item, true);
  const numberOfChildren = Math.floor(Math.random() * 10 + 1);

  beforeEach(() => {
    const nodes = [];

    for (
      let i = 0, ii = numberOfChildren + 1;
      i < numberOfChildren;
      ++i, ++ii
    ) {
      nodes.push(
        new Node({ id: i + 1, text: 't', rootId: root.id }, true),
        new Node({ id: ii, text: 't', rootId: root.id + 1 }, true)
      );
    }

    Node.setNodes(nodes);
  });

  it('has right value of isLeaf property', () => {
    expect(root.isLeaf).toBe(true);
  });

  it('has children', () => {
    expect(root.children.length).toBe(numberOfChildren);
  });
});

describe('setNodes', () => {
  const items = [
    { id: 1, text: 'node_1', rootId: 2 },
    { id: 2, text: 'node_2', rootId: null },
    { id: 3, text: 'node_3', rootId: 5 },
    { id: 4, text: 'node_4', rootId: 2 },
    { id: 5, text: 'node_5', rootId: null },
  ];

  beforeEach(() => {
    Node.setNodes(items);
  });

  it('has right order', () => {
    expect(Node.nodes.map(n => n.rootId)).toEqual([null, null, 2, 2, 5]);
  });

  it('gets right root nodes array', () => {
    expect(Node.getRootNodes().map(n => n.rootId)).toEqual([null, null]);
  });
});
