import _ from 'lodash';
import './assets/style.css';
import Icon from './assets/images/timg.jpg';
import Data from './data.xml';

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

    return element;
}
component();
document.body.appendChild(component());