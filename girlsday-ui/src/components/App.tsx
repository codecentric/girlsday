/// <reference path='../../all.d.ts' />

import * as React from 'react';
import {HeaderComponent} from './Header';
import {TaskBoardComponent} from './TaskBoard';

export interface AppProps {
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return <div>
      <HeaderComponent />
      <TaskBoardComponent />
    </div>;
  }
}

