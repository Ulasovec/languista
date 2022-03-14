import React, {useEffect, useState} from 'react';
import {game} from "database/database";
import MyBase from "../MyBase/MyBase";
import Typography from "@mui/material/Typography";
import UseGetDataGame from "../../hooks/Fetch/DataGame/GetDataGame";

const Profile = () => {

    const gameData = UseGetDataGame();
    const correct = gameData.data?.data?.attributes.correct
    const wrong = gameData.data?.data?.attributes.wrong


    return (
        <div>
            <Typography align='center' variant="h2" gutterBottom>PROFILE</Typography>
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
