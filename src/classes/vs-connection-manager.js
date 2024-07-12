import VsConnection from "./vs-connection";
import VsNodeTypes from "./vs-node-types";
export default class VsConnectionManager {
  constructor() {
    this.connections = [];
    this.nodes = new Set();
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
}
