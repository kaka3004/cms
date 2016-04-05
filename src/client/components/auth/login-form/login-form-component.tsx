import * as React from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  TextField, RaisedButton,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IUser} from 'shared/models/user';

interface IProps {
  isUpdating?: boolean;
  onLogin: Function;
}

interface IState {
  email?: string;
  password?: string;
}

export class LoginFormComponent extends React.Component<IProps, IState> {

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    this.setState({});
  }

  updateEmail(e:any) {
    this.setState({
      email: e.target.value      
    });
  }

  updatePassword(e:any) {
    this.setState({
      password: e.target.value      
    });
  }

  login() {
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="user-form-component">
        <Paper>
          <Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Login" />
            </ToolbarGroup>
          </Toolbar>
          <div style={{padding: 20}}>
            <TextField 
              style={{width:"100%"}}
              value={this.state.email}
              onChange={(e) => this.updateEmail(e)}
              floatingLabelText="User email" />
            <TextField 
              type="password"
              style={{width:"100%"}}
              value={this.state.password}
              floatingLabelText="User password" 
              onChange={(e) => this.updatePassword(e)} />
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Login"
              primary={true} 
              onTouchTap={() => this.login()} />
          </div>
        </Paper>
      </div>
    );
  }
}