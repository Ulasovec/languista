import {useContext} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import AppContext from "../../../context/AppContext";

export const useQueryMe = () => {
    const {jwt} = useContext(AppContext);
    const queryMe = useQuery(['me', jwt], async () => {
        const response = await axios.get('http://localhost:1337/api/users/me', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    }, {enabled: !!jwt});
    return queryMe;
}