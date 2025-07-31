'use client'

import React from 'react'
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  ScrollReveal,
  StaggerContainer,
  TypingAnimation,
  FloatingAnimation,
  ParallaxContainer,
} from './index'

/**
 * Example component demonstrating all animation components
 * Now powered by Framer Motion for smooth, performant animations
 */
export const AnimationShowcase: React.FC = () => {
  const skills = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack Next.js application with Motion animations',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Responsive design with smooth scroll animations',
    },
    { id: 3, title: 'Mobile App UI', description: 'React Native with gesture-based interactions' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParallaxContainer speed={0.3} className="absolute inset-0 -z-10">
          <div className="w-full h-[120vh] bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800" />
        </ParallaxContainer>

        <div className="text-center text-white z-10 px-6">
          <FadeIn delay={300}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <TypingAnimation text="Motion-Powered Portfolio" speed={80} className="text-white" />
            </h1>
          </FadeIn>

          <SlideIn direction="up" delay={1500}>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience the power of Framer Motion with smooth, hardware-accelerated animations
            </p>
          </SlideIn>

          <ScaleIn delay={2000}>
            <FloatingAnimation intensity="light" speed="slow">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg">
                Explore the Magic ✨
              </button>
            </FloatingAnimation>
          </ScaleIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Framer Motion?</h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              Professional animations with hardware acceleration, gesture support, and optimized
              performance
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '🚀 Performance',
                desc: 'GPU-accelerated animations that run at 60fps',
              },
              {
                title: '🎯 Precision',
                desc: 'Spring physics and bezier curves for natural motion',
              },
              {
                title: '📱 Responsive',
                desc: 'Touch gestures and mobile-optimized interactions',
              },
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 150}>
                <FloatingAnimation intensity="light" speed="medium">
                  <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-4">{feature.title.split(' ')[0]}</div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title.split(' ').slice(1).join(' ')}
                    </h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </FloatingAnimation>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Advanced Stagger */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technical Skills</h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <StaggerContainer staggerDelay={0.15} initialDelay={0.1}>
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center justify-between py-6 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-lg font-medium">{skill}</span>
                  <div className="w-48 md:w-64 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 delay-500"
                      style={{ width: `${88 + index * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section with Enhanced Animations */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Projects</h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              Interactive showcases with smooth hover effects and engaging micro-interactions
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 200}>
                <FloatingAnimation intensity="medium" speed="medium">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                      <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                      <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors group-hover:translate-x-1 transform duration-200">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </FloatingAnimation>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Multiple Animation Types */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Let&apos;s build your next project with cutting-edge animations and smooth user
              experiences.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <StaggerContainer staggerDelay={0.15}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <FloatingAnimation intensity="light" speed="slow">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-lg">
                    Start a Project
                  </button>
                </FloatingAnimation>
                <FloatingAnimation intensity="light" speed="slow">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all shadow-lg text-lg">
                    View Resume
                  </button>
                </FloatingAnimation>
              </div>
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
