import React, {useEffect, useState} from 'react';
import {game} from "database/database";
import MyBase from "../MyBase/MyBase";
import Typography from "@mui/material/Typography";
import UseGetDataGame from "../../hooks/Fetch/DataGame/GetDataGame";
import {useQueryMe} from "../../hooks/Fetch/Users/useQueryMe";
import {useQueryGame} from "../../hooks/Fetch/DataGame/useQueryGame";




const Profile = () => {

    //const gameData = UseGetDataGame();
    const gameData = useQueryGame();
    const correct = gameData.data?.data[0]?.attributes.correct
    const wrong = gameData.data?.data[0]?.attributes.wrong
    const queryMe = useQueryMe()
    console.log(queryMe)
    const userName = queryMe?.data?.username
    return (
        <div>
            <Typography align='center' variant="h2" gutterBottom>{(queryMe.isLoading)? 'загрузка...' : `Ваше имя ${userName}`}</Typography>
            <Typography variant="h5">
                Количество правильных ответов:{(gameData.isLoading)? 'загрузка...' : `${correct}`}
            </Typography>
            <br/>
            <Typography variant="h5">
                Количество неправильных ответов:{(gameData.isLoading)? 'загрузка...' : `${wrong}`}
            </Typography>
            <br/>
            <Typography variant="h6">
                Спасибо, что пользуетесь нашим приложением! Надеемся, что вы получаете от него пользу. Будем рады
                услышать ваши отзывы и пожелания в телеграмм-чате:
            </Typography>
            <Typography variant="h5">
                <a href='https://t.me/languista' style={{color: 'blue'}}>https://t.me/languista</a>
            </Typography>
            <MyBase/>
        </div>
    );
};

export default Profile;
