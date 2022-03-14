import {useQuery} from "react-query";
import axios from "axios";

export default function UseGetDataGame() {

    const query = useQuery(['game'], async () => {
        const response = await axios.get(`http://localhost:1337/api/bases/1`);
        // console.log('GET database: ', response.data);
        return response.data;
    });
    return query;
}