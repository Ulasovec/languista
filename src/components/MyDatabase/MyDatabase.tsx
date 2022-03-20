import React from 'react';
import useGetData from "../../hooks/Fetch/Data/GetData";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {IWordDTO} from "../../models/WordDTO";
import {Button, CssBaseline, TextField, Typography} from "@mui/material";

const MyDatabase = () => {

    const database = useGetData();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            eng: data.get('eng'),
            rus: data.get('rus'),
        });
    };

    function handleDelete(id: number): void {
    }

    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="eng"
                    label="English"
                    name="eng"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="rus"
                    label="Russian"
                    name="rus"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Добавить слово
                </Button>
            </Box>
            <CssBaseline />
            {
                database.isLoading
                    ? <Box sx={{display: 'flex'}}>
                        <CircularProgress/>
                    </Box>
                    : database.data.data.map(({id, attributes: {eng: eng, rus: rus}}: any) => (
                        <div key={id}>
                            {eng} : {rus}
                            <Button onClick={() => handleDelete(id)}>Delete</Button>
                        </div>
                    ))
            }
        </div>
    );
};

export default MyDatabase;