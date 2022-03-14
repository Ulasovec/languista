import {useMutation,useQueryClient} from "react-query";
import axios from "axios";



export default function usePostData() {
    const queryClient = useQueryClient();

    const mutationCreate = useMutation(postData,{
        onSuccess: () => {
            queryClient.invalidateQueries(['dataBase']);
        },
    });
    async function postData(newData:any){
        return axios.post<any>(`http://localhost:1337/api/databases`,newData);
    }
     return  mutationCreate;
}





