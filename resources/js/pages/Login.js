import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles, Grid } from '@material-ui/core';
import Formulario from '../components/Formulario';
import Contexto from '../Contexto';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const useStyles = makeStyles({
    pagina: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '5%'
    }
});

const Login = (props) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useContext(Contexto);

    let history = useHistory();

    useEffect(() => {
        const usuarioArmazenadoString = localStorage.getItem('@App:usuario');
        const usuarioArmazenado = JSON.parse(usuarioArmazenadoString);

        if (usuarioArmazenado){
            setUsuario(usuarioArmazenado);
        }
    }, []);

    useEffect(() => {
        if(usuario){
            if(usuario.ehZelador==="1"){
                history.push("/zelador");
            }
            if(usuario.ehZelador==="0"){
                history.push("/inicio");
            }
        }
    }, [usuario]);

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changeSenha = (e) => {
        setSenha(e.target.value);
    };

    const clickLogin = () => {
        axios.get(`/usuarios/autenticar/${email}/${senha}/${props.ehZelador}`).then((response) => {
            setUsuario(response.data[0]);
            localStorage.setItem('@App:usuario', JSON.stringify(response.data[0]));
        }).catch(() => {
            console.log("Erro");
        });
    }

    return (
        <Grid container className={classes.pagina} spacing={5}>
            <Grid item>
                    {props.ehZelador?
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3" align="center">Bem Vindo, Zelador!</Typography>
                    </ThemeProvider>
                    :
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3" align="center">Bem Vindo!</Typography>
                    </ThemeProvider>
                    }
                <Formulario
                    login
                    changeEmail={changeEmail}
                    changeSenha={changeSenha}
                    clickButton={clickLogin}
                    email={email}
                    senha={senha}
                    textoBotao={'Entrar'}
                />
            </Grid>
            <Grid item>
                {props.ehZelador?
                <Typography onClick={() => {history.push('/login');}}>Clique aqui para entrar como animal</Typography>
                :
                <Typography onClick={() => {history.push('/loginZelador');}}>Clique aqui para entrar como Zelador</Typography>
                }
            </Grid>
        </Grid>
    );
}
 
export default Login;