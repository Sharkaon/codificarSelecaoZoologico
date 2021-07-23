import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Grid } from '@material-ui/core';
import BotaoVerde from '../components/BotaoVerde';
import Formulario from '../components/Formulario';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contexto from '../Contexto';

const useStyles = makeStyles({
    pagina: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '5%'
    }
});

const Inicio = () => {
    const classes = useStyles();

    const [configuracoesBusca, setConfiguracoesBusca] = useState(false);
    const [textoConfiguracoesBusca, setTextoConfiguracoesBusca] = useState("Procurar");
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [ala, setAla] = useState("");
    const [usuario, setUsuario] = useContext(Contexto);

    useEffect(() => {
        if(usuario.ehZelador!=0){
            history.push("/login");
        }
    }, []);

    let history = useHistory();

    const _handleClickMatch = () => {
        history.push('/match');
    };

    const _handleClickConfiguracoesBusca = () => {
        if (configuracoesBusca){
            setTextoConfiguracoesBusca("Procurar");
        } else {
            setTextoConfiguracoesBusca("Fechar");
        }
        setConfiguracoesBusca(!configuracoesBusca);
    };

    const clickProcurar = () => {
        history.push(`/match/${nome}/${apelido}/${ala}`);
    };

    const changeNome = (e) => {
        setNome(e.target.value);
    };

    const changeApelido = (e) => {
        setApelido(e.target.value);
    };

    const changeAla = (e) => {
        setAla(e.target.value);
    };

    const zerarUsuario = () => {
        localStorage.removeItem('@App:usuario');
        setUsuario(null);
        history.push("/login");
    };

    return (
        <div>
            <Header zerarUsuario={zerarUsuario}/>
            <Grid container className={classes.pagina} spacing={1}>
                <Grid item>
                    <BotaoVerde onClick={_handleClickMatch} size="large">MATCH!</BotaoVerde>
                </Grid>
                <Grid item>
                    <BotaoVerde onClick={_handleClickConfiguracoesBusca}>{textoConfiguracoesBusca}</BotaoVerde>
                </Grid>
                {configuracoesBusca ?
                <Formulario
                    procurar
                    nome={nome}
                    changeNome={changeNome}
                    apelido={apelido}
                    changeApelido={changeApelido}
                    ala={ala}
                    changeAla={changeAla}
                    clickButton={clickProcurar}
                    textoBotao={'Procurar'}
                />: null
                }
            </Grid>
            <Footer/>
        </div>
    );
}
 
export default Inicio;