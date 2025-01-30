import React from 'react'
import AnimatedSection from './AnimatedSection'

const Skills = ({ ...props }) => {
    return (
        <AnimatedSection className={`p-8  ${props.className}`}>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
                <h2 className='text-3xl font-bold mb-4'>Skills</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <div className='bg-gray-50 p-4 rounded-lg text-center'>
                        React
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg text-center'>
                        JavaScript
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg text-center'>
                        TypeScript
                    </div>
                </div>
            </div>
        </AnimatedSection>
    )
}

export default Skills
