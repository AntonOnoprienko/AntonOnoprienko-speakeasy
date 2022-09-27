import React from 'react';
import { Route, Routes } from 'react-router-dom'
import GamePage from "../../pages/GamePage";
import AddingPage from "../../pages/AddingPage";
import ResultsPage from "../../pages/ResultsPage";
import MainPage from "../../pages/MainPage";
import classes from "./App.module.css";
import { Layout } from '../layout/Layout';


function App() {
    return (
        <div className={classes.app}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='main' element={<MainPage />} />
                    <Route path='game' element={<GamePage />} />
                    <Route path='adding' element={<AddingPage />} />
                    <Route path='results' element={<ResultsPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;