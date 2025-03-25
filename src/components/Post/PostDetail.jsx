import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';
import PostBody from '../Post/PostBody';
import CommentSection from '../comment/CommentSection';
import { countComments } from '../comment/CommentUtils';

// 메인 페이지 
const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, user } = useAuth();
    const [content, setContent] = useState('');
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postResponse = await axios.get(`/api/posts/${postId}`);
                const commentsResponse = await axios.get(`/api/posts/${postId}/comments`);
                const likesResponse = await axios.get(`/api/posts/${postId}/likes`);
                console.log("응답온 댓글 데이터", postResponse.data);
                setPost(postResponse.data);
                setComments(commentsResponse.data);
                setIsLiked(likesResponse.data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleCommentSubmit = async (e, parentId) => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        e.preventDefault();
        if (!content.trim()) {
            return;
        }
        try {
            console.log("유저정보", user);
            const commentRequest = {
                author: user.id,
                content: content,
                postId: postId,
                parentId: parentId,
            }
            await axios.post(`/api/posts/${postId}/comments`, commentRequest);
            setContent('');
            setReplyingToCommentId(null);

            // 댓글 추가 후 댓글 리스트 새로고침
            const commentsResponse = await axios.get(`/api/posts/${postId}/comments`);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('댓글 제출 오류:', error)
        }
    };

    const handleReplyButtonClick = (commentId) => {
        console.log("댓글 실행", replyingToCommentId);
        if (replyingToCommentId === commentId) {
            setReplyingToCommentId(null);
        } else {
            setReplyingToCommentId(commentId);
        }
    };

    const handleDelete = async (commentId) => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
            // 댓글 삭제 후 댓글 리스트 새로고침
            const commentsResponse = await axios.get(`/api/posts/${postId}/comments`);
            setComments(commentsResponse.data);
        } catch (error) {
            alert("사용자 권한이 없습니다");
            console.error('댓글 삭제 오류:', error);
        }
    };

    const chatStart = async (commentAuthor) => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        
        try {
            console.log("채팅방 생성 작성자 , 상대", user.name)
            const createChatRoomResponse = await axios.post('/api/chatroom', { memberName : user.name , opponentName: commentAuthor })
            navigate(`/chat/${createChatRoomResponse.data}`);
        } catch (error) {
            alert("사용자 권한이 없습니다");
            console.error('채팅방 생성 오류:', error);
        }
    }



    if (loading) return <div className="text-center py-8">로딩 중...</div>;


    if (error) return <div className="text-center py-8 text-red-500">오류 발생: {error}</div>;
    if (!post) return <div className="text-center py-8">게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PostBody
                post={post}
                comments={comments}
                navigate={navigate}
                countComments={countComments}
                isAuthenticated={isAuthenticated}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                user={user}
            />

            <CommentSection
                comments={comments}
                isAuthenticated={isAuthenticated}
                content={content}
                setContent={setContent}
                handleCommentSubmit={handleCommentSubmit}
                handleReplyButtonClick={handleReplyButtonClick}
                handleDelete={handleDelete}
                setComments={setComments}
                countComments={countComments}
                navigate={navigate}
                replyingToCommentId={replyingToCommentId}
                chatStart={chatStart}
            />
        </div>
    );
};

export default PostDetail;
