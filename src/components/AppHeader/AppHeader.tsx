import React, {useContext, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {ROUTES} from "routes";
import Button from "@mui/material/Button";
import {Box, Menu, MenuItem} from "@mui/material";
import AppContext from "../../context/AppContext";

import LoginManager from "../LoginManager/LoginManager";

const AppHeader = () => {
    const {setState} = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEngRus = () => {
        setState(true)
        setAnchorEl(null);
    };
    const handleRusEng = () => {
        setState(false)
        setAnchorEl(null);
    };
    const handleData = () => {

    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        <Link to={ROUTES.main}> <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'flex', md: 'flex'}}}
                        >
                            Languista
                        </Typography></Link>
                        {/*<Link to={ROUTES.profile}> <Typography*/}
                        {/*    variant="h6"*/}
                        {/*    noWrap*/}
                        {/*    component="div"*/}
                        {/*    sx={{mr: 2, display: {xs: 'flex', md: 'flex'}}}*/}
                        {/*>*/}
                        {/*    Profile*/}
                        {/*</Typography></Link>*/}
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            variant='contained'
                        >
                            Change
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            // onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleEngRus}>Eng-Rus</MenuItem>
                            <MenuItem onClick={handleRusEng}>Rus-Eng</MenuItem>

                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {/*<Button color="inherit">Login</Button>*/}
                        <LoginManager />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default AppHeader
