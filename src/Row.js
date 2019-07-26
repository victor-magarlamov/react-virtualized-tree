import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Row extends Component {
  static ROW_CLASS = 'rvtree_node';

  static V_LINE_CLASS = 'rvtree_node_v-line';

  static H_LINE_CLASS = 'rvtree_node_h-line';

  static EXPAND_CLASS = 'rvtree_node_expand';

  static OPEN_CLASS = 'open';

  static CLOSE_CLASS = 'close';

  get lines() {
    const { height } = this.props.style;
    const { level, id } = this.props.item;
    const levels = Array.from(new Array(level).keys());

    const style = {
      height: `${height}px`,
    };

    return (
      <Fragment>
        {levels.map(i => (
          <div key={`${id}-${i}`} className={Row.V_LINE_CLASS} style={style} />
        ))}

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
      <div className={Row.ROW_CLASS} style={style}>
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
    rootId: PropTypes.number,
    isLeaf: PropTypes.bool,
    level: PropTypes.number,
    isOpen: PropTypes.bool,
  }).isRequired,
};
