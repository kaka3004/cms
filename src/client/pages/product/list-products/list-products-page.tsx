import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error/api-error-component';
import {ProductsListComponent} from 'client/components/product/products-list/products-list-component';
import {ProductActions} from 'client/actions/product/product-actions';
import {LocationActions} from 'client/actions/location/location-actions';
import {ApiError} from 'client/apis/base/api-error';
import {IState} from 'client/reducers/index';
import {IProduct} from 'shared/models/product';

interface IProps extends React.Props<ListProductsPage> {
  isFetching: boolean;
  error: ApiError;
  products: IProduct[];
  productActions: ProductActions;
  locationActions: LocationActions;
}

export class ListProductsPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.productActions.all();
  }

  createProduct() {
    this.props.locationActions.push(`/products/create`);
  }

  showProduct(product: IProduct) {
    this.props.locationActions.push(`/products/show/${product._id}`);
  }

  editProduct(product: IProduct) {
    this.props.locationActions.push(`/products/update/${product._id}`);
  }

  deleteProduct(product: IProduct) {
    this.props.productActions.remove(product._id);
  }

  /**
   * In this page dave should be able to create products
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiErrorComponent error={this.props.error} />
    } else if(this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <ProductsListComponent
          products={this.props.products}
          createProduct={() => this.createProduct()}
          showProduct={(product) => this.showProduct(product)}
          editProduct={(product) => this.editProduct(product)}
          deleteProduct={(product) => this.deleteProduct(product)} />
      );
    }
    return (
      <div className="list-products-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({products, entities}: IState) {
  let productsList = products.list;

  let productsResult = productsList.ids
    .filter((id) => !!entities.products[id])
    .map((id) => entities.products[id]);

  return {
    products: productsResult,
    isFetching: productsList.isFetching,
    error: productsList.error
  }
}

function mapDispatchToProps() {
  return {
    productActions: kernel.actions.productActions,
    locationActions: kernel.actions.locationActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProductsPage);