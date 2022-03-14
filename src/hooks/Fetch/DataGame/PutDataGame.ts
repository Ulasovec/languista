import {useMutation,useQueryClient} from "react-query";
import axios from "axios";



export default function usePutDataGame() {
    const queryClient = useQueryClient();

    const mutationCreate = useMutation(postData,{
        onSuccess: () => {
            queryClient.invalidateQueries(['game']);
        },
    });
    async function postData(newData:any){
        return axios.put<any>(`http://localhost:1337/api/bases/1`,newData);
    }
    return  mutationCreate;
}
