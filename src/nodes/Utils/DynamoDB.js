import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { keccak256 } from "ethereumjs-util";

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
  this.addOutput("newAddedItem", "object");
  this.addOutput("newItemEvent", -1);
  this.addOutput("removedItemEvent", -1);

  this.items = [];

  this.properties = {
    title: "DynamoDB"
  };
  this.size = [640, 360];

}

DynamoDB.prototype.addNewItem = function(item) {
  console.log("add", item);
  let itemId = keccak256(getMillis() + item).toString("hex").substring(0, 6);
  this.items.push({ itemId, ...item });

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
  this.setOutputData(0, item);
  this.trigger("newItemEvent", item);
};

const topPadding = 50;
const rowStyle = { fontSize: 20, letterSpacing: -1 };

DynamoDB.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory();
  } else {

    if (this.items.length > 0) {
      let items = [];
      for (let t in this.items) {
        let tableCell = createTableCell.call(this, t);
        items.push(
          <StyledTableRow key={this.items[t].itemId}>
            {tableCell}
          </StyledTableRow>
        );
      }
      const tableHeaders = createTableHeaders.call(this);

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
                {tableHeaders}
              </TableRow>
            </TableHead>
            <TableBody>
              {items}
            </TableBody>
          </Table>
        </div>
      );
    }
  }
};
DynamoDB.prototype.removeItem = function(item) {
  this.items = this.items.filter(element => element.itemId !== item.itemId);
  this.trigger("removedItemEvent", item);
};


function getBiggestItem() {
  const maxKeysObject = this.items.reduce(function(prev, current) {
    return (Object.keys(prev) > Object.keys(current)) ? prev : current
  })
  return maxKeysObject;
}

function createTableHeaders() {
  let someItem = getBiggestItem.call(this);
  const tableHeaders = [];
  tableHeaders.push(<TableCell>Actions</TableCell>);
  tableHeaders.push(Object.keys(someItem).map(key => {
    return <TableCell>
      {key}
    </TableCell>;
  }));
  return tableHeaders;
}


function createTableCell(t) {
  let item = this.items[t];
  let tableCell = [];
  tableCell.push(
    <TableCell style={rowStyle}>
      <button onClick={(e) => this.removeItem(item, e)}>x</button>
    </TableCell>);
  tableCell.push(Object.keys(item).map(key => {
    return <TableCell style={rowStyle}>
      {item[key]}
    </TableCell>;
  }));
  return tableCell;
}

function getMillis() {
  return new Date().getMilliseconds().toString();
}

export default DynamoDB;
