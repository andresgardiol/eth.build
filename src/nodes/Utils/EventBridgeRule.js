const keccak256 = require("keccak256");

function EventBridgeRule() {
  this.addInput("key", "string");
  this.addInput("value", "string");
  this.addOutput("output", "object");
  this.size = [160, 100];
}

EventBridgeRule.title = "EB_Rule";

EventBridgeRule.prototype.onExecute = function() {
  let key = this.getInputData(0);
  let value = this.getInputData(1);
  this.setOutputData(0, { key, value });
};


export default EventBridgeRule;
