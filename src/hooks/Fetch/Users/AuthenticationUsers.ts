import {useMutation} from "react-query";
import axios from "axios";
import {useContext} from "react";
import AppContext from "../../../context/AppContext";

export default function  useAuthentication(){
    const {setJwt} = useContext(AppContext);
    const mutationAuthentication = useMutation(credentials => {
        return axios.post('http://localhost:1337/api/auth/local', credentials);
    }, {onSuccess: (data) => setJwt(data.data.jwt)});
    return mutationAuthentication;
}

