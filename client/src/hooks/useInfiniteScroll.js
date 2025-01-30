import { useEffect, useRef } from 'react'

const useInfiniteScroll = ({ fetchMore, hasMore, loading }) => {
    const observerRef = useRef()

    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !loading) {
                        fetchMore()
                    }
                },
                { threshold: 1 }
            )

            if (observerRef.current) observer.observe(observerRef.current)

            return () => {
                if (observerRef.current) observer.unobserve(observerRef.current)
            }
        }
    }, [fetchMore, hasMore, loading])

    return { observerRef }
}

export default useInfiniteScroll
