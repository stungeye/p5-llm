import VsConnection from "./vs-connection";
import VsNodeTypes from "./vs-node-types";
export default class VsConnectionManager {
  constructor() {
    this.connections = [];
    this.nodes = new Set();
  }

  connectionIsValid(outputPin, inputPin) {
    return (
      outputPin.getType() === inputPin.getType() &&
      outputPin.getNode() !== inputPin.getNode()
    );
  }

  addConnection(outputPin, inputPin) {
    if (outputPin.getType() !== inputPin.getType()) {
      console.log("Connection failed: Type mismatch");
      return;
    }

    // Remove existing connections for the input pin
    // Outputs can be connected to multiple inputs
    // but inputs can only have one connection.
    this.connections = this.connections.filter(
      (conn) => conn.inputPin !== inputPin
    );

    // Add new connection
    console.log("Adding connection");
    const connection = new VsConnection(outputPin, inputPin);
    this.connections.push(connection);

    // Track nodes for topological sorting
    this.nodes.add(outputPin.getNode());
    this.nodes.add(inputPin.getNode());
  }

  removeConnection(outputPin, inputPin) {
    this.connections = this.connections.filter(
      (conn) => conn.outputPin !== outputPin || conn.inputPin !== inputPin
    );
  }

  buildDependencyGraph() {
    const graph = new Map();
    this.nodes.forEach((node) => graph.set(node, []));
    this.connections.forEach((conn) => {
      graph.get(conn.outputPin.getNode()).push(conn.inputPin.getNode());
    });
    return graph;
  }

  topologicalSort() {
    const graph = this.buildDependencyGraph();
    const inDegree = new Map();
    const zeroInDegreeQueue = [];
    const sortedNodes = [];

    graph.forEach((_, node) => inDegree.set(node, 0));
    this.connections.forEach((conn) =>
      inDegree.set(
        conn.inputPin.getNode(),
        inDegree.get(conn.inputPin.getNode()) + 1
      )
    );

    inDegree.forEach((degree, node) => {
      if (degree === 0) zeroInDegreeQueue.push(node);
    });

    while (zeroInDegreeQueue.length > 0) {
      const node = zeroInDegreeQueue.shift();
      sortedNodes.push(node);

      graph.get(node).forEach((neighbor) => {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) zeroInDegreeQueue.push(neighbor);
      });
    }

    if (sortedNodes.length !== this.nodes.size) {
      throw new Error("Cyclic dependency detected in the graph");
    }

    return sortedNodes;
  }

  execute() {
    const sortedNodes = this.topologicalSort();
    sortedNodes.forEach((node) => {
      if (node.type === VsNodeTypes.Function) {
        node.execute();
      }
      this.connections
        .filter((conn) => conn.outputPin.getNode() === node)
        .forEach((conn) => {
          conn.propagate();
          console.log(
            `After executing node ${
              node.id
            }, propagated value: ${conn.inputPin.getValue()}`
          );
        });
    });
  }

  // Draws using p5.js (the p variable, example: p.push()) a visual representation of the connections
  // and the nodes, with lables. Also, a count of nodes and connections.
  display(p, x, y) {
    p.push();
    p.translate(x, y);
    p.textSize(16);
    p.fill(0);
    p.text(`Nodes: ${this.nodes.size}`, 0, 0);
    p.text(`Connections: ${this.connections.length}`, 0, 20);
    p.text("Connections", 0, 40);
    this.connections.forEach((conn, index) => {
      p.text(
        `- ${index + 1}: ${conn.outputPin.getNode().id} -> ${
          conn.inputPin.getNode().id
        }`,
        0,
        60 + index * 20
      );
    });
    p.text("Nodes", 0, 60 + this.connections.length * 20);
    this.nodes.forEach((node, index) => {
      p.text(
        `- ${index + 1}: ${node.id}`,
        0,
        80 + this.connections.length * 20 + index * 20
      );
    });
    p.pop();
  }
}
