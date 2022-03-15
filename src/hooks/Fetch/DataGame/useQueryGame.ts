import {useContext} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import AppContext from "../../../context/AppContext";

export const useQueryGame = () => {
    const {jwt} = useContext(AppContext);
    const queryGame = useQuery(['game', jwt], async () => {
        const response = await axios.get('http://localhost:1337/api/bases?pagination[limit]=1', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    }, {enabled: !!jwt});
    return queryGame;
}