import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';


export const Layout = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    // const { isLoggedIn, setIsLoggedIn, checkAuth } = useAuth();
    // 쿠키 기반 로그인 상태 확인
    const handleLogout = async () => {
        await logout(navigate);
    };


    return (
        <>
            <header>
                <div className="navbar bg-base-300">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
                            DeBoard
                        </a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal items-center gap-4 px-1 z-50">
                            {/* 게시글 메뉴 (로그인 시에만 드롭다운 표시) */}
                            {isAuthenticated ? (
                                <li className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">
                                        게시글
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow"
                                    >
                                        <li><a onClick={() => navigate("/posts")}>게시글 목록</a></li>
                                        <li><a onClick={() => navigate("/posts/new")}>게시글 생성</a></li>
                                    </ul>
                                </li>
                            ) : (
                                <li>
                                    <a className="btn btn-ghost" onClick={() => navigate("/posts")}>
                                        게시글 목록
                                    </a>
                                </li>
                            )}

                            {/* 공통 메뉴 아이템들 */}
                            {[
                                // { path: "/word", text: "단어검색" },
                                // { path: "/wordbook", text: "내 단어장" },
                                // { path: "/wordbook/ranking", text: "단어장 랭킹" },
                                { path: "/chatlist", text: "채팅" }
                            ].map((item) => (
                                <li key={item.path}>
                                    <a className="btn btn-ghost" onClick={() => navigate(item.path)}>
                                        {item.text}
                                    </a>
                                </li>
                            ))}

                            {/* 로그인/로그아웃 */}
                            <li>
                                {isAuthenticated ? (
                                    <a className="btn btn-ghost text-red-500" onClick={handleLogout}>
                                        로그아웃
                                    </a>
                                ) : (
                                    <a className="btn btn-ghost text-green-500" onClick={() => navigate("/login")}>
                                        로그인
                                    </a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;