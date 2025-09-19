import React from 'react';

const features = [
  {
    title: '실시간 음성 분석',
    desc: 'STT 기술로 음성을 즉시 텍스트화하고 실시간으로 분석합니다.',
    icon: (
      <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    ),
    highlight: '실시간',
  },
  {
    title: '감정 분석 리포트',
    desc: '음성 톤과 텍스트를 AI로 분석하여 응답자의 감정 상태를 정확히 파악합니다.',
    icon: (
      <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    highlight: '감정 인식',
  },
  {
    title: '인사이트 리포트',
    desc: 'LangChain과 AI API를 활용해 통화 기록에서 핵심 인사이트를 자동 추출합니다.',
    icon: (
      <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    highlight: 'AI 분석',
  },
  {
    title: '솔루션 제시',
    desc: '주관식 답변을 카테고리별로 분류하고 맞춤형 솔루션을 자동 제안합니다.',
    icon: (
      <svg className="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    highlight: '자동 분류',
  },
];

const stats = [
  {
    value: '24/7',
    label: '무중단 서비스',
    desc: '언제든지 대규모 음성 데이터 수집 가능',
  },
  {
    value: '80%',
    label: '비용 절감',
    desc: '기존 CATI 대비 운영비용 대폭 절감',
  },
  {
    value: '10초',
    label: '실시간 분석',
    desc: '음성 입력 후 즉시 텍스트 변환 및 분석',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            왜 <span className="text-blue-400">VOTICA</span>인가?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            기존 ARS의 한계를 뛰어넘는 AI 음성 분석 솔루션으로 더 높은 응답률과 정확한 데이터를 확보하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl p-6 text-center hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <div className="inline-block bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full mb-3">
                {feature.highlight}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">응답률 비교</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-blue-400 font-bold text-3xl mb-2">14-16%</div>
                <div className="text-gray-300 font-semibold mb-1">CATI 방식</div>
                <div className="text-sm text-gray-400">높은 비용, 제한된 시간</div>
              </div>
              <div className="text-center">
                <div className="text-red-400 font-bold text-3xl mb-2">1.6-2.1%</div>
                <div className="text-gray-300 font-semibold mb-1">기존 ARS</div>
                <div className="text-sm text-gray-400">낮은 참여도, 기계적 응답</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold text-3xl mb-2">목표 10%+</div>
                <div className="text-gray-300 font-semibold mb-1">VOTICA AI</div>
                <div className="text-sm text-gray-400">자연스러운 대화, 실시간 분석</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
