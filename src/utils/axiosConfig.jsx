import axios from 'axios';

const api = axios.create({
    baseURL : '',
    withCredentials: true, 
});

export const PaginatedData = async (URL, page = 0, size = 10 ) => {
    try {
        const response = await api.get(URL, {
            params: {page, size}
        });
        return {
            data : response.data.content,
            totalPages: response.data.totalPages,
            currentPage : response.data.number,
            error: null
        };
    } catch (error) {
        console.error('페이징 데이터 조회 오류:', error);
        return { data: [], totalPages: 0, currentPage: 0, error };
    }
};

export default api;