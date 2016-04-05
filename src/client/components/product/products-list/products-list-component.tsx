import * as React from "react";
import {
  Paper,
  Divider,
  RaisedButton, FloatingActionButton,
  Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IProduct} from 'shared/models/product';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

interface IProps {
  products: IProduct[];
  createProduct: Function;
  showProduct: Function;
  editProduct: Function;
  deleteProduct: Function;
}

export class ProductsListComponent extends React.Component<IProps, any> {

  getTableRows() {
    return this.props.products.map((product) => (
      <TableRow key={product._id}>
        <TableRowColumn>{product.title}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            label="Show"
            onTouchTap={() => this.props.showProduct(product)}/>
          <RaisedButton
            label="Edit"
            onTouchTap={() => this.props.editProduct(product)}
            primary={true}/>
          <RaisedButton
            label="Delete"
            onTouchTap={() => this.props.deleteProduct(product)}
            secondary={true}/>
        </TableRowColumn>
      </TableRow>
    ))
  }

  getTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Tools</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getTableRows()}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <div className="products-list-component">
        <Paper>
          <Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Products List" />
            </ToolbarGroup>
          </Toolbar>
          <div>
            {this.getTable()}
          </div>
        </Paper>
        <FloatingActionButton
          className="button-floating"
          mini={false}
          onTouchTap={() => this.props.createProduct()}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}