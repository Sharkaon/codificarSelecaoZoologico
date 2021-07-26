import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {
    makeStyles,
    Grid,
    Snackbar
} from '@material-ui/core';
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

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [resultado, setResultado] = useState("");
    const [usuario, setUsuario] = useContext(Contexto);

    let history = useHistory();

    useEffect(() => {
        const usuarioArmazenadoString = localStorage.getItem("@App:usuario");
        const usuarioArmazenado = JSON.parse(usuarioArmazenadoString);

        if (usuarioArmazenado){
            setUsuario(usuarioArmazenado);
        }
    }, []);

    useEffect(() => {
        if(usuario!==null){
            if(usuario.email!==undefined){
                history.push("/inicio");
            }
        }
        console.log(usuario);
    }, [usuario]);

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changeSenha = (e) => {
        setSenha(e.target.value);
    };

    const clickLogin = () => {
        axios.post("/usuarios/autenticar", {
            email: email,
            senha: senha,
            tipo: props.ehZelador
        }).then((response) => {
            if(response.data.length > 0){
                setUsuario(response.data[0]);
                localStorage.setItem("@App:usuario", JSON.stringify(response.data[0]));
                history.push("/inicio");
            }else{
                setSenha("");
                setResultado("Erro");
            }
        }).catch(() => {
            setSenha("");
            setResultado("Erro");
        });
    };

    const _handleCloseSnackbar = () => {
        setResultado("");
    };

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
                    textoBotao={"Entrar"}
                />
            </Grid>
            <Grid item>
                {props.ehZelador?
                <Typography onClick={() => {history.push("/login");}}>Clique aqui para entrar como animal</Typography>
                :
                <Typography onClick={() => {history.push("/loginZelador");}}>Clique aqui para entrar como Zelador</Typography>
                }
            </Grid>
            <Grid item>
                <Snackbar
                    open={resultado==="Erro"}
                    autoHideDuration={6000}
                    onClose={_handleCloseSnackbar}
                    action={
                        <React.Fragment>
                            Erro ao autenticar. E-mail ou senha incorreto.
                        </React.Fragment>
                    }
                />
            </Grid>
        </Grid>
    );
}
 
export default Login;