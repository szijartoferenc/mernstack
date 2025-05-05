import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'https://mernstack-server-i3q9.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE) {
            if (config.TYPE.params) {
                config.params = config.TYPE.params;
            } else if (config.TYPE.query) {
                config.url = `${config.url}/${config.TYPE.query}`;
            }
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    } 
)

axiosInstance.interceptors.response.use(
    function(response){
        //Stop global loader here
        return processResponse(response);
    },
    function(error){
        //Stop global loader here
        return Promise.reject(processError(error));
    }
)
///////////////////////
//If success-> return {isSuccess: true, data: Object}
// If fail -> return {isFailure: true, status: string, msg: string, code: int}
///////////////////////
const processResponse = (response) => {
    // Ha a státuszkód 2xx-es (200, 201, 204 stb.), akkor sikeres válaszként kezeljük
    if(response?.status >= 200 && response?.status < 300){
        return { 
            isSuccess: true, 
            data: response.data 
        };
    } else {
        return {
            isFailure: true,
            status: response?.status || "UNKNOWN",
            msg: response?.statusText || "Unknown error",
            code: response?.status || 500
        };
    }
};
///////////////////////
//If success-> return {isSuccess: true, data: Object}
// If fail -> return {isFailure: true, status: string, msg: string, code: int}
///////////////////////
const processError = (error) => {
    if(error.response){
       //Request made and server responded with a status other
       //that falls out of the range 2.x.x 
       console.log('ERROR IS RESPONSE: ', error.toJSON ? error.toJSON() : error);
       return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: error.response.status
       }

    }else if(error.request){
        //Request made but no response was received
        console.log('ERROR IS RESPONSE: ', error.toJSON ? error.toJSON() : error);
        return{
             isError: true,
             msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
             code: ""
        }
    }else{
        //Something happend in setting up request that triggers an error
        console.log('ERROR IS RESPONSE: ', error.toJSON ? error.toJSON() : error);
        return{
             isError: true,
             msg: API_NOTIFICATION_MESSAGES.networkError.message,
             code: ""
        }
    }
};

const API = {};

for(const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                    authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);

                }
            },
            onDownloadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);

                }
            }
        })
}

export{API};
