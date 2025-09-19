'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-sm font-medium tracking-widest text-gray-500 uppercase"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About Us
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We Create
              <br />
              Digital Excellence
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              VOTICA는 혁신적인 디지털 솔루션을 통해 브랜드의 가치를 극대화합니다.
              우리는 단순한 디자인을 넘어, 사용자 경험과 비즈니스 목표를 완벽하게
              조화시키는 전략적 파트너입니다.
            </motion.p>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              최신 기술과 창의적 사고를 결합하여, 고객의 비전을 현실로 만들어갑니다.
              우리와 함께 디지털 혁신의 여정을 시작하세요.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div>
                <h3 className="text-3xl font-bold mb-2">10+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">200+</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-gray-600">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Images */}
          <div className="relative h-[600px]">
            <motion.div
              className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden"
              style={{ y: y1 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670"
                alt="Team collaboration"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 1.5 }}
              />
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 w-2/3 h-2/3 overflow-hidden border-8 border-white"
              style={{ y: y2 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670"
                alt="Working space"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}