'use client'

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 px-4 text-gray-400 text-sm mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-gray-800 pb-8">
        <div className="flex flex-col gap-2">
          <Image src="/votica-logo.png" alt="VOTICA" width={40} height={40} />
          <span className="font-bold text-white">VOTICA</span>
          <span>서울특별시 강남구 테헤란로 123, 4층</span>
          <span>사업자등록번호 : 123-45-67890</span>
          <span>대표 : 홍길동</span>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <nav className="flex gap-4 mb-2">
            <a href="#" className="hover:text-blue-400">문서</a>
            <a href="#" className="hover:text-blue-400">블로그</a>
            <a href="#" className="hover:text-blue-400">서비스 소개서</a>
            <a href="#" className="hover:text-blue-400">채용</a>
          </nav>
          <span>Copyright © 2025 VOTICA. All Rights Reserved.</span>
          <div className="flex gap-2 mt-1">
            <a href="#" className="hover:underline">서비스이용약관</a>
            <a href="#" className="hover:underline">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}