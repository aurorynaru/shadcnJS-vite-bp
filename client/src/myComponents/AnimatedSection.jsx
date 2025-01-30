import React, { useEffect, useRef, useState } from 'react'
const AnimatedSection = ({ children, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef(null)

    useEffect(() => {
        let timeoutId
        const observer = new IntersectionObserver(
            ([entry]) => {
                // setIsVisible(entry.isIntersecting)
                clearTimeout(timeoutId)
                timeoutId = setTimeout(() => {
                    setIsVisible(entry.isIntersecting)
                }, 350)

                // if (entry.isIntersecting) {
                //     setIsVisible(entry.isIntersecting)
                //     observer.disconnect() // Stop observing after the first visibility
                // }
            },
            {
                // Adjust these values to control when the animation triggers
                threshold: 0.45,
                rootMargin: '25px'
            }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            clearTimeout(timeoutId)
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])

    return (
        <div
            ref={elementRef}
            style={{ minHeight: '375px' }}
            className={`
        transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}
        ${className}
      `}
        >
            {children}
        </div>
    )
}

export default AnimatedSection
