'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Globe,
  Smartphone,
  Palette,
  Megaphone,
  ShoppingCart,
  Cloud,
  ArrowRight
} from 'lucide-react'

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      icon: Globe,
      title: '웹 개발',
      description: '반응형 웹사이트부터 복잡한 웹 애플리케이션까지 모든 웹 솔루션을 제공합니다',
      features: ['React/Next.js', 'Node.js', 'AWS 클라우드'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: '모바일 앱 개발',
      description: 'iOS와 Android 네이티브 앱 및 크로스 플랫폼 앱을 개발합니다',
      features: ['React Native', 'Flutter', 'Native Apps'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Palette,
      title: 'UI/UX 디자인',
      description: '사용자 중심의 인터페이스와 경험을 디자인합니다',
      features: ['User Research', 'Prototyping', 'Design System'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Megaphone,
      title: '디지털 마케팅',
      description: 'SEO, SEM, 소셜 미디어 마케팅으로 비즈니스를 성장시킵니다',
      features: ['SEO 최적화', 'Google Ads', 'SNS 마케팅'],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: ShoppingCart,
      title: '이커머스 솔루션',
      description: '온라인 쇼핑몰 구축부터 결제 시스템까지 통합 솔루션 제공',
      features: ['쇼핑몰 구축', '결제 연동', '재고 관리'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Cloud,
      title: '클라우드 서비스',
      description: '안정적이고 확장 가능한 클라우드 인프라를 구축합니다',
      features: ['AWS/Azure', 'DevOps', '서버 관리'],
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <section id="services" ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
            비즈니스 성장을 위한
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 토탈 솔루션</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            최신 기술과 전문성을 바탕으로 고객의 비즈니스에 최적화된 솔루션을 제공합니다
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href="#"
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  자세히 보기
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.a>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            어떤 서비스가 필요하신지 모르시겠나요?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl transition-all duration-300"
          >
            무료 컨설팅 받기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}