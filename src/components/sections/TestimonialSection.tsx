'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

export default function TestimonialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      id: 1,
      name: '김민수',
      position: 'CEO',
      company: '테크스타트업',
      content: 'VOTICA와 함께 프로젝트를 진행하면서 우리의 비전을 완벽하게 구현할 수 있었습니다. 전문성과 열정이 돋보이는 팀입니다.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    },
    {
      id: 2,
      name: '이서연',
      position: 'Marketing Director',
      company: '글로벌커머스',
      content: '디지털 마케팅 전략부터 실행까지 체계적으로 지원해주셔서 매출이 300% 증가했습니다. 최고의 파트너입니다.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    },
    {
      id: 3,
      name: '박준호',
      position: 'CTO',
      company: '핀테크솔루션',
      content: '기술적 난제들을 창의적으로 해결하는 모습이 인상적이었습니다. 덕분에 예정보다 빠르게 서비스를 런칭할 수 있었습니다.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
            고객이 전하는
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 성공 스토리</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            VOTICA와 함께한 고객들의 진솔한 이야기를 들어보세요
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}