import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';

const Test = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
      {isAuthenticated && user ? (
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold text-purple-400">
            {user.name}님 안녕하세요!
          </h1>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">
            기본 게시판 프로젝트
          </h1>
          
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">주요 기능</h2>
            
            <ul className="space-y-2 text-gray-300 text-left max-w-md mx-auto">
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>게시글 생성, 수정 및 삭제</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>게시글 페이징</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>좋아요 기능</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>댓글 및 대댓글 작성 및 삭제</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>회원기능</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Jwt 기반 인증 구현 (블랙리스트 방식)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>웹소켓을 이용한 채팅 기능 구현</span>
              </li>
            </ul>
          </div>
          
          <a
            href="https://github.com/myh7754/SimpleBoard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            자세한 내용은 GitHub에서 확인해주세요
          </a>
        </div>
      )}
    </div>
  );
};

export default Test;