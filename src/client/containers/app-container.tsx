import * as React from "react";
import { connect } from "react-redux";
import {kernel} from 'client/app/index';
import {AppBar, LeftNav, MenuItem, IconButton, Icons} from 'material-ui';
import {LocationActions} from 'client/actions/location/location-actions';

interface IProps extends React.Props<AppContainer> {
  locationActions: LocationActions;
}

interface IState {
  openLeftNav: boolean;
}

export class AppContainer extends React.Component<IProps, IState> {

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    this.setState({
      openLeftNav: false
    });
  }

  toggleLeftNav() {
    this.setState({openLeftNav: !this.state.openLeftNav});
  }

  gotoProducts() {
    this.props.locationActions.push(`/products`);
  }

  render() {
    const {children} = this.props;

    return (
      <div className="app-container">
        <AppBar
          title="Goodsense CMS"
          onLeftIconButtonTouchTap={this.toggleLeftNav.bind(this)} />
        <LeftNav 
            open={this.state.openLeftNav} 
            docked={false}
            onRequestChange={(openLeftNav) => this.setState({ openLeftNav })}>
          <AppBar
            title="Menu"
            iconElementLeft={<IconButton onClick={this.toggleLeftNav.bind(this)}><Icons.NavigationChevronLeft /></IconButton>} />
          <MenuItem onTouchTap={() => this.gotoProducts()}>Products</MenuItem>
        </LeftNav>
        <div className="app-container__content">
          {children}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps() {
  return {
    locationActions: kernel.actions.locationActions
  }
}

export default connect(null, mapDispatchToProps)(AppContainer);