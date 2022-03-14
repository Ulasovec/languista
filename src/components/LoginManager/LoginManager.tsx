import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginFormTS from './LoginFormTS';

const LoginManager = () => {
    const [openModal, setOpenModal] = useState(false);

    function handleOpen() {
        setOpenModal(true);
    }

    function handleClose() {
        setOpenModal(false);
    }

    function handleRequests(action: any) {
        console.log('LOGIN action: ', action);
        handleClose();
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    };

    // @ts-ignore
    return (
        <div>
            <Button color="inherit" onClick={handleOpen}>Login</Button>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <LoginFormTS
                        noForgotPassword
                        onLogin={(data: any) => handleRequests({type: 'login', payload: data})}
                        isError={false}
                        errorMessage={''}
                        disabled={false}
                        i18n={undefined}
                        onForgotPassword={function (f: any): void {
                            throw new Error('Function not implemented.');
                        }}/>
                </Box>
            </Modal>
        </div>
    );
};

export default LoginManager;