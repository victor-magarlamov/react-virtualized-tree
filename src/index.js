import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import Row from './Row';
import Node from './Node';

import './style.css';

export default class Tree extends Component {
  state = {
    openedNodes: [],
  };

  componentDidMount() {
    const { items } = this.props;

    if (items) {
      Node.setNodes(items);
      this.setState({ openedNodes: Node.nodes.filter(n => n.rootId === null) });
    }
  }

  rowRenderer = ({ index, style }) => {
    const node = this.state.openedNodes[index];

    if (!node) {
      return null;
    }

    return (
      <Row
        key={node.id}
        index={index}
        item={node}
        onClick={this.handleRowClick}
        onExpand={this.handleExpand}
        style={style}
      />
    );
  };

  handleRowClick = node => {
    this.props.onRowClick(node);
  };

  handleExpand = (node, index) => {
    const { openedNodes } = this.state;

    if (node.isOpen) {
      this.collapseNode(node, index, openedNodes);
      node.isOpen = false;
    } else {
      this.expandNode(node, index, openedNodes);
      node.isOpen = true;
    }

    this.setState({ openedNodes });
  };

  expandNode(currentNode, index, nodes) {
    const children = currentNode.children;

    return nodes.splice(
      index + 1,
      0,
      ...children.map(item => {
        item.level = currentNode.level + 1;
        item.isOpen = false;

        return item;
      })
    );
  }

  collapseNode(currentNode, index, nodes) {
    let nextNodeIndex = nodes.length;

    for (let i = index + 1; i < nodes.length; i++) {
      if (nodes[i].level <= currentNode.level) {
        nextNodeIndex = i - 1;
        break;
      }
    }

    return nodes.splice(index + 1, nextNodeIndex - index);
  }

  render() {
    const { width, height, rowHeight } = this.props;
    const { openedNodes } = this.state;

    return (
      <List
        width={width}
        height={height}
        itemSize={rowHeight}
        itemCount={openedNodes.length}
      >
        {this.rowRenderer}
      </List>
    );
  }
}

Tree.defaultProps = {
  width: 500,
  height: 400,
  rowHeight: 25,
  onRowClick: node => {
    return node;
  },
};

Tree.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      rootId: PropTypes.number,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  rowHeight: PropTypes.number,
  onRowClick: PropTypes.func,
};
