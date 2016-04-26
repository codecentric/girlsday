/// <reference path='../../all.d.ts' />

import * as React from "react";
import {connect} from "react-redux";
import * as moment from "moment";
import {Map} from "immutable";
import {createTickAction, createResetAction} from "../store/actionCreators";

export interface HeaderProps {
  time:Date,
  onStartClick:() => void
  onResetClick:() => void
}


class Header extends React.Component<HeaderProps, {}> {

  render() {
    const time = moment(this.props.time).format('HH:mm');
    const onStartClick = this.props.onStartClick;
    const onResetClick = this.props.onResetClick;

    return <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">{time}</a></div>
        <div className="collapse navbar-collapse navbar-right">
          <button className="btn btn-default navbar-btn" onClick={onStartClick}>start</button>
          <button className="btn btn-default navbar-btn" onClick={onResetClick}>reset</button>
        </div>
      </div>
    </nav>
  }
}


const mapStateToProps = (state:Map<any, any>) => {
  return {
    time: state.get('time')
  }
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    onStartClick: () => {
      dispatch(createTickAction(0))
    },
    onResetClick: () => {
      dispatch(createResetAction())
    }
  }
};


export const HeaderComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderComponent;
