import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';

const PostSave = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('로그인이 필요합니다');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('/api/posts', {
        title,
        content
      });
      
      if (response.status === 200) {
        navigate('/posts');
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      setError('게시글 작성에 실패했습니다.');
      alert('게시글 작성 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-2xl shadow-xl bg-base-100"> {/* max-width 확대 */}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title text-2xl font-bold mb-4">새 게시글 작성</h2>

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
                  onClick={() => navigate('/posts')}
                  className="btn btn-ghost"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  작성 완료
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

export default PostSave;