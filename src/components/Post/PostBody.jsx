// src/components/post/PostBody.js
import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

import axios from 'axios';


// 게시글 본문 컴포넌트
const PostBody = ({ post, comments, navigate, countComments, isAuthenticated, isLiked, setIsLiked }) => {
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
                            ← 목록으로
                        </button>
                        <div className="dropdown dropdown-end">
                            <button
                                tabIndex={0}
                                className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 12h.01M12 12h.01M19 12h.01"
                                    />
                                </svg>
                            </button>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu z-10 p-2 shadow bg-base-100 rounded-box w-40"
                            >
                                <div className="space-y-1">
                                    <button
                                        className="btn btn-ghost btn-sm w-full justify-start text-sm font-normal"
                                        onClick={() => handlePostEditor()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                        수정하기
                                    </button>

                                    <div className="border-t my-1"></div>

                                    <button
                                        className="btn btn-ghost btn-sm w-full justify-start text-error text-sm font-normal"
                                        onClick={() => handlePostDelete()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        삭제하기
                                    </button>
                                </div>
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