import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import ZeladorCadastro from './pages/ZeladorCadastro';
import Match from './pages/Match';
import Contexto from './Contexto';

const Router = () => {
    const contextoState = useState({});

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Intro/>
                    </Route>
                    <Route exact path="/login">
                        <Contexto.Provider value={contextoState}>
                            <Login ehZelador={0}/>
                        </Contexto.Provider>
                    </Route>
                    <Route path="/loginZelador">
                        <Contexto.Provider value={contextoState}>
                            <Login ehZelador={1}/>
                        </Contexto.Provider>
                    </Route>
                    <Route path="/inicio">
                        <Contexto.Provider value={contextoState}>
                            <Inicio/>
                        </Contexto.Provider>
                    </Route>
                    <Route path="/zelador">
                        <Contexto.Provider value={contextoState}>
                            <ZeladorCadastro/>
                        </Contexto.Provider>
                    </Route>
                    <Route path="/match/:nomeCientifico?/:apelido?/:ala?">
                        <Contexto.Provider value={contextoState}>
                            <Match/>
                        </Contexto.Provider>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Router;

if (document.getElementById('router')) {
    ReactDOM.render(<Router />, document.getElementById('router'));
}
