import VsConnectionManager from "./classes/vs-connection-manager";
import VsNode from "./classes/vs-node";
import { VsInputPin, VsOutputPin } from "./classes/vs-pin";
import VsNodeTypes from "./classes/vs-node-types";
import { VsPinTypes } from "./classes/vs-pin-types";

export default function textFunction() {
  const connectionManager = new VsConnectionManager();

  // Create a node that adds two numbers
  const addNode = new VsNode(VsNodeTypes.Function);
  console.log(`AddNode id: ${addNode.id}`);
  const input1 = new VsInputPin(VsPinTypes.Number);
  const input2 = new VsInputPin(VsPinTypes.Number);
  const addOutput = new VsOutputPin(VsPinTypes.Number);

  addNode.addInput(input1);
  addNode.addInput(input2);
  addNode.setOutput(addOutput);
  addNode.setOperation((a, b) => a + b);

  // Create nodes that provide constant values
  const dataNode1 = new VsNode(VsNodeTypes.Function);
  console.log(`DataNode1 id: ${dataNode1.id}`);
  const dataOutput1 = new VsOutputPin(VsPinTypes.Number);
  dataNode1.setOutput(dataOutput1);
  dataNode1.setOperation(() => 5);

  const dataNode2 = new VsNode(VsNodeTypes.Function);
  console.log(`DataNode2 id: ${dataNode2.id}`);
  const dataOutput2 = new VsOutputPin(VsPinTypes.Number);
  dataNode2.setOutput(dataOutput2);
  dataNode2.setOperation(() => 10);

  // Connect data outputs to add node inputs
  connectionManager.addConnection(dataOutput1, input1);
  connectionManager.addConnection(dataOutput2, input2);

  // Create a node that multiplies two numbers
  const multiplyNode = new VsNode(VsNodeTypes.Function);
  console.log(`MultiplyNode id: ${multiplyNode.id}`);
  const multiplyInput1 = new VsInputPin(VsPinTypes.Number);
  const multiplyInput2 = new VsInputPin(VsPinTypes.Number);
  const multiplyOutput = new VsOutputPin(VsPinTypes.Number);

  multiplyNode.addInput(multiplyInput1);
  multiplyNode.addInput(multiplyInput2);
  multiplyNode.setOutput(multiplyOutput);
  multiplyNode.setOperation((a, b) => a * b);

  // Connect the add node output to one input of the multiply node
  connectionManager.addConnection(addOutput, multiplyInput1);

  // Create another node for a constant value
  const dataNode3 = new VsNode(VsNodeTypes.Function);
  console.log(`DataNode3 id: ${dataNode3.id}`);
  const dataOutput3 = new VsOutputPin(VsPinTypes.Number);
  dataNode3.setOutput(dataOutput3);
  dataNode3.setOperation(() => 2);

  // Connect this data node to the other input of the multiply node
  connectionManager.addConnection(dataOutput3, multiplyInput2);

  // Create a result node to capture the output of the multiply node
  const resultNode = new VsNode(VsNodeTypes.Function);
  console.log(`ResultNode id: ${resultNode.id}`);
  const resultInput = new VsInputPin(VsPinTypes.Number);
  resultNode.addInput(resultInput);
  const resultOutput = new VsOutputPin(VsPinTypes.Number);
  resultNode.setOutput(resultOutput);
  resultNode.setOperation((a) => a);

  // Connect the multiply node output to the result node input
  connectionManager.addConnection(multiplyOutput, resultInput);

  // Also connect the add node output to another input of the result node to test multiple connections
  const resultInput2 = new VsInputPin(VsPinTypes.Number);
  resultNode.addInput(resultInput2);
  connectionManager.addConnection(addOutput, resultInput2);

  connectionManager.execute();

  console.log("resultInput value:", resultInput.getValue()); // Expected: 30 (15 * 2)
  console.log("resultInput2 value:", resultInput2.getValue()); // Expected: 15 (from addNode)

  // Debugging output
  console.log("multiplyInput1 value:", multiplyInput1.getValue()); // Expected: 15
  console.log("multiplyInput2 value:", multiplyInput2.getValue()); // Expected: 2
}
