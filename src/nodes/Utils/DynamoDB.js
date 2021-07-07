import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Blockies from "react-blockies";

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#dddddd"
    }
  }
}))(TableRow);

function DynamoDB() {
  this.addInput("item", "object");
  this.addInput("add", -1);
  this.addOutput("newAdded", -1);

  this.balances = {};
  this.items = [];

  this.properties = {
    title: "DynamoDB",
    currency: "SomeCoin",
  };
  this.size = [640, 360];

}

DynamoDB.prototype.addNewItem = function(item) {
  console.log("add", item);
  try {
    this.items.push(item);
  } catch (e) {
    console.log(e);
  }
};

DynamoDB.title = "DynamoDB";
DynamoDB.prototype.getTitle = function() {
  return this.properties.title;
};


DynamoDB.prototype.onExecute = function() {

};

DynamoDB.prototype.onAction = function() {
  let item = this.getInputData(0);
  console.log("NEW ITEM IS", item);
  this.addNewItem(item);
};

const topPadding = 50;
const rowStyle = { fontSize: 20, letterSpacing: -1 };

DynamoDB.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory();
  } else {

    let items = [];
    for (let t in this.items) {
      let item = this.items[t];
      let tableCells = Object.keys(item).map(key => {
        return <TableCell style={rowStyle}>
          <Blockies
            seed={item[key]}
            size={8}
            scale={2}
          /><span style={{ marginLeft: 4 }}>{item[key]}</span>
        </TableCell>;
      });
      items.push(
        <StyledTableRow>
          {tableCells}
        </StyledTableRow>
      );
    }

    this.render(
      <div style={{
        overflow: "auto",
        color: "#444444",
        transformOrigin: "10px -20px",
        transform: "scale(" + this.graph.canvas.ds.scale + ")",
        borderRadius: "0px 0px 8px 8px",
        background: "#CCCCCC",
        marginLeft: -19,
        marginTop: topPadding,
        width: this.size[0],
        height: this.size[1] - topPadding - 1
      }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                From
              </TableCell>
              <TableCell>
                Value
              </TableCell>
              <TableCell>
                To
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items}
          </TableBody>
        </Table>
      </div>
    );
  }
};


export default DynamoDB;
