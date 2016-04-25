/// <reference path="../../typings/main.d.ts" />
import * as React from "react";
import {connect} from "react-redux";
import {Map, List} from "immutable";
import {TaskPanelComponent} from "./TaskPanel";
import {Person} from "../store";


export interface TaskBoardProps {
  persons:List<Person>
}


class TaskBoard extends React.Component<TaskBoardProps, {}> {


  createPanels(persons:List<Person>) {
    return persons.map((person:Person) => {
      return <TaskPanelComponent key={person.name} person={person}/>
    })
  }

  render() {
    return <div className="container">
      <div className="row">
        {this.createPanels(this.props.persons) }
      </div>
    </div>;
  }
}


const mapStateToProps = (state:Map<any, any>) => {
  return {
    persons: state.get('persons')
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {}
}


export const TaskBoardComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskBoard)

export default TaskBoardComponent;
