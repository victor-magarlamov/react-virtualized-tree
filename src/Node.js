export default class Node {
  static nodes = [];
  static FIRST_LEVEL = 1;

  item = null;

  isLeaf = false;

  open = false;

  level = Node.FIRST_LEVEL;

  constructor(item, isLeaf) {
    this.item = item;
    this.isLeaf = isLeaf;

    ['id', 'text', 'rootId'].forEach(prop => {
      Object.defineProperty(this, prop, {
        get: () => this.item[prop],
      });
    });
  }

  get children() {
    return Node.nodes.filter(item => item.rootId === this.id);
  }

  get isOpen() {
    return this.open;
  }

  set isOpen(value) {
    this.open = value;
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
      if (Node.nodes[index].rootId !== null) {
        break;
      }

      rootNodes.push(Node.nodes[index++]);
    }

    return rootNodes;
  }
}
