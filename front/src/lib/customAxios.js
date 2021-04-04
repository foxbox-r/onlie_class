import axios from "axios";
import env from "../env"

const Api = axios.create({
    baseURL:env.BACK_ADDRESS,
    timeout:5000,
    withCredentials: true, // 다른 도메인간에 쿠키설정을 위해
});

Api.interceptors.request.use(
    function(config){ // 요청 성공 직전
        // console.log("요청 전에 로그",config);
        const token = localStorage.getItem("accessToken");

        if(token !== null){
            config.headers["Authorization"] = `Bearer ${token}`;
        } 

        return config;
    },
    function(error){ // 에러
        console.log(error);
    }
)

Api.interceptors.response.use(
    function(response){ // 응답 성공 직전
        // console.log("응답 전에 로그",response);
        return response;
    },
    function(error){ // 에러
        console.log(error);
    }
)

export default Api;