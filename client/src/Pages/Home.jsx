import React from 'react'
import AnimatedSection from '../myComponents/AnimatedSection'
import Introduction from '../myComponents/Introduction'
import Projects from '../myComponents/Projects'
import Contact from '../myComponents/Contact'
import Skills from '../myComponents/Skills'

const Home = () => {
    return (
        <>
            <section className='h-[1080px] w-full flex items-center justify-center bg-gray-900 text-white'>
                <h1 className='text-6xl font-bold'>Your Name</h1>
            </section>

            <Introduction />

            <Projects />

            <Skills />

            <Contact />
        </>
    )
}

export default Home
