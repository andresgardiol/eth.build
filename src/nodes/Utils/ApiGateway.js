import React from "react";
import Button from "@material-ui/core/Button";

function ApiGateway() {
  this.addInput("request", "object");
  this.addOutput("output", "object");
  this.addOutput("event", -1);
  this.properties = {
    title: "ApiGateway"
  };
  this.size = [200, 110];
}

ApiGateway.title = "ApiGateway";
ApiGateway.prototype.getTitle = function() {
  return this.properties.title;
};

ApiGateway.prototype.onExecute = function() {
};

ApiGateway.prototype.onAction = function() {
  const request = this.getInputData(0);
  let eventData;
  if (request) {
    eventData = request;
  } else {
    eventData = null;
  }
  this.setOutputData(0, eventData);
  this.trigger("event", eventData);
};

const topPadding = 50;
ApiGateway.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory();
  } else {
    this.render(
      <div style={{
        overflow: "auto",
        color: "#444444",
        transformOrigin: "10px -20px",
        borderRadius: "0px 0px 8px 8px",
        background: "#CCCCCC",
        marginLeft: -19,
        marginTop: topPadding,
        width: this.size[0],
        height: this.size[1] - topPadding - 1
      }}>
        <Button onClick={() => this.triggerEvent()}
                style={{ top: "15%" }}
                variant="contained"
                color="primary">New Event</Button>
      </div>
    );
  }
};

ApiGateway.prototype.triggerEvent = function() {
  this.onAction();
};

export default ApiGateway;
