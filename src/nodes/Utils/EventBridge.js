const keccak256 = require("keccak256");

function EventBridge() {
  this.addInput("input", "object");
  this.addInput("rule", "object");
  this.addInput("trigger", -1);
  this.addOutput("output", "object");
  this.addOutput("", -1);
  this.size = [260, 100];
}

EventBridge.title = "EventBridge";

EventBridge.prototype.onExecute = function() {
};

EventBridge.prototype.onAction = async function() {
  let input = this.getInputData(0);
  let rule = this.getInputData(1);
  if (input[rule.key] == rule.value) {
    this.setOutputData(0, input);
    this.trigger("", input);
  }

};

export default EventBridge;
