/// <reference path='../../all.d.ts' />

import * as React from "react";
import {connect} from "react-redux";
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
  private dragged:any = null;
  private over:any = null;
  private nodePlacement:string = '';

  dragStart =  (e:any) =>{
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  };
  dragEnd =  (e:any) =>{

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);




    // Update state
    var data = this.props.person.tasks.toArray();
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);

    if (from < to) to--;
    if(this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);

    // update state
    let newTaskList:List<Task> = List<Task>(data);

    this.props.updateList(this.props.person, newTaskList);
  };
  dragOver =  (e:any) =>{
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className == "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);

    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if (relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, e.target);
    }
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

      return <li
        data-id={i}
        key={i}
        className={clazz}
        draggable='true'
        onDragEnd={this.dragEnd}
        onDragStart={this.dragStart}>{task.type}</li>
    });
  };

  render() {
    const person = this.props.person;

    const clazzName = `col-sm-${this.props.sizeInColumns}`;

    return <div className={clazzName}>
      <div className='panel panel-default'>
        <div className='panel-heading'>{person.name}</div>
        <div className='panel-body'>
          <ul className='list-group'
              onDragOver={this.dragOver}>
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
