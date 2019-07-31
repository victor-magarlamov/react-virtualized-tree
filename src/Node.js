export default class Node {
  static nodes = [];
  static FIRST_LEVEL = 1;

  _children = null;

  _leaf = false;

  _lastNode = false;

  _lastBranch = false;

  _open = false;

  _level = Node.FIRST_LEVEL;

  constructor(item, isLeaf) {
    this.isLeaf = isLeaf;

    ['id', 'text', 'rootId'].forEach(prop => {
      Object.defineProperty(this, prop, {
        get: () => item[prop],
      });
    });
  }

  get children() {
    if (!this._children) {
      this.collectChildren();
    }

    return this._children;
  }

  get level() {
    return this._level;
  }

  get isOpen() {
    return this._open;
  }

  get isLeaf() {
    return this._leaf;
  }

  get isLastNode() {
    return this._lastNode;
  }

  get isLastBranch() {
    return this._lastBranch;
  }

  get isRoot() {
    return this.rootId === null;
  }

  set level(value) {
    this._level = value;
  }

  set isOpen(value) {
    this._open = value;
  }

  set isLeaf(value) {
    this._leaf = value;
  }

  set isLastNode(value) {
    this._lastNode = value;
  }

  set isLastBranch(value) {
    this._lastBranch = value;
  }

  collectChildren() {
    this._children = [];
    let index;

    let lo = 0;
    let hi = Node.nodes.length - 1;

    while (lo <= hi) {
      let mid = Math.round(lo + (hi - lo) / 2);
      const rootId = Node.nodes[mid].rootId;

      if (rootId === null || this.id > rootId) {
        lo = mid + 1;
      } else if (this.id < rootId) {
        hi = mid - 1;
      } else {
        index = mid;
        break;
      }
    }

    if (index) {
      while (
        Node.nodes[index - 1] &&
        Node.nodes[index - 1].rootId === this.id
      ) {
        index -= 1;
      }

      while (Node.nodes[index] && Node.nodes[index].rootId === this.id) {
        this._children.push(Node.nodes[index++]);
      }

      this._children[this._children.length - 1].isLastNode = true;
    }
  }

  static setNodes(items) {
    Node.nodes = items
      .sort((i1, i2) => i1.rootId - i2.rootId)
      .map(item => {
        const isLeaf = items.some(i => i.rootId === item.id) === false;

        return new Node(item, isLeaf);
      });
  }

  static getRootNodes() {
    const rootNodes = [];
    let index = 0;

    while (index < Node.nodes.length) {
      if (!Node.nodes[index].isRoot) {
        break;
      }

      rootNodes.push(Node.nodes[index++]);
    }

    rootNodes[rootNodes.length - 1].isLastNode = true;

    return rootNodes;
  }
}
