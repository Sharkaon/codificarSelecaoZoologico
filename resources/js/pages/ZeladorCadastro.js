import React, {
    useState,
    useContext,
    useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import {
    makeStyles,
    Grid,
    Snackbar
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import Formulario from '../components/Formulario';
import RadioVerde from '../components/RadioVerde';
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

const ZeladorCadastro = () => {
    const classes = useStyles();

    const [resultado, setResultado] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState("Animal");
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [ala, setAla] = useState("");
    const [imagem, setImagem] = useState(null);
    const [usuario, setUsuario] = useContext(Contexto);

    let history = useHistory();

    useEffect(() => {
        if(usuario.ehZelador!=1){
            history.push("/login");
        }
    }, []);


    const _handleCloseSnackbar = (e) => {
        setResultado("");
    };

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changeSenha = (e) => {
        setSenha(e.target.value);
    };
    
    const _handleChangeTipo = (e) => {
        setTipo(e.target.value);
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

    const changeImagem = (e) => {
        setImagem(e);
    };

    const apagarImagem = () => {
        setImagem(null);
    };

    const clickCadastrarAnimal = () => {
        const formData = new FormData();
        formData.append("image", imagem);

        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: "Client-ID be211abe947ce8d",
            },
            body: formData
        }).then((response) => response.json()).then((response) => {
            axios.post('/usuarios/cadastrarUsuario', {
                email: email,
                senha: senha,
                nomeCientifico: nome,
                apelido: apelido,
                ala: ala,
                imagem: response.data.link
            }).then(() => {
                setResultado("Certo");
                setEmail("");
                setSenha("");
                setNome("");
                setApelido("");
                setAla("");
                setImagem("");
            }).catch(() => {
                setResultado("Erro");
            });
        }).catch(() => {
            setResultado("Erro");
        });
    };

    const clickCadastrarZelador = () => {
        axios.post('/usuarios/cadastrarZelador', {
            email: email,
            senha: senha
        }).then(() => {
            setResultado("Certo");
            setEmail("");
            setSenha("");
        }).catch(() => {
            setResultado("Erro");
        });
    };

    const zerarUsuario = () => {
        localStorage.removeItem('@App:usuario');
        setUsuario(null);
        history.push("/login");
    };

    const _handleClickArrowBack = () => {
        history.push("/inicio");
    };

    return (
        <div>
            <Header zerarUsuario={zerarUsuario}/>
            <Grid container className={classes.pagina} spacing={1}>
                <Snackbar
                    open={resultado==="Certo"}
                    autoHideDuration={6000}
                    onClose={_handleCloseSnackbar}
                    action={
                        <React.Fragment>
                            Registrado com sucesso.
                        </React.Fragment>
                    }
                />
                <Snackbar
                    open={resultado==="Erro"}
                    autoHideDuration={6000}
                    onClose={_handleCloseSnackbar}
                    action={
                        <React.Fragment>
                            Erro ao registrar.
                        </React.Fragment>
                    }
                />
                <div>
                    <RadioVerde
                        checked={tipo==='Animal'}
                        onChange={_handleChangeTipo}
                        value="Animal"
                        inputProps={{ 'aria-label': 'Animal' }}
                        label="Animal"
                    />Animal
                    <RadioVerde
                        checked={tipo==='Zelador'}
                        onChange={_handleChangeTipo}
                        value="Zelador"
                        inputProps={{ 'aria-label': 'Zelador' }}
                        label="Zelador"
                    />Zelador
                </div>
                {tipo === 'Animal'?
                <Formulario
                    login
                    procurar
                    cadastrar
                    nome={nome}
                    changeNome={changeNome}
                    senha={senha}
                    changeSenha={changeSenha}
                    apelido={apelido}
                    changeApelido={changeApelido}
                    ala={ala}
                    changeAla={changeAla}
                    email={email}
                    changeEmail={changeEmail}
                    clickButton={clickCadastrarAnimal}
                    textoBotao={'Cadastrar'}
                    imagem={imagem}
                    changeImagem={changeImagem}
                    apagarImagem={apagarImagem}
                />
                :
                <Formulario
                    login
                    email={email}
                    changeEmail={changeEmail}
                    senha={senha}
                    changeSenha={changeSenha}
                    clickButton={clickCadastrarZelador}
                    textoBotao={'Cadastrar'}
                />}
                <Grid item onClick={_handleClickArrowBack}>
                    <ArrowBack/>Voltar para o menu.
                </Grid>
            </Grid>
            <Footer/>
        </div>
    );
}

export default ZeladorCadastro;