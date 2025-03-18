// src/components/post/PostBody.js
import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

import axios from 'axios';


// 게시글 본문 컴포넌트
const PostBody = ({ post, comments, navigate, countComments, isAuthenticated, isLiked, setIsLiked}) => {
    const { postId } = useParams();
    const { user } = useAuth();
    const handleLikes = () => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        const likeResponse = axios.post(`/api/posts/${postId}/likes`);
        setIsLiked(!isLiked);
    }

    const handlePostEditor = () => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        console.log("user정보", user.name);
        console.log("post작성자 정보", post.author);

        // user나 post가 undefined일 경우 처리
        if (user.name !== post.author) {
            alert("게시글 작성자만 수정할 수 있습니다.");
            return;
        }

        navigate('/posts/update', {
            state: {
                postData: post, // 전체 post 객체 전송
                postId: postId
            }
        })
    }

    const handlePostDelete = async () => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        try {
            await axios.delete(`/api/posts/${postId}`);
            navigate('/posts');
        } catch (error) {
            if (error.response?.status === 401) {
                alert("게시글 작성자만 삭제할 수 있습니다.");
            } else {
                alert("삭제 중 오류가 발생했습니다.");
            }
        }

    }

    return (
        <div className="card bg-to-br to-blue-50 max-w-2xl mx-auto">
            <div className="card-body p-6">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                                Ux
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold">자유 게시판</h3>
                            <p className="text-sm text-gray-500">
                                @{post.author} • {new Date(post.createAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => navigate(-1)}
                        >
                            ← 목록
                        </button>
                        <div className="dropdown ">
                            <button tabIndex={0} className="btn m-1 btn btn-ghost btn-sm">
                                ☰
                            </button>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                            >
                                <li>
                                    <button
                                        onClick={() => handlePostEditor()}
                                    >
                                        수정
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handlePostDelete()}
                                    >
                                        삭제
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 본문 내용 */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <div className="prose max-w-none ">
                        {post.content.split('\n').map((line, idx) => (
                            <p key={idx} className="mb-4 last:mb-0 ">{line}</p>
                        ))}
                    </div>
                </div>


                {/* 좋아요 버튼 */}
                <div className='flex justify-center mt-8 mb-4'>
                    <button
                        onClick={handleLikes}
                        className="space-x-1 hover:text-red-500 transition-colors"
                    >
                        {isLiked ? (
                            <FaHeart className="text-red-500 text-center" />
                        ) : (
                            <FaRegHeart className="text-gray-500" />
                        )}
                    </button>
                </div>

                {/* 하단 메타 정보 */}
                <div className=" pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {/* <span>조회수 1,234</span>
                        <span>•</span> */}
                        <span>댓글 {countComments(comments)}</span>
                        <span>•</span>
                        <span>좋아요 {post.likeCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostBody;