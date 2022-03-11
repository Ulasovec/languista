import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import Button from "@mui/material/Button";
// @ts-ignore
import _ from 'lodash'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {database} from "database/database";
import {IWordDTO} from "models/WordDTO";
import Typography from "@mui/material/Typography";
import MyModal from "../MyModal/MyModal";
import AppContext from "../../context/AppContext";
import useGetData from "../../hooks/Fetch/GetData";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


interface OptionsProps {
    list: IWordDTO[],
    onClick: (id: number) => void,
    state: boolean
}


const Options = ({list, onClick, state}: OptionsProps) => {
    const shuffled: IWordDTO[] = useMemo(() => _.shuffle(list)
        , [list])
    const res = shuffled.map((option, index) => {
        return (
            <li key={option.id}>
                <Button sx={{width: '100%'}} variant='contained'
                        onClick={() => onClick(option.id)}
                        size='large'
                >
                    {state ? option.rus : option.eng}
                </Button>
            </li>
        )
    })

    return (
        <ul className='Options'>
            {res}
        </ul>
    )
}

const StartGame = () => {
    const guery = useGetData();
    const dataQuery = guery.data?.data.map((item: { attributes: any, id :any })=> ({id:item.id , ...item.attributes}))
    const data = dataQuery?.map((item: any) => ({id:item.id, eng:item.eng, rus:item.rus})  )
    console.log(data);
    return (
        <>
            {guery.isLoading
                ? <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>
                : <Game data={data}/>
            }
        </>
    );
}

const Game = ({data}: any) => {

    const [open, setOpen] = useState(false);
        const {state} = useContext(AppContext)
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [modal, setModal] = useState('')

        const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
        const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>(undefined)
        const [newOne, setNewOne] = useState(0)
        const options: IWordDTO[] = useMemo(() => {
            return _.shuffle(data).slice(0, 4)
        }, [newOne])
        const [answer, setAnswer] = useState<number>(0)


        const checkAnswer = (e: any) => {
            e.preventDefault()
            const isCorrect = answer === options[0].id
            const storage = localStorage.getItem('game')
            if (storage) {
                const res = JSON.parse(storage)
                const {correct, wrong} = res
                if (isCorrect) {
                    res.correct = correct + 1
                } else {
                    res.wrong = wrong + 1
                }

                localStorage.setItem('game', JSON.stringify(res))
            }

            const text = isCorrect ? 'Верно!' : `Неверно! Верно: ${options[0].rus}`
            setModal(text)
            handleOpen()


            setNewOne(prevState => prevState + 1)
            setAnswer(0)
        }

        const selectAnswer = useCallback((id: number) => {
            setAnswer(id)
        }, [answer])

        useEffect(() => {
            const voicesArr = window.speechSynthesis.getVoices()
            console.log(voicesArr)
            if (voicesArr.length > 0) {
                const res = state ? voicesArr.find(x => x.lang === 'en-US' || x.lang === 'en-GB') : voicesArr.find(x => x.lang === 'ru-RU')
                setVoices(voicesArr)
                setVoice(res)
            }

        }, [window.speechSynthesis, voice, state])

        //if (!data) return null;

        let message = new SpeechSynthesisUtterance();
        message.lang = state ? 'en-US' : 'ru-RU';
        message.text = state ? options[0].eng : options[0].rus;
        if (voice) {
            message.voice = voice
        }

        return (
            <>
                <div className='game'>
                    <Typography align='center' variant="h2"
                                gutterBottom>{state ? options[0].eng : options[0].rus}</Typography>
                    <Button
                        sx={{width: '100%'}}
                        endIcon={<PlayCircleOutlineIcon/>} variant='contained' color='success'
                        onClick={() => {
                            speechSynthesis.speak(message)
                        }} size='large'>Speak</Button>

                      <Options list={options} onClick={selectAnswer} state={state}/>

                    <Button sx={{width: '100%'}} onClick={checkAnswer} variant='contained' color='warning'
                            disabled={answer === 0} size='large'>
                        Проверить
                    </Button>
                </div>
                <MyModal open={open} handleClose={handleClose} text={modal}/>
            </>
        );
    }
;

export default StartGame;
