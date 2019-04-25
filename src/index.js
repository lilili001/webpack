import _ from 'lodash';
import './assets/style.css';
import Icon from './assets/images/timg.jpg';

function component(){
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var myicon = new Image();
    myicon.src=Icon;
    element.appendChild(myicon);

    return element;
}
component();
document.body.appendChild(component());