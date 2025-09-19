'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

export default function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'web', label: '웹사이트' },
    { id: 'mobile', label: '모바일 앱' },
    { id: 'design', label: 'UI/UX' },
    { id: 'ecommerce', label: '이커머스' },
  ]

  const projects = [
    {
      id: 1,
      title: 'LuxuryMall 온라인 쇼핑몰',
      category: 'ecommerce',
      description: '명품 브랜드 통합 이커머스 플랫폼',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'HealthCare 모바일 앱',
      category: 'mobile',
      description: '개인 건강관리 및 원격진료 플랫폼',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670',
      tags: ['React Native', 'Firebase', 'AI'],
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'FinTech Dashboard',
      category: 'web',
      description: '금융 데이터 시각화 대시보드',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670',
      tags: ['Vue.js', 'D3.js', 'Python'],
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Restaurant Booking',
      category: 'design',
      description: '레스토랑 예약 시스템 UI/UX 리디자인',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670',
      tags: ['Figma', 'Prototyping', 'User Research'],
      link: '#',
      github: '#',
    },
    {
      id: 5,
      title: 'EduTech Platform',
      category: 'web',
      description: '온라인 교육 플랫폼',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671',
      tags: ['Next.js', 'WebRTC', 'AWS'],
      link: '#',
      github: '#',
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      category: 'mobile',
      description: '운동 기록 및 코칭 앱',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670',
      tags: ['Flutter', 'ML Kit', 'Cloud Functions'],
      link: '#',
      github: '#',
    },
  ]

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="portfolio" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
            우리가 만든
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 성공 사례</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 확인해보세요
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-4">
                    <motion.a
                      href={project.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-900" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                    >
                      <Github className="w-5 h-5 text-gray-900" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-xl transition-all duration-300"
          >
            모든 프로젝트 보기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}