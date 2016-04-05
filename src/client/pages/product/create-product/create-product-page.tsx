import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error/api-error-component';
import {ProductForm2Component} from 'client/components/product/product-form-2/product-form-2-component';
import {ProductActions} from 'client/actions/product/product-actions';
import {CategoryActions} from 'client/actions/category/category-actions';
import {LocationActions} from 'client/actions/location/location-actions';
import {IState} from 'client/reducers/index';
import {IProduct} from 'shared/models/product';
import {ICategory} from 'shared/models/category';
import {ApiError} from 'client/apis/base/api-error';

interface IProps extends React.Props<CreateProductPage> {
  error: ApiError;
  product: IProduct;
  categories: ICategory[];
  isUpdating: boolean;
  productActions: ProductActions;
  categoryActions: CategoryActions;
  locationActions: LocationActions;
}

export class CreateProductPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.categoryActions.all();

    // Unset created instance from state
    this.props.productActions.reset('createPage');
  }

  componentWillReceiveProps(nextProps: IProps) {
    // Product has been created successfully
    if(nextProps.product && nextProps.product._id) {
      this.props.locationActions.push(`/products/update/${nextProps.product._id}`);
    }
  }

  saveProduct(data) {
    this.props.productActions.create('createPage', data);
  }

  /**
   * In this page dave should be able to create products
   */
  render() {
    let result = (
      <div>
        {
          this.props.isUpdating ?
            <CircularProgress /> : null
        }
        {
          this.props.error ?
          <ApiErrorComponent
            error={this.props.error}/> : null
        }
        <ProductForm2Component
          categories={this.props.categories}
          onSave={(data) => this.saveProduct(data)} />
      </div>
    );
    return (
      <div className="create-product-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({products, categories, entities}: IState) {
  let createPageProduct = products.createPage;

  // Get product document by id from entities
  let product = entities.products[createPageProduct.id];

  let categoriesResult = categories.list.ids
    .filter((id) => !!entities.categories[id])
    .map((id) => entities.categories[id]);

  return {
    categories: categoriesResult,
    product: product,
    isUpdating: createPageProduct.isUpdating,
    error: createPageProduct.error
  }
}

function mapDispatchToProps() {
  return {
    productActions: kernel.actions.productActions,
    locationActions: kernel.actions.locationActions,
    categoryActions: kernel.actions.categoryActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductPage);
