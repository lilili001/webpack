import _ from 'lodash';
//import $ from 'jquery';
import './assets/style.css';
import Icon from './assets/images/timg.jpg';
import Data from './data.xml';

import React from 'react';
import ReactDOM from 'react-dom'
import App from './js/rn'

import './assets/main.less';
import './assets/main.scss';

import moment from 'moment';
import 'moment/locale/zh-CN'
moment.locale('zh-CN');

let r = moment().endOf('day').fromNow();
console.log(r)

if(DEV){
    console.log(DEV)
}else{
    console.log('production')
}

import printMe from './js/print'
printMe();
function component(){
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var myicon = new Image();
    myicon.src=Icon;
    element.appendChild(myicon);

    //console.log(Data);

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onClick = printMe;
    element.appendChild(btn);

    [1, 2, 3].map((n) => n + 1);
    'aasdf'.includes('f');
    console.log(111)
    return element;
}
component();
document.body.appendChild(component());
ReactDOM.render(<App/>, document.getElementById('root'));
