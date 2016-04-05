import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error/api-error-component';
import {ProductDetailsComponent} from 'client/components/product/product-details/product-details-component';
import {ProductActions} from 'client/actions/product/product-actions';
import {RouteActions} from 'react-router-redux';
import {ApiError} from 'client/apis/base/api-error';
import {IState} from 'client/reducers/index';
import {IProduct} from 'shared/models/product';

interface IProps extends React.Props<ProductDetailsComponentPage> {
  params: {id?};
  error: ApiError;
  product: IProduct;
  isFetching: boolean;
  isUpdating: boolean;
  productActions: ProductActions;
}

export class ProductDetailsComponentPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.productActions.findById('detailsPage', this.props.params.id);
  }

  /**
   * In this page dave should be able to create products
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiErrorComponent error={this.props.error} />
    } else if(this.props.isUpdating || this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <ProductDetailsComponent
          product={this.props.product} />
      );
    }
    return (
      <div className="product-details-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({products, entities}: IState) {
  let detailsPageProduct = products.detailsPage;

  let product = entities.products[detailsPageProduct.id];

  return {
    product: product,
    isFetching: detailsPageProduct.isFetching,
    isUpdating: detailsPageProduct.isUpdating,
    error: detailsPageProduct.error
  }
}

function mapDispatchToProps() {
  return {
    productActions: kernel.actions.productActions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsComponentPage);