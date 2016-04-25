/// <reference path="../../typings/main.d.ts" />
import * as React from "react";
import {connect} from "react-redux";
import * as moment from "moment";
import {Map} from "immutable";

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

    return <div>
      <h1>Hello {time}!</h1>
      <button onClick={onStartClick}>start</button>
      <button onClick={onResetClick}>reset</button>
    </div>;
  }
}


const mapStateToProps = (state:Map<any, any>) => {
  return {
    time: state.get('time')
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onStartClick: () => {
      dispatch({type: 'TICK', time: 0})
    },
    onResetClick: () => {
      dispatch({type: 'RESET', time: 0})
    }
  }
}


export const HeaderComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderComponent;
