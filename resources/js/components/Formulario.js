import React from 'react';
import BotaoVerde from './BotaoVerde';
import InputVerde from './InputVerde';
import {
    makeStyles,
    Grid,
    Typography
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

const useStyles = makeStyles({
    pagina: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '2%'
    }
});

const Formulario = (props) => {
    const classes = useStyles();

    const _handleChangeEmail = (e) => {
        props.changeEmail(e);
    };

    const _handleChangeNome = (e) => {
        props.changeNome(e);
    };

    const _handleChangeSenha = (e) => {
        props.changeSenha(e);
    };

    const _handleChangeApelido = (e) => {
        props.changeApelido(e);
    };

    const _handleChangeAla = (e) => {
        props.changeAla(e);
    };

    const _handleClickButton = () => {
        props.clickButton();
    };

    const _handleChangeImagem = (e) => {
        props.changeImagem(e.target.files[0]);
    };

    const _handleClickCancelImage = () => {
        props.apagarImagem();
    };

    return (
        <Grid container className={classes.pagina} spacing={1}>
            {props.login ?
            <>
                <Grid item>
                    <InputVerde
                        label="Email"
                        variant="outlined"
                        onChange={_handleChangeEmail}
                        value={props.email}
                    />
                </Grid>
                <Grid item>
                    <InputVerde
                        label="Senha"
                        variant="outlined"
                        onChange={_handleChangeSenha}
                        value={props.senha}
                    />
                </Grid>
            </> : null
            }
            {props.procurar ?
            <>
                <Grid item>
                    <InputVerde
                        label="Nome Científico"
                        variant="outlined"
                        onChange={_handleChangeNome}
                        value={props.nome}
                        xs={3}
                    />
                </Grid>
                <Grid item>
                    <InputVerde
                        label="Apelido"
                        variant="outlined"
                        onChange={_handleChangeApelido}
                        value={props.apelido}
                    />
                </Grid>
                <Grid item>
                    <InputVerde
                        label="Ala"
                        variant="outlined"
                        onChange={_handleChangeAla}
                        value={props.ala}
                    />
                </Grid>
            </> : null
            }
            {props.cadastrar ?
            <Grid item>
                <BotaoVerde component="label" htmlFor="inputImagem">
                    Upload de Imagem
                </BotaoVerde>
                <input
                    id="inputImagem"
                    type="file"
                    hidden
                    onChange={_handleChangeImagem}
                />
                {props.imagem ?
                    <Typography>{props.imagem.name}<Cancel onClick={_handleClickCancelImage}/></Typography>
                : null}
            </Grid>: null
            }
            <Grid item>
                <BotaoVerde
                    onClick={_handleClickButton}
                    size="large"
                >
                    {props.textoBotao}
                </BotaoVerde>
            </Grid>
        </Grid>
    );
}
 
export default Formulario;