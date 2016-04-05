import * as React from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  TextField, RaisedButton, SelectField, MenuItem,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IProduct} from 'shared/models/product';
import {ICategory} from 'shared/models/category';

interface IProps {
  isUpdating?: boolean;
  isFetching?: boolean;
  product?: IProduct;
  categories: ICategory[];
  onSave: Function;
}

interface IState {
  title?: string;
  description?: string;
  category_id?: string;
  sizing_info?: string;
  shipping_info?: string;
  gender?: string;
}

export class ProductFormComponent extends React.Component<IProps, IState> {

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    if(this.props.product) {
      this.setState({
        title: this.props.product.title,
        description: this.props.product.description,
        sizing_info: this.props.product.sizing_info,
        shipping_info: this.props.product.shipping_info,
        gender: this.props.product.gender,
        category_id: this.props.product.category_id
      });
    } else {
      this.setState({});
    }
  }

  updateTitle(e:any) {
    this.setState({
      title: e.target.value      
    });
  }

  updateDescription(e:any) {
    this.setState({
      description: e.target.value      
    });
  }

  updateSizingInfo(e:any) {
    this.setState({
      sizing_info: e.target.value      
    });
  }

  updateShippingInfo(e:any) {
    this.setState({
      shipping_info: e.target.value      
    });
  }

  updateCategory(e:any, index, value) {
    this.setState({
      category_id: value
    });
  }

  updateGender(e:any, index, value) {
    this.setState({
      gender: value
    });
  }

  saveFormData() {
    this.props.onSave(this.state);
  }

  render() {
    if(this.props.isFetching) {
      return <CircularProgress />
    }
    return (
      <div className="product-form-component">
        <Paper>
          <Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Edit product" />
            </ToolbarGroup>
          </Toolbar>
          <div style={{padding: 20}}>
            <TextField 
              style={{width:"100%"}}
              value={this.state.title}
              onChange={(e) => this.updateTitle(e)}
              floatingLabelText="Product Title" />
            <TextField 
              style={{width:"100%"}}
              value={this.state.description}
              floatingLabelText="Product Description" 
              onChange={(e) => this.updateDescription(e)}
              multiLine={true} rows={4} />
            <TextField 
              style={{width:"100%"}}
              value={this.state.sizing_info}
              floatingLabelText="Product Sizing info" 
              onChange={(e) => this.updateSizingInfo(e)}
              multiLine={true} rows={4} />
            <TextField 
              style={{width:"100%"}}
              value={this.state.shipping_info}
              floatingLabelText="Product Shipping info" 
              onChange={(e) => this.updateShippingInfo(e)}
              multiLine={true} rows={4} />
            <SelectField
              maxHeight={300}
              value={this.state.gender || ""}
              onChange={(e, i, v) => this.updateGender(e, i, v)}>
                <MenuItem value="" primaryText="Select gender" />
                <MenuItem value="male" primaryText="Male" />
                <MenuItem value="female" primaryText="Female" />
                <MenuItem value="unisex" primaryText="Unisex" />
            </SelectField>
            <br />
            <SelectField
              maxHeight={300}
              value={this.state.category_id || ""}
              onChange={(e, i, v) => this.updateCategory(e, i, v)}>
                <MenuItem value="" primaryText="Select category" />
                {this.props.categories.map(c => 
                  <MenuItem value={c._id} key={c._id} primaryText={c.title}/>)}
            </SelectField>
          </div>
          <div style={{padding: 20}}>
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Save Product"
              primary={true} 
              onTouchTap={() => this.saveFormData()} />
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Reset"
              onTouchTap={() => this.setInitialState()} />
          </div>
        </Paper>
      </div>
    );
  }
}