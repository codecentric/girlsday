/// <reference path="../../typings/main.d.ts" />
import * as React from "react";
import {connect} from "react-redux";
import {Map, List} from "immutable";
import {Person, Task} from "../store";

export interface OwnTaskPanelProps {
  person:Person;
}

export interface TaskPanelProps {

  updateList:(person:Person, actions:List<Task>) => void;
}

var placeholder = document.createElement("li");
placeholder.className = "list-group-item placeholder";

export class TaskPanel extends React.Component<OwnTaskPanelProps & TaskPanelProps, {}> {
  private dragged:any = null;
  private over:any = null;

  dragStart = (e:any) => {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  };
  dragEnd = (e:any) => {

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    // Update state
    var data:Array<Task> = this.props.person.tasks.toArray();
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    console.log(this.over);
    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);

    // update state
    let newTaskList:List<Task> = List<Task>(data);

    this.props.updateList(this.props.person, newTaskList);
  };
  dragOver = (e:any) => {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  };

  createTaskList = (actions:List<Task>) => {
    return actions.map((task:Task, i:number) => {

      let clazz:string = (task.running === true)
        ? 'list-group-item list-group-item-success'
        : 'list-group-item';

      return <li
        data-id={i}
        key={i}
        className={clazz}
        draggable="true"
        onDragEnd={this.dragEnd}
        onDragStart={this.dragStart}>{task.type}</li>
    });
  };

  render() {
    const person = this.props.person;

    return <div className="col-sm-3">
      <div className="panel panel-default">
        <div className="panel-heading">{person.name}</div>
        <div className="panel-body">
          <ul className="list-group"
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
    updateList: (person:Person, tasks:List<Task>) => {
      dispatch({type: 'UPDATE_LIST', person: person, tasks: tasks})
    },
  }
};


export const TaskPanelComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPanel) as React.ComponentClass<OwnTaskPanelProps>

export default TaskPanelComponent;
