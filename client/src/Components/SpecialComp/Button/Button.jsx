import { red } from '@material-ui/core/colors';
import React from 'react'
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import '../Button/Button.css'

const Button = (props) => {
    var btn_link=props.btn_link;

    const handleClick =() => {
    };

    const divStyle = {
        height: props.height,
        width: props.width,
        color: props.color,
        backgroundColor: props.btn_color,
        borderColor: props.btn_border,
        fontSize: props.font_size,

      };

        const history = useHistory();
        /*const handleClick = () => history.push('/foodie-signup');*/


    
    return ( 
        <div>
           <Link to={btn_link}><button onClick={props.OnClick} onMouseOver={handleClick} className="button" style={divStyle}>{props.title}</button></Link>
        </div>
     );
}
 
export default Button;