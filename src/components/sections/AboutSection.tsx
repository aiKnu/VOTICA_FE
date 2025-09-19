'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, Users, Lightbulb, Target } from 'lucide-react'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: Users,
      title: '전문가 팀',
      description: '각 분야 최고의 전문가들이 프로젝트를 진행합니다',
    },
    {
      icon: Lightbulb,
      title: '혁신적 접근',
      description: '최신 기술과 창의적 사고로 문제를 해결합니다',
    },
    {
      icon: Target,
      title: '목표 중심',
      description: '고객의 비즈니스 목표 달성에 집중합니다',
    },
  ]

  const achievements = [
    '10년 이상의 업계 경험',
    '500개 이상의 성공 프로젝트',
    '대기업 및 스타트업 파트너십',
    '24/7 고객 지원 시스템',
  ]

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">About VOTICA</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
                디지털 혁신을 선도하는
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 기술 파트너</span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              VOTICA는 2014년 설립 이래로 수많은 기업들의 디지털 전환을 성공적으로 이끌어왔습니다.
              우리는 단순한 개발 회사가 아닌, 고객의 성장을 함께하는 전략적 파트너입니다.
            </p>

            <div className="space-y-4 mb-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl transition-all duration-300"
            >
              회사 소개 더보기
            </motion.button>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, translateX: 10 }}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}

            {/* Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative h-64 rounded-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670"
                alt="Team Collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">함께 성장하는 팀</h3>
                  <p className="text-white/80">혁신과 열정으로 미래를 만들어갑니다</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}