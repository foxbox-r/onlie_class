import Api from "../../lib/customAxios"

class MeApi {

    async refreshMyInfo(userId){
        try{
            console.log("userId",userId);
            const {data} = await Api.get(`/me/${userId}`);

            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"자신의 정보를 요청하는 과정에서 에러"
            };
        }
    }

    async setMyInfo(settingInfo){//{name,grade,class,number,email,profile_img,userId}
        try{
            const body = {...settingInfo};

            const {data} = await Api.patch("/me",body);
            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"자신의 정보수정을 요청하는 과정에서 에러"
            };
        }
    }
}

export default new MeApi();