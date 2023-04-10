import axios from "axios";

const jwtInterceoptor = axios.create({});

let setLogout;

jwtInterceoptor.setLogout = (logout) => {
    setLogout = logout;
};

jwtInterceoptor.interceptors.request.use((config) => {
    let tokensData = JSON.parse(localStorage.getItem("tokens"));
    config.headers.common["Authorization"] = `bearer ${tokensData.accessToken}`;
    config.headers.common["x-access-token"] = tokensData.accessToken;
    return config;
});

jwtInterceoptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            const authData = JSON.parse(localStorage.getItem("tokens"));
            const payload = {
                access_token: authData.accessToken,
                refresh_token: authData.refreshToken,
            };
            try {


                let apiResponse = await axios.post(
                    "http://localhost:5000/auth/refreshtoken",
                    payload
                );


                localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
                error.config.headers[
                    "Authorization"
                    ] = `bearer ${apiResponse.data.accessToken}`;
                error.config.headers["x-access-token"] = apiResponse.data.accessToken;
                return axios(error.config);
            } catch (err) {
                if (err.response.status === 403 && err.response.data.message === 'Refresh token was expired. Please make a new signin request') {
                    setLogout();
                }
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export default jwtInterceoptor;
