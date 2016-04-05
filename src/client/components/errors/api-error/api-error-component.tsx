import * as React from "react";
import {Paper} from 'material-ui';
import {ApiError} from 'client/apis/base/api-error';

interface IProps {
  error: ApiError;
}

export class ApiErrorComponent extends React.Component<IProps, any> {
  render() {
    let {error} = this.props;

    let statusCode = error.getStatusCode();
    let mainErrorMessage = error.getMainErrorMessage();
    let errorMessages = error.getErrorMessages();

    return (
      <div className="api-error-dialog-component">
        <Paper style={{"padding": "20px"}}>
          <b>Status code: </b>{statusCode}<br/>
          <b>Error: </b>{mainErrorMessage}<br/>
          <b>Message: </b><br/>
          {
            errorMessages ?
              <ul>
                {errorMessages.map((message, index) => <li key={index}>{message}</li>)}
              </ul>
            : null
          }
        </Paper>
      </div>
    );
  }
}