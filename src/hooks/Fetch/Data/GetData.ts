import {useQuery} from "react-query";
import axios from "axios";

export default function useGetData() {

    const query = useQuery(['dataBase'], async () => {
        const response = await axios.get<any>(`http://localhost:1337/api/databases`);
        // console.log('GET database: ', response.data);
        return response.data;
    });
    return query;
}