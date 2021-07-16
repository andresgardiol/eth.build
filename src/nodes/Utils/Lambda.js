const keccak256 = require("keccak256");

function Lambda() {
  this.addInput("input", "object,string");
  this.addInput("trigger", -1);
  this.addOutput("output", "object,string");
  this.addOutput("finish", -1);
  let id = keccak256(getToLocaleTimeString()).toString("hex").substr(0, 9);
  this.properties = { executionTime: 2000, id };
  this.size = [160, 60];
}

Lambda.title = "Lambda";

Lambda.prototype.onExecute = function() {
};

Lambda.prototype.onAction = async function() {
  let input = this.getInputData(0);
  console.log(`%cSTART - LAMBDA ID: ${this.properties.id} - ${getToLocaleTimeString()}`, "color: green");
  setTimeout(() => {
    this.setOutputData(0, input);
    this.trigger("finish", input);
    console.log(`%cEND - LAMBDA ID: ${this.properties.id} - ${getToLocaleTimeString()}`, "color: green");
    console.log(`%cREPORT - LAMBDA TOOK: ${this.properties.executionTime}ms TO COMPLETE`, "color: orange");
  }, this.properties.executionTime);

};

function getToLocaleTimeString() {
  return new Date().toLocaleTimeString();
}

export default Lambda;
