import React from 'react';
import { useHistory } from 'react-router';
import {
    makeStyles,
    Typography,
    Grid,
    Button
} from '@material-ui/core';

const useStyles = makeStyles({
    pagina: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '5%'
    }
});

const Intro = () => {
    let classes = useStyles();

    let history = useHistory();

    const _handleClickButtonEntrar = () => {
        history.push("/login")
    }

    return (
        <div>
            <Grid container className={classes.pagina}>
                <Grid item>
                    <Typography align="center">Esse projeto foi feito para a terceira etapa do processo seletivo da empresa Codificar Sistemas Tecnológicos</Typography>
                </Grid>
                <Grid item>
                    <Typography align="center">Nesse sistema os usuários tem 2 níveis: Zelador e Animal.<br/>Os Zeladores são responsáveis por cadastrar outros usuários.<br/>Enquanto que os animais avaliam os outros animais.</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={_handleClickButtonEntrar} variant="outlined">Entrar</Button>
                </Grid>
            </Grid>
        </div>
    );
}
 
export default Intro;