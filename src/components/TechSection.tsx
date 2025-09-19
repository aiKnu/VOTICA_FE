import React from 'react';

const techStack = [
  {
    name: 'STT (Speech-to-Text)',
    provider: 'Google Cloud STT',
    desc: '실시간 음성 인식으로 고품질 텍스트 변환',
    features: ['다국어 지원', '실시간 변환', '높은 정확도'],
    icon: (
      <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    ),
    color: 'blue',
  },
  {
    name: 'LLM (Large Language Model)',
    provider: 'ChatGPT / GPT-4',
    desc: '대화 분석, 감정 인식, 인사이트 추출',
    features: ['감정 분석', '주제 분류', '요약 생성'],
    icon: (
      <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'purple',
  },
  {
    name: 'TTS (Text-to-Speech)',
    provider: 'ElevenLabs',
    desc: '자연스럽고 인간적인 AI 음성 합성',
    features: ['자연스러운 발음', '감정 표현', '다양한 음성'],
    icon: (
      <svg className="w-16 h-16 text-green-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.828 1 1 0 11-1.415-1.414A3.989 3.989 0 0013 12a3.989 3.989 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
      </svg>
    ),
    color: 'green',
  },
];

const pipeline = [
  {
    step: '01',
    title: '음성 수집',
    desc: 'ARS를 통한 대규모 음성 데이터 수집',
    icon: '📞',
  },
  {
    step: '02',
    title: 'STT 변환',
    desc: 'Google STT로 실시간 텍스트 변환',
    icon: '📝',
  },
  {
    step: '03',
    title: 'AI 분석',
    desc: 'LLM으로 감정, 주제, 인사이트 분석',
    icon: '🧠',
  },
  {
    step: '04',
    title: '리포트 생성',
    desc: '자동화된 분석 리포트 및 대시보드',
    icon: '📊',
  },
];

export default function TechSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            최첨단 <span className="text-blue-400">AI 기술 스택</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            검증된 AI 기술들을 조합하여 안정적이고 정확한 음성 분석 서비스를 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              <div className="mb-6 flex justify-center">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{tech.name}</h3>
              <div className="text-sm text-gray-400 mb-4">{tech.provider}</div>
              <p className="text-gray-300 mb-6 leading-relaxed">{tech.desc}</p>
              <div className="space-y-2">
                {tech.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-center text-sm text-gray-400">
                    <div className={`w-2 h-2 bg-${tech.color}-400 rounded-full mr-2`}></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            VOTICA 처리 파이프라인
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pipeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-black rounded-xl p-6 text-center border border-gray-700">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-blue-400 font-bold text-lg mb-2">STEP {item.step}</div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">기술적 우위</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-blue-400 font-bold text-3xl mb-2">99.5%</div>
                <div className="text-gray-300 font-semibold mb-1">음성 인식 정확도</div>
                <div className="text-sm text-gray-400">Google Cloud STT 기반</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-3xl mb-2">&lt;10초</div>
                <div className="text-gray-300 font-semibold mb-1">실시간 분석 속도</div>
                <div className="text-sm text-gray-400">STT + LLM 파이프라인</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold text-3xl mb-2">24/7</div>
                <div className="text-gray-300 font-semibold mb-1">무중단 서비스</div>
                <div className="text-sm text-gray-400">클라우드 기반 확장성</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
