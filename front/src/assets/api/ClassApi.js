import Api from "../../lib/customAxios"

class JoinApi {

    async joinClass(code,userId){
        try{
            const body ={
                code,
                userId,
            };

            const {data} = await Api.post("/class/join",body);
            
            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"클래스참여를 요청하는 과정에서 에러"
            };
        }
    }

    async createClass(title,description,user_id){
        try{
            const body ={
                title,
                description,
                owner:user_id,
            };

            const {data} = await Api.post("/class",body);
            
            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"클래스만들기를 요청하는 과정에서 에러"
            };
        }
    }
}

export default new JoinApi();