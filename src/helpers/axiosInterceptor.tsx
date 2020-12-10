import Axios from 'axios';

const axiosInstance = Axios.create({
  timeout: 10000,
});

//add token to all request, for authorization header
axiosInstance.interceptors.request.use(function(config) {
  //   const token = localStorage.getItem("token");
  //   config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosInstance.interceptors.response.use(
  function(response) {
    // Send payload direct
    return response.data;
  },

  async function(error) {
    // For Refresh Token being used on system
    // const originalRequest = error.config;
    // if (error?.response?.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const access_token = await refreshAccessToken();
    //     const token = access_token.data.token;
    //     const refToken = access_token.data.refreshToken;
    //     Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    //     localStorage.setItem('ref_token', refToken);
    //     localStorage.setItem('token', token);
    //     return axiosInstance(originalRequest);
    //   } catch (err) {
    //     window.location.href = 'https://app.skipthetoolbox.com/login';
    //   }
    // }
    if (error.response && error.response.data) {
      //send error payload only
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        message: 'Some unusual error occured, please try again',
      });
    }
  },
);

export default axiosInstance;
