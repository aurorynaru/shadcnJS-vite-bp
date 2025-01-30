import React from 'react'
import AnimatedSection from './AnimatedSection'

const Contact = ({ ...props }) => {
    return (
        <AnimatedSection className={`p-8  ${props.className}`}>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
                <h2 className='text-3xl font-bold mb-4'>Contact</h2>
                <form className='space-y-4'>
                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-2 border rounded'
                    />
                    <textarea
                        placeholder='Message'
                        className='w-full p-2 border rounded h-32'
                    />
                    <button className='bg-blue-600 text-white px-6 py-2 rounded'>
                        Send
                    </button>
                </form>
            </div>
        </AnimatedSection>
    )
}

export default Contact
