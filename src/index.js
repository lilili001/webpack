import _ from 'lodash';
//import $ from 'jquery';
import './assets/style.css';
import Icon from './assets/images/timg.jpg';
import Data from './data.xml';

import './assets/main.less';
import './assets/main.scss';

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
    return element;
}
component();
document.body.appendChild(component());
