import React from 'react';

// 메인 댓글 작성 폼
const CommentSection = ({
    comments,
    isAuthenticated,
    content,
    setContent,
    handleCommentSubmit,
    handleReplyButtonClick,
    handleDelete,
    setComments,
    countComments,
    navigate,
    replyingToCommentId
}) => {
    return (
        <div className="max-w-2xl mx-auto mt-8">
            {/* 댓글 입력창 */}
            <div className="mt-6">
                {isAuthenticated ? (
                    <form onSubmit={(e) => handleCommentSubmit(e, null)}>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="댓글을 입력해주세요"
                            rows="3"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-2">
                            <button className="btn btn-primary btn-sm">댓글 작성</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="댓글 작성에 로그인이 필요합니다. 로그인해주세요"
                            rows="3"
                            disabled
                        ></textarea>
                        <div className="flex justify-end mt-2">
                            <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => navigate('/login')}
                            >
                                댓글 작성
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* 댓글 목록 */}
            <div className="mt-4 card ">
                <div className="card-body p-6 ">
                    <h3 className="text-lg font-bold mb-4">댓글 {countComments(comments)}</h3>
                    <div className="mr-3 space-y-4 ">
                        {comments.map((comment) => (
                            <CommentNode 
                                key={comment.id}
                                comment={comment}
                                depth={0}
                                handleReplyButtonClick={handleReplyButtonClick}
                                handleDelete={handleDelete}
                                isAuthenticated={isAuthenticated}
                                handleCommentSubmit={handleCommentSubmit}
                                content={content}
                                setContent={setContent}
                                setComments={setComments}
                                replyingToCommentId={replyingToCommentId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


//대댓글 작성폼
const CommentNode = ({
    comment,
    depth,
    handleReplyButtonClick,
    handleDelete,
    isAuthenticated,
    handleCommentSubmit,
    content,
    setContent,
    setComments,
    replyingToCommentId,
}) => {
    return (
        <div className="" style={{ marginLeft: `${depth * 0.7}rem` }}>
            <div className="flex items-center space-x-3 mb-2">
                <div className="avatar">
                    <div className="w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        {comment.author}
                    </div>
                </div>
                <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(comment.createTime).toLocaleString()}
                    </p>
                </div>
            </div>
            <p className="">{comment.content}</p>
            <div className="flex justify-end">
                <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleReplyButtonClick(comment.id)}
                >
                    댓글
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(comment.id)}>
                    삭제
                </button>
            </div>

            {/* 대댓글 입력창 */}
            {replyingToCommentId === comment.id && (
                <form onSubmit={(e) => handleCommentSubmit(e, comment.id)} className="mt-4">
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="대댓글을 입력해주세요"
                        rows="3"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-2 gap-2">
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleReplyButtonClick(comment.id)}
                        >
                            취소
                        </button>
                        <button className="btn btn-primary btn-sm">대댓글 작성</button>
                    </div>
                </form>
            )}

            {/* 대댓글 목록 */}
            {comment.children?.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.children.map((child) => (
                        <CommentNode
                            key={child.id}
                            comment={child}
                            depth={depth + 1}
                            handleReplyButtonClick={handleReplyButtonClick}
                            handleDelete={handleDelete}
                            isAuthenticated={isAuthenticated}
                            handleCommentSubmit={handleCommentSubmit}
                            content={content}
                            setContent={setContent}
                            setComments={setComments}
                            replyingToCommentId={replyingToCommentId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


export default CommentSection;