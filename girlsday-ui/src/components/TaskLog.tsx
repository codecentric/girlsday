/// <reference path='../../all.d.ts' />

import * as React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';


export interface TaskLogProps {
  log:List<string>
}

class TaskLog extends React.Component<TaskLogProps, {}> {

  logEntries = (log:List<string>) => {
    return log.map((entry:string) => {
      return <li>{entry}</li>
    });
  };

  render() {
    return <div className='col-sm-12'>
      <ul>
        {this.logEntries(this.props.log)}
      </ul>
    </div>;
  }
}

const mapStateToProps = (state:Map<any, any>) => {
  return {
    log: state.get('log')
  }
};

const mapDispatchToProps = (dispatch:any) => {
  return {}
};


export const TaskLogComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskLog);

export default TaskLogComponent;
