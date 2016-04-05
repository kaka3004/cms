import * as React from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  List, ListItem,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IProduct} from 'shared/models/product';

interface IProps {
  product: IProduct;
}

export class ProductDetailsComponent extends React.Component<IProps, any> {

  private renderProduct() {
    return (
      <div className="product-details-component">
        <Paper>
          <Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Product Details" />
            </ToolbarGroup>
          </Toolbar>
          <div>
            <List>
              <ListItem
                primaryText="Title"
                secondaryText={this.props.product.title} />
              <ListItem
                primaryText="Description"
                secondaryText={this.props.product.description} />
            </List>
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    if(this.props.product) {
      return this.renderProduct();
    } else {
      return <CircularProgress />
    }
  }
}