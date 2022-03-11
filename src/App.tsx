import React, {useContext, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {YMInitializer} from 'react-yandex-metrika';

import AppHeader from "components/AppHeader/AppHeader";
import StartGame from "components/Game/Game";
import Profile from "components/Profile/Profile";

import {game} from "./database/database";

import './App.css'
import {ROUTES} from "routes";
import Add from "./components/Add/Add";
import Translate from "./components/Translate/Translate";
import {IWordDTO} from "./models/WordDTO";
import MyBase from "./components/MyBase/MyBase";
import AppContext from "./context/AppContext";

const res: () => IWordDTO[] = () => {
    const temp = localStorage.getItem('base')
    const res = temp ? JSON.parse(temp) : []
    return res
}


function App() {

    const context = useContext(AppContext)

    console.log('context',context)

    useEffect(() => {
        const storage = localStorage.getItem('game')
        if (!storage) {
            localStorage.setItem('game', JSON.stringify(game))
        }
        const base = localStorage.getItem('base')
        if (!base) {
            localStorage.setItem('base', JSON.stringify([]))
        }
    }, [])


    return (

        <div className='App'>
            <AppHeader/>

            <main>
                <Routes>
                    <Route path={ROUTES.myBase} element={<MyBase/>}/>
                    <Route path={ROUTES.main} element={<StartGame/>}/>
                    <Route path={ROUTES.profile} element={<Profile/>}/>
                    <Route path={ROUTES.translate}
                           element={res().length > 4 ? <Translate words={res()}/> :
                               <div>Мало слов или попробуйте перезапустить страницу!</div>}/>
                    <Route path={ROUTES.add} element={<Add/>}/>
                </Routes>

            </main>
            <YMInitializer accounts={[87710163]} options={{webvisor: true}}/>
        </div>

    );
}

export default App;
