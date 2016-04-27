/// <reference path='../../all.d.ts' />

import * as React from "react";
import {connect} from "react-redux";
import * as moment from 'moment';
import {Map, List} from "immutable";
import Person from "../types/person";
import {createUpdateListAction} from "../store/actionCreators";
import {Task} from "../types/task";
import {TaskState} from "../types/taskState";

export interface OwnTaskPanelProps {
  person:Person;
  sizeInColumns:number;
}

export interface TaskPanelProps {

  updateList:(person:Person, actions:List<Task>) => void;
}

var placeholder = document.createElement('li');
placeholder.className = 'list-group-item placeholder';

export class TaskPanel extends React.Component<OwnTaskPanelProps & TaskPanelProps, {}> {


  updateTasks = (oldIndex:number, newIndex:number)=> {
    let tasks = this.props.person.tasks.toArray();

    if (newIndex >= tasks.length) {
      var k = newIndex - tasks.length;
      while ((k--) + 1) {
        tasks.push(undefined);
      }
    }
    tasks.splice(newIndex, 0, tasks.splice(oldIndex, 1)[0]);

    // update state
    let newTaskList:List<Task> = List<Task>(tasks);

    this.props.updateList(this.props.person, newTaskList);
  };

  moveUp = (i:number) => {
    this.updateTasks(i, i - 1);

  };
  moveDown = (i:number) => {
    this.updateTasks(i, i + 1);
  };

  createTaskList = (tasks:List<Task>) => {
    return tasks.map((task:Task, i:number) => {
      let clazz:string;

      switch (task.taskState) {
        case TaskState.WAITING:
          clazz = 'list-group-item';
          break;
        case TaskState.RUNNING:
          clazz = 'list-group-item list-group-item-info';
          break;

        case TaskState.FINISHED:
          clazz = 'list-group-item list-group-item-success';
          break;
        case TaskState.BLOCKED:
          clazz = 'list-group-item list-group-item-danger';
          break;
      }

      let moveUp = this.moveUp.bind(this, i);
      let moveDown = this.moveDown.bind(this, i);

      let moveUpButton;
      if (i > 0) {
        moveUpButton =<button type="button" className="btn btn-primary btn-xs" onClick={moveUp}>
          <span className="glyphicon glyphicon-arrow-up"></span>
        </button>
      }
      else {
        moveUpButton = <button type="button" className="btn btn-primary btn-xs disabled">
          <span className="glyphicon glyphicon-arrow-up"></span>
        </button>;
      }

      let moveDownButton;
      if (i < this.props.person.tasks.size - 1) {
        moveDownButton = <button type="button" className="btn btn-primary btn-xs" onClick={moveDown}>
          <span className="glyphicon glyphicon-arrow-down"></span>
        </button>
      } else {
        moveDownButton = <button type="button" className="btn btn-primary btn-xs disabled">
          <span className="glyphicon glyphicon-arrow-down"></span>
        </button>
      }

      return <li
        key={i}
        className={clazz}
        style={{'overflow':'hidden'}}>{task.type}
        <div className="btn-group" role="group" style={{'float':'right'}}>
          {moveUpButton}
          {moveDownButton}
        </div>
      </li>
    });
  };

  render() {
    const person = this.props.person;

    const clazzName = `col-sm-${this.props.sizeInColumns}`;

    return <div className={clazzName}>
      <div className='panel panel-default'>
        <div className='panel-heading' style={{'fontSize':'65px', 'textAlign':'center'}}>{person.name}</div>
        <div className='panel-body'>
          <ul className='list-group'>
            <li className="list-group-item">Wecker klingelt um {moment(person.wakeUp).format('hh:mm')} Uhr</li>
            {this.createTaskList(person.tasks) }
          </ul>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = (state:Map<any, any>) => {
  return {}
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    updateList: (person:Person, tasks:List<Task>) => dispatch(createUpdateListAction(person, tasks))
  }
};


export const TaskPanelComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPanel) as React.ComponentClass<OwnTaskPanelProps>;

export default TaskPanelComponent;
