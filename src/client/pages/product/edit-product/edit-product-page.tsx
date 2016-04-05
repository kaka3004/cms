import * as React from "react";
import {connect} from 'react-redux';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error/api-error-component';
import {ProductFormComponent} from 'client/components/product/product-form/product-form-component';
import {ProductActions} from 'client/actions/product/product-actions';
import {RouteActions} from 'react-router-redux';
import {CategoryActions} from 'client/actions/category/category-actions';
import {CircularProgress} from 'material-ui';
import {ApiError} from 'client/apis/base/api-error';
import {IState} from 'client/reducers/index';
import {IProduct} from 'shared/models/product';
import {ICategory} from 'shared/models/category';

interface IProps extends React.Props<EditProductPage> {
  params: {id?};
  error: ApiError;
  categories: ICategory[];
  product: IProduct;
  isFetching: boolean;
  isUpdating: boolean;
  categoryActions: CategoryActions;
  productActions: ProductActions;
}

export class EditProductPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.categoryActions.all();
    this.props.productActions.findById('updatePage', this.props.params.id);
  }
 
  saveProduct(data) {
    this.props.productActions.replace('updatePage', this.props.params.id, data);
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
        <div>
          <ProductFormComponent
            isFetching={this.props.isFetching} 
            isUpdating={this.props.isUpdating} 
            onSave={(data) => this.saveProduct(data)}
            categories={this.props.categories}
            product={this.props.product} />
        </div>
      );
    }
    return (
      <div className="edit-product-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({products, categories, entities}: IState) {
  let updatePageProduct = products.updatePage;
  let product = entities.products[updatePageProduct.id];

  let categoriesResult = categories.list.ids
    .filter((id) => !!entities.categories[id])
    .map((id) => entities.categories[id]);

  return {
    categories: categoriesResult,
    product: product,
    isFetching: updatePageProduct.isFetching,
    isUpdating: updatePageProduct.isUpdating,
    error: updatePageProduct.error
  }
}

function mapDispatchToProps() {
  return {
    productActions: kernel.actions.productActions,
    categoryActions: kernel.actions.categoryActions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);