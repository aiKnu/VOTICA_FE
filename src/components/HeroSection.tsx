import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Image src="/votica-logo.png" alt="VOTICA" width={80} height={80} className="mb-6 mx-auto" />

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          AI 음성응답으로
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            민심을 읽다
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          ARS + STT + LLM으로 실시간 음성 데이터를 텍스트화하고,
          <br />
          감정 분석부터 인사이트 리포트까지 자동 생성하는 차세대 여론조사 플랫폼
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            무료 데모 보기
          </button>
          <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            도입 문의
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">실제 서비스 시연 영상</h3>
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-400">데모 영상 재생</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="text-blue-400 font-bold text-2xl mb-2">14-16%</div>
            <div className="text-gray-400">CATI 방식 응답률</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="text-red-400 font-bold text-2xl mb-2">1.6-2.1%</div>
            <div className="text-gray-400">기존 ARS 응답률</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="text-green-400 font-bold text-2xl mb-2">목표 10%+</div>
            <div className="text-gray-400">VOTICA AI ARS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
