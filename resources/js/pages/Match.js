import React, {
    useEffect,
    useState,
    useContext
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
    Grid,
    CircularProgress
} from '@material-ui/core';
import {
    ThumbUp,
    ThumbDown,
    ArrowBack
} from '@material-ui/icons';
import BotaoVerde from '../components/BotaoVerde';
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
    },
    botao: {
        width: '50%',
        borderRadius: '0'
    }
});

const Match = () => {
    const classes = useStyles();

    const [carregando, setCarregando] = useState(true);
    const [usuariosAvaliados, setUsuariosAvaliados] = useState([]);
    const [usuario, setUsuario] = useContext(Contexto);
    const { nomeCientifico, apelido, ala } = useParams();

    let history = useHistory();

    useEffect(() => {
        console.log("Effect");

        if(usuario.ehZelador!=0){
            history.push("/login");
        };

        const formData = new FormData();
        formData.append("usuario_id", usuario.usuario_id);

        if (nomeCientifico) {
            formData.append("nomeCientifico", nomeCientifico);
        }
        if (apelido) {
            formData.append("apelido", apelido);
        }
        if (ala) {
            formData.append("ala", ala);
        }

        axios.post('../../../../usuarios/match', formData).then((response) => {
            console.log(response);
            setUsuariosAvaliados(response.data);
            setCarregando(false);
        });
    }, []);

    const _handleClickAvaliar = (avaliado_id, ehPositiva, key) => {
        axios.post('../../../../avaliacoes/criar', {
            avaliado_id: avaliado_id,
            avaliador_id: usuario.usuario_id,
            ehPositiva: ehPositiva
        }).then((response) => {
            console.log(response);
        });

        let novosUsuariosAvaliados = usuariosAvaliados.slice();
        novosUsuariosAvaliados.splice(key, 1);
        setUsuariosAvaliados(novosUsuariosAvaliados);
    };

    const _handleClickArrowBack = () => {
        history.push("/inicio");
    };

    const zerarUsuario = () => {
        localStorage.removeItem('@App:usuario');
        setUsuario(null);
        history.push("/login");
    };

    return (
        <div>
            <Header zerarUsuario={zerarUsuario}/>
            <Grid container className={classes.pagina} spacing={3}>
                {carregando?
                <CircularProgress disableShrink/>
                :
                null}
                {usuariosAvaliados.map((avaliado, key) => 
                    <Grid item key={key}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={avaliado.imagem}
                            />
                            <CardContent>
                                <Typography variant="h4" component="h2">
                                    {avaliado.apelido}
                                </Typography>
                                <Typography variant="h5" color="textSecondary" component="h3">
                                    {avaliado.nomeCientifico}
                                </Typography>
                                <Typography variant="h5" color="textSecondary" component="p">
                                    {avaliado.ala}
                                </Typography>
                            </CardContent>
                            <BotaoVerde
                                onClick={() => {_handleClickAvaliar(avaliado.usuario_id, 1, key)}}
                                className={classes.botao}
                                >
                                <ThumbUp/>
                            </BotaoVerde>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {_handleClickAvaliar(avaliado.usuario_id, 0, key)}}
                                className={classes.botao}>
                                <ThumbDown/>
                            </Button>
                        </Card>
                    </Grid>)}
                {usuariosAvaliados.length==0 && carregando==false?
                <Grid item>
                    <Typography>Você já votou em todos animais! Obrigado pelo seu feedback!</Typography>
                </Grid>
                : null}
                    <Grid item onClick={_handleClickArrowBack}>
                        <ArrowBack/>Voltar para a pesquisa.
                    </Grid>
            </Grid>
            <Footer/>
        </div>
    );
}
 
export default Match;