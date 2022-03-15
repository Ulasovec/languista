import {useMutation,useQueryClient} from "react-query";
import axios from "axios";
import {useContext} from "react";
import AppContext from "../../../context/AppContext";

export default function usePutDataGame() {
    const queryClient = useQueryClient();
    const {jwt} = useContext(AppContext);

    const mutationCreate = useMutation(postData,{
        onSuccess: () => {
            queryClient.invalidateQueries(['game']);
        },
    });
    async function postData(newData:any){
        return axios.put<any>(`http://localhost:1337/api/bases/${newData.id}`,newData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
    }
    return  mutationCreate;
}
