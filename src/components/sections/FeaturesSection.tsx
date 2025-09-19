'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Zap, Shield, Globe, Layers, BarChart3 } from 'lucide-react'

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: Sparkles,
      title: 'AI Content Creation',
      description: 'GPT-4 기반 콘텐츠 자동 생성으로 크리에이티브 작업 시간을 90% 단축',
      gradient: 'from-purple-500 to-pink-500',
      stats: '10x Faster'
    },
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: '실시간 데이터 분석으로 캠페인 성과를 즉시 확인하고 최적화',
      gradient: 'from-cyan-500 to-blue-500',
      stats: '99.9% Uptime'
    },
    {
      icon: Globe,
      title: 'Global Distribution',
      description: '150개국 CDN 네트워크로 전 세계 어디서나 빠른 콘텐츠 전송',
      gradient: 'from-green-500 to-emerald-500',
      stats: '150+ Countries'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2, ISO 27001 인증 보안으로 데이터 완벽 보호',
      gradient: 'from-orange-500 to-red-500',
      stats: 'Bank-level'
    },
    {
      icon: Layers,
      title: 'Smart Workflow',
      description: '팀 협업을 위한 스마트 워크플로우와 자동화 도구',
      gradient: 'from-indigo-500 to-purple-500',
      stats: '5x Efficiency'
    },
    {
      icon: BarChart3,
      title: 'ROI Tracking',
      description: '모든 마케팅 활동의 ROI를 정확하게 측정하고 리포팅',
      gradient: 'from-pink-500 to-rose-500',
      stats: '+300% ROI'
    }
  ]

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 border border-cyan-500/20">
              POWERFUL FEATURES
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              dominate the market
            </span>
          </h2>
        </motion.div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className={`absolute inset-[-2px] bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with Animation */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 shadow-lg`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </motion.div>

                    {/* Stats Badge */}
                    <div className="absolute top-8 right-8">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.gradient} text-white opacity-80`}>
                        {feature.stats}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-medium"
                    >
                      <span>Learn more</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-400 mb-8">
            전 세계 10,000개 이상의 기업이 VOTICA와 함께 성장하고 있습니다
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            지금 시작하기 - 무료
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}