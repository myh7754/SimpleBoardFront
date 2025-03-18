import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';

const PostUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const { postData,postId } = location.state || {};

  // 폼 초기화
  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setContent(postData.content);
    }
  }, [postData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!postData) {
      alert('유효하지 않은 게시글입니다');
      return;
    }

    if (!isAuthenticated) {
      alert('로그인이 필요합니다');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(
        `/api/posts/${postId}`,
        { title, content },
      );
      
      if (response.status === 200) {
        navigate(`/posts/${postId}`);
      }
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      setError('게시글 수정에 실패했습니다.');
      alert('게시글 수정 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!postData) return <div className="text-center py-8">유효하지 않은 접근입니다</div>;

  return (
    <div className="w-full bg-white">
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-2xl shadow-xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title text-2xl font-bold mb-4">게시글 수정</h2>

              {/* 제목 입력 필드 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">제목</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              {/* 내용 입력 필드 */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">내용</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="내용을 입력하세요"
                  className="textarea textarea-bordered h-64"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-ghost"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  수정 완료
                </button>
              </div>

              {error && (
                <div className="mt-4 text-red-500 text-sm">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;