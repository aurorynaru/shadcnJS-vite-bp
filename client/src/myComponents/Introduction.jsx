import React from 'react'
import AnimatedSection from './AnimatedSection'

const Introduction = ({ ...props }) => {
    return (
        <AnimatedSection className={` ${props.className}`}>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
                <h2 className='text-3xl font-bold mb-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate ligula a eleifend mollis. Mauris faucibus
                    erat ut venenatis gravida. In eleifend risus et ullamcorper
                    maximus.
                </h2>
                <p className='text-gray-700'>
                    Nulla libero metus, laoreet vel est eu, pharetra lacinia
                    nisi. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Sed urna dolor, dapibus quis bibendum sit amet,
                    interdum eu ligula. Suspendisse vitae vulputate eros, non
                    hendrerit turpis.
                </p>
            </div>
        </AnimatedSection>
    )
}

export default Introduction
