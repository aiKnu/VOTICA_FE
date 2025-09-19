'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const benefits = [
    '무료 컨설팅',
    '맞춤형 견적',
    '24/7 지원',
    '100% 만족 보장',
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            지금 바로 프로젝트를 시작하세요
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8">
            귀사의 디지털 혁신을 위한 첫 걸음을 함께 시작해보세요.
            <br />전문가가 직접 상담해드립니다.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-white/80" />
                <span className="text-white/90">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>무료 상담 신청</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              포트폴리오 다운로드
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 text-white/80"
          >
            <p className="mb-2">또는 직접 연락주세요</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:02-1234-5678" className="hover:text-white transition-colors">
                📞 02-1234-5678
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="mailto:contact@votica.com" className="hover:text-white transition-colors">
                ✉️ contact@votica.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}