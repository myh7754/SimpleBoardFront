import axios from 'axios';

const api = axios.create({
    baseURL : '',
    withCredentials: true, 
});


api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      console.log("에러 콘솔 : ", localStorage.getItem("loginCheck"));
      if (error.response?.status === 401 && localStorage.getItem("loginCheck") ==="true") {
        try {
          const refreshResponse = await api.post('/api/auth/refresh');
          console.log("갱신 시도", localStorage.getItem("loginCheck"));
          if (refreshResponse.status === 200) {
            return api(originalRequest); // 갱신 후 원래 요청 재시도
          } 
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
          setIsAuthenticated(false);
          setUser(null);
          localStorage.setItem("loginCheck", false);
          alert("토큰이 만료되었습니다.");
          // 여기 "/login" 으로 이동시키기
          window.location.replace('/login')
          return Promise.reject(refreshError); // 추가 에러 처리 방지
        }
      }
      window.location.replace('/login')
      return Promise.reject(error);
    }
  );

// export const PaginatedData = async (URL, page = 0, size = 10 ) => {
//     try {
//         const response = await api.get(URL, {
//             params: {page, size}
//         });
//         return {
//             data : response.data.content,
//             totalPages: response.data.totalPages,
//             currentPage : response.data.number,
//             error: null
//         };
//     } catch (error) {
//         console.error('페이징 데이터 조회 오류:', error);
//         return { data: [], totalPages: 0, currentPage: 0, error };
//     }
// };

export default api;