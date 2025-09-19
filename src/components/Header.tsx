import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-5 bg-black/90 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div>
        <Image src="/votica-logo.png" alt="VOTICA" width={48} height={48} />
      </div>
      <nav className="space-x-8 hidden md:flex text-lg font-medium">
        <a href="#" className="hover:text-blue-400 transition">문서</a>
        <a href="#" className="hover:text-blue-400 transition">블로그</a>
        <a href="#" className="hover:text-blue-400 transition">서비스 소개서</a>
      </nav>
      <div className="space-x-3">
        <button className="px-5 py-2 rounded-full bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 shadow">로그인</button>
        <button className="px-5 py-2 rounded-full bg-white text-black font-bold shadow-lg hover:bg-gray-200">도입문의</button>
      </div>
    </header>
  );
}