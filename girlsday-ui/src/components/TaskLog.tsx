/// <reference path='../../all.d.ts' />

import * as React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';


export interface TaskLogProps {
  log:List<string>
}

class TaskLog extends React.Component<TaskLogProps, {}> {

  logEntries = (log:List<string>) => {
    return log
      .filter((entry:string, i:number) => i > 0)
      .map((entry:string, i:number) => {
      return <li key={i}>{entry}</li>
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
