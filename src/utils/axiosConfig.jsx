import axios from 'axios';

const api = axios.create({
    baseURL : '',
    withCredentials: true, 
});


api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if(error.response?.status === 401 ) {
        try {
          const refreshResponse =  await axios.post('/api/auth/refresh');
          return axios(originalRequest); // 갱신 후 원래 요청 재시도
        }catch (refreshError) {
          //여기에 AUTH에 있는 logout 불러오기
          console.log("갱신 실패 로그아웃 로직 실행해야함");
          window.location.replace('/login')
          return Promise.reject(refreshError); // 추가 에러 처리 방지
        }
      }
    }
  );


export default api;

// alert("토큰이 만료되었습니다.");
// console.error('리프레시 갱신 실패임:', refreshError);
// setIsAuthenticated(false);
// setUser(null);
// // 여기 "/login" 으로 이동시키기
// window.location.replace('/login')