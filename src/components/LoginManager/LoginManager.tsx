import React, {useContext, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginFormTS from './LoginFormTS';
import RegisterFormTS from './RegisterFormTS';
import useRegistration from "../../hooks/Fetch/Users/RegistrationUsers";
import useAuthentication from "../../hooks/Fetch/Users/AuthenticationUsers";
import {useQueryMe} from "../../hooks/Fetch/Users/useQueryMe";
import AppContext from "../../context/AppContext";
import {ROUTES} from "../../routes";
import {Link} from "react-router-dom";

const LoginManager = () => {
    const {jwt, setJwt} = useContext(AppContext)
    const [openModalAuth, setOpenModalAuth] = useState(false);
    const [openModalReg, setOpenModalReg] = useState(false);
    const queryMe = useQueryMe();
    const usersRegistration = useRegistration();
    const usersAuthentication = useAuthentication();

    // --- Authentication
    function handleOpenAuth() {
        setOpenModalAuth(true);
    }

    function handleCloseAuth() {
        setOpenModalAuth(false);
    }

    function handleRequestAuth(data: any) {
        console.log('LOGIN action: ', data);
        usersAuthentication.mutate(data)
        handleCloseAuth();
    }

    // --- Registration

    function handleOpenReg() {
        setOpenModalReg(true);
    }

    function handleCloseReg() {
        setOpenModalReg(false);
    }

    function handleRequestReg(data: any) {
        console.log('Reg action: ', data);
        usersRegistration.mutate(data)
        handleCloseReg();
    }

    // ---

    function handleLogout() {
        setJwt(undefined);
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
            { jwt
                ? <>
                    <Link to={ROUTES.profile}> <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'flex', md: 'flex'}}}
                    >
                        {queryMe?.data?.username}
                    </Typography></Link>
                    {/*<Button color="inherit" onClick={}>{queryMe?.data?.username}</Button>*/}
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
                : <>
                    <Button color="inherit" onClick={handleOpenAuth}>Login</Button>
                    <Button color="inherit" onClick={handleOpenReg}>Reg</Button>
                </>
            }


            <Modal open={openModalReg} onClose={handleCloseReg}>
                <Box sx={style}>
                    <RegisterFormTS
                        onRegister={(data: any) => handleRequestReg(data)}
                    />
                </Box>
            </Modal>

            <Modal open={openModalAuth} onClose={handleCloseAuth}>
                <Box sx={style}>
                    <LoginFormTS
                        onLogin={(data: any) => handleRequestAuth(data)}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default LoginManager;