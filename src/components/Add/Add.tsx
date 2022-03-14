import React, {useReducer, useState} from 'react';
import {Grid, Input} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import usePostData from "../../hooks/Fetch/Data/PostData";
interface initialData{
    eng:string,
    rus: string,
}

const Add = () => {
    const [data , setData] = useReducer((data: initialData, action: any)=> ({...data,...action}),
        {eng:'',rus:''})
    const postData =usePostData();

    const handleSubmit = (e: any) => {
        e.preventDefault()
        postData.mutate({data:data})
        console.log(data)
        setData({eng:'',rus:''})

    }
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align='center' variant="h2" gutterBottom>ADD</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input required placeholder='English' fullWidth value={data.eng}
                           onChange={(event) => setData({eng:event.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <Input required placeholder='Russian' fullWidth value={data.rus}
                           onChange={e => setData({rus:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit' variant='contained' fullWidth>ADD</Button>
                </Grid>

            </Grid>
        </form>
    );
};

export default Add;