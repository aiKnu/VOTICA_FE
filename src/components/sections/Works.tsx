'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670',
    description: '차세대 온라인 쇼핑 경험을 위한 플랫폼 구축',
  },
  {
    id: 2,
    title: 'Brand Identity Design',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664',
    description: '강력한 브랜드 아이덴티티 구축 프로젝트',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670',
    description: '직관적인 모바일 뱅킹 애플리케이션',
  },
  {
    id: 4,
    title: 'Healthcare Platform',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670',
    description: '의료 서비스 디지털 혁신 프로젝트',
  },
  {
    id: 5,
    title: 'Real Estate Portal',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673',
    description: '부동산 거래 플랫폼 개발',
  },
  {
    id: 6,
    title: 'Education Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671',
    description: '온라인 교육 플랫폼 구축',
  },
]

export default function Works() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-32 bg-white"
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
            Portfolio
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Featured Works
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            우리가 만든 혁신적인 프로젝트들을 만나보세요
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredProject === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 0.7 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-center px-6"
                    initial={{ y: 20 }}
                    animate={{
                      y: hoveredProject === project.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium tracking-wider uppercase mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {project.title}
                    </h3>
                  </motion.div>
                </motion.div>
              </div>

              <div className="mt-6">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 group-hover:text-gray-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="px-8 py-3 border-2 border-black text-black font-medium text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL PROJECTS
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}