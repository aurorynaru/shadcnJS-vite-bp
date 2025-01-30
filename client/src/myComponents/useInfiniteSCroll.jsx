import React from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const useInfiniteSCroll = ({ fetchItems }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const fetchMoreItems = async () => {
        setLoading(true)
        const newItems = await fetchItems(page)
        setItems((prevItems) => [...prevItems, ...newItems])
        setPage((prevPage) => prevPage + 1)
        setHasMore(newItems.length > 0)
        setLoading(false)
    }

    const { observerRef } = useInfiniteScroll({
        fetchMore: fetchMoreItems,
        hasMore,
        loading
    })
    return (
        <div className='flex flex-col mx-auto gap-5'>
            {items.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}

            {!hasMore ? (
                <p>No more items to load</p>
            ) : (
                <div ref={observerRef}>{loading && <p>Loading more...</p>}</div>
            )}
        </div>
    )
}

export default useInfiniteSCroll
