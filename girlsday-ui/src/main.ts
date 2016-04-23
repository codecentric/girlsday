import 'bootstrap-css-only/css/bootstrap.css';
import 'dialog-polyfill/dialog-polyfill.css';
import 'material-design-lite/dist/material.css';
import './assets/css/girlsday.css';
import 'material-design-lite/dist/material.js';

import {bootstrap}    from 'angular2/platform/browser';
import {GirlsDay} from './components/girlsday';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(GirlsDay, ROUTER_PROVIDERS);
