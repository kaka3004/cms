import * as React from 'react';
import {Paper} from 'material-ui';

import {  TextField, DatePicker,RaisedButton,Tabs, Tab,Table, TableHeader, TableHeaderColumn,TableRow, TableRowColumn,  TableBody, TableFooter,Dialog,} from 'material-ui';


const styles = {
  container: {
  	marginTop: 20
  },
  paper: {
  	padding: 10
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  propContainerStyle: {
    width: '80%',
    overflow: 'hidden',
    margin: '20px auto 0'
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  textField: {
    marginTop: 20,
    width: '100%'
  },
  datePicker: {
    margin:10
  },
  deleteBtn: {
    float: 'right'
  },
  button: {
    marginRight:10
  },
};

const productsTableHeaders =[
  'Size','Color','Material'
];

const productsTableData = [
  {
    size:'XS',
    color:'Red',
    material:'Cotton'
  },
  {
    size:'M',
    color:'Red',
    material:'Cotton'
  },
  {
    size:'XL',
    color:'Yellow',
    material:'Cotton'
  }
];

const tableHeaders = [
    'ID', 'Title'
  ];
  const tableData = [
    {title: 'ski'},
    {title: 'Gloves'},
    {title: 'Jackets'}
  ];

export class ProductForm2Component extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {open:false};
  }

  renderProductsTable() {
    return(
      <div>
        <Table height="300px" fixedHeader={true} selectable={true} multiSelectable={true}>
          <TableHeader enableSelectAll={true}>
            <TableRow>
              {productsTableHeaders.map( (row,index:any) => (
                <TableHeaderColumn key={index} tooltip={"The "+row}> {row} </TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={true} showRowHover={true}>
            {productsTableData.map( (row, index) => (
             <TableRow key={index} >
               <TableRowColumn>{row.size}</TableRowColumn>
               <TableRowColumn>{row.color}</TableRowColumn>
               <TableRowColumn>{row.material}</TableRowColumn>
             </TableRow>
             ))}
          </TableBody>
        </Table>
	  	</div>
    );
  }

    handleDialogOpen ()  {
      this.setState({open: true});
    };

    handleDialogClose () {
      this.setState({open:false});
    };

  renderChooseCategoryDialog(){
    const actions = [
        <RaisedButton style={styles.button} label="Cancel" secondary={true} onTouchTap={this.handleDialogClose.bind(this)}/>,
        <RaisedButton style={styles.button} label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleDialogClose.bind(this)}/>
        ];

        return(
          <div>
            <RaisedButton label="Choose Category" primary={true} onTouchTap={this.handleDialogOpen.bind(this)} />
            <Dialog
              title = " Choose Category "
              actions = {actions}
              modal = {false}
              open={this.state.open}
              onRequestClose={this.handleDialogClose.bind(this)}>

              <Table height="300px" fixedHeader={true} selectable={true} multiSelectable={true}>
                <TableHeader enableSelectAll={true}>
                  <TableRow>
                    {tableHeaders.map( (row,index:any)=>(
                      <TableHeaderColumn key={index} tooltip={"the "+row}> {row} </TableHeaderColumn>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={true} showRowHover={true}>
                  {tableData.map( (row, index) => (
                   <TableRow key={index} >
                    <TableRowColumn > {index}</TableRowColumn>
                    <TableRowColumn >{row.title}</TableRowColumn>
                   </TableRow>
                   ))}
                </TableBody>
              </Table>
            </Dialog>
          </div>
        );
  }

  render() {
  	return (
	  	<div style={styles.container}>
        <Paper style={styles.paper}>
	  			<h1>Manage products</h1>
          <div >
            <Tabs >
              <Tab label="Product Details">
                <div>
                  <div >
                    <TextField style={styles.textField} hintText="Product Name .. " />
                    <TextField style={styles.textField} hintText="Product Description" floatingLabelText="Product Description" multiLine={true} rows={2} />
                    <div style={styles.datePicker}>
                      <DatePicker  hintText="Date"/>
                    </div>
                    {this.renderChooseCategoryDialog()}
                    {this.renderProductsTable()}
                    <RaisedButton style={styles.deleteBtn} label="Delete Selected" secondary={true} />
                  </div>
                </div>
              </Tab>
              <Tab label="Shipping Info"  >
                <div>
                  <h2 style={styles.headline}>Tab Two</h2>
                  <p>
                    This is an example tab.
                  </p>
                  <p>
                    You can put any sort of HTML or react component in here. It even keeps the component state!
                  </p>
                </div>
              </Tab>
              <Tab label="Taxes Info" >
                <div>
                  <h2 style={styles.headline}>Tab Two</h2>
                  <p>
                    This is an example tab.
                  </p>
                  <p>
                    You can put any sort of HTML or react component in here. It even keeps the component state!
                  </p>
                </div>
              </Tab>
            </Tabs>
    	  	</div>
  			</Paper>
	  	</div>
  	);
  }
}
