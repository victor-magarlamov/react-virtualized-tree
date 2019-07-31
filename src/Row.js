import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Row extends Component {
  static V_LINE_CLASS = 'rvtree_node_v-line';

  static H_LINE_CLASS = 'rvtree_node_h-line';

  static EXPAND_CLASS = 'rvtree_node_expand';

  static OPEN_CLASS = 'open';

  static CLOSE_CLASS = 'close';

  get lines() {
    const { height } = this.props.style;
    const { level, id, isLastNode, isLastBranch } = this.props.item;

    let numOfFullLines = level - 2;

    let levels = [];

    if (numOfFullLines > 0) {
      levels = Array.from(new Array(numOfFullLines).keys());
    }

    const vLineStyle = {
      height: `${height}px`,
    };

    const firstVLineStyle = { ...vLineStyle };
    const lastVLineStyle = { ...vLineStyle };
    if (isLastBranch) {
      firstVLineStyle.background = 'none';
    }

    if (isLastNode) {
      lastVLineStyle.height = `${height / 2}px`;
    }

    return (
      <Fragment>
        {level > 1 &&
          <div className={Row.V_LINE_CLASS} style={firstVLineStyle} />
        }

        {levels.map(i => (
          <div
            key={`${id}-${i}`}
            className={Row.V_LINE_CLASS}
            style={vLineStyle}
          />
        ))}

        <div className={Row.V_LINE_CLASS} style={lastVLineStyle} />

        <div className={Row.H_LINE_CLASS} />
      </Fragment>
    );
  }

  get expandButton() {
    const { isLeaf, isOpen } = this.props.item;

    if (isLeaf) {
      return null;
    }

    const state = isOpen ? Row.OPEN_CLASS : Row.CLOSE_CLASS;

    return (
      <div
        className={`${Row.EXPAND_CLASS} ${Row.EXPAND_CLASS}-${state}`}
        onClick={this.handleExpand}
      />
    );
  }

  get label() {
    const { item } = this.props;

    return <div onClick={this.handleClick}>{item.text}</div>;
  }

  handleExpand = () => {
    const { item, index, onExpand } = this.props;

    onExpand(item, index);
  };

  handleClick = () => {
    const { item, onClick } = this.props;

    onClick(item);
  };

  render() {
    const { style } = this.props;

    return (
      <div className="rvtree_node" style={style}>
        {this.lines}
        {this.expandButton}
        {this.label}
      </div>
    );
  }
}

Row.propTypes = {
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    level: PropTypes.number,
    isLeaf: PropTypes.bool,
    isOpen: PropTypes.bool,
    isLastNode: PropTypes.bool,
    isLastBranch: PropTypes.bool,
    isRoot: PropTypes.bool,
  }).isRequired,
};
