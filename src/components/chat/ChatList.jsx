import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {
  const [chatlist, setChatlist] = useState([]);     // 채팅 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/chatlist?page=${currentPage}&size=${pageSize}`);
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatList();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">채팅방을 생성하세요</div>
        </div>
      ) : (
        <>
          {posts.map(post => (
            <div key={post.id} 
            className ="card bg-to-br to-blue-50 shadow-lg mt-8 mb-6 max-w-2xl mx-auto 
              transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1 
                    active:scale-95 cursor-pointer
  border-2 border-gray-200 hover:border-purple-300 
  transition-colors duration-300

            "
            onClick={()=> handlePostClick(post.id)}
            >
              <div className ="card-body p-6 ">
                <div className ="flex items-center justify-between mb-4">
                  <div className ="flex items-center space-x-3">
                    <div className ="avatar">
                      <div className ="w-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        UX
                      </div>
                    </div>
                    <div>
                      <h3 className ="font-bold">자유 게시판</h3>
                      <p className ="text-sm text-gray-500">@{post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className ="btn btn-ghost btn-sm">✨ Follow</button>
                </div>

                <h2 className ="card-title text-2xl mb-3">{post.title}</h2>
                <p className ="text-gray-700 mb-4">{post.content}</p>

                <div className ="flex justify-between items-center">
                  {/* <div class="flex gap-2">
                    <span class="badge badge-outline">#디자인</span>
                    <span class="badge badge-outline">#트렌드</span>
                  </div> */}
                  <div className="flex items-center gap-4 text-gray-500">
                    <button className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      {post.commentCount}
                    </button>
                    <button className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      {post.likeCount}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}


          {/* 페이지 네이션 */}
          <div className="join flex justify-center mt-8">
            <button
              className="join-item btn"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              «
            </button>
            <button className="join-item btn">
              {currentPage + 1} / {totalPages}
            </button>
            <button
              className="join-item btn"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            >
              »
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatList;