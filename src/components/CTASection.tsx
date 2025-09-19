import React from 'react';

export default function CTASection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-12 text-center border border-blue-500/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              AI로 국민의 진짜 목소리를
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                들어보세요
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              VOTICA로 기존 ARS보다 5배 높은 응답률과 정확한 감정 분석 데이터를 확보하세요.
              민심을 읽는 새로운 방법을 경험해보시기 바랍니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                무료 데모 신청
              </button>
              <button className="border border-gray-500 hover:border-gray-400 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-gray-800">
                서비스 도입 문의
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-blue-400 font-bold text-2xl mb-2">30일</div>
                <div className="text-gray-400 text-sm">무료 체험 기간</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-2xl mb-2">24시간</div>
                <div className="text-gray-400 text-sm">고객 지원</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold text-2xl mb-2">맞춤형</div>
                <div className="text-gray-400 text-sm">솔루션 제공</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gray-900 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">FAQ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-white mb-2">Q. 기존 시스템과 연동이 가능한가요?</h4>
                <p className="text-gray-400 text-sm">네, API를 통해 기존 CRM 및 분석 시스템과 쉽게 연동할 수 있습니다.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Q. 데이터 보안은 어떻게 보장되나요?</h4>
                <p className="text-gray-400 text-sm">모든 데이터는 암호화되어 저장되며, 국내 보안 인증을 완료했습니다.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Q. 실시간 분석 결과를 확인할 수 있나요?</h4>
                <p className="text-gray-400 text-sm">실시간 대시보드를 통해 즉시 분석 결과와 인사이트를 확인할 수 있습니다.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Q. 비용은 어떻게 책정되나요?</h4>
                <p className="text-gray-400 text-sm">월 통화량에 따른 합리적인 종량제 요금으로 제공됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
