import React from 'react';
import { ExitToApp } from '@material-ui/icons';
import logoMatch from '../../imgs/logoMatchNoBg.png';
import '../../css/app.css';

const Header = (props) => {
    const _handleClickLogout = () => {
        props.zerarUsuario();
    }

    return (
        <div>
            <img src={logoMatch} className="logoMatch"/>
            <ExitToApp onClick={_handleClickLogout} fontSize="large"/>
        </div>
    );
}
 
export default Header;