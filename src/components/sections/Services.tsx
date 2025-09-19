'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Palette, Code, Megaphone, Smartphone, Globe, Camera } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: '사용자 중심의 인터페이스 설계와 최적화된 경험 디자인을 제공합니다.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: '최신 기술 스택을 활용한 반응형 웹사이트 개발 서비스입니다.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'iOS와 Android 플랫폼에 최적화된 네이티브 앱을 개발합니다.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: '데이터 기반의 디지털 마케팅 전략으로 성장을 가속화합니다.',
  },
  {
    icon: Globe,
    title: 'SEO Optimization',
    description: '검색 엔진 최적화를 통해 온라인 가시성을 극대화합니다.',
  },
  {
    icon: Camera,
    title: 'Content Creation',
    description: '브랜드 스토리를 효과적으로 전달하는 콘텐츠를 제작합니다.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-sm font-medium tracking-widest text-gray-500 uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What We Do
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Services
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            혁신적인 디지털 솔루션으로 비즈니스의 성장을 이끌어갑니다
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-white p-8 h-full border border-gray-100 hover:border-black transition-all duration-300"
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className="inline-block mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  <motion.div
                    className="mt-6 inline-flex items-center text-sm font-medium"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 10 }}
                  >
                    Learn More →
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}