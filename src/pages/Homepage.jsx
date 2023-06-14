import React, { useState, useEffect } from 'react'
import useDecodedSession from "../hooks/useDecodedSession"
import ReactPaginate from 'react-paginate'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DeletePostModal from '../components/modals/DeletePostModal'
import BackToTop from '../components/BackToTop'

const Homepage = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(3)

    const loggedUser = useDecodedSession()

    const getPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post?page=${page}&pageSize=${pageSize}`)
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [page, pageSize])

    const handleClick = (event) => {
        setPage(event.selected + 1)
    }

    return (
        <>
            <Header />
            <div className='flex justify-center text-lg font-semibold mt-10'>
                Un po' barebones ma purtroppo il tempo ed i bugs mi hanno remato contro. <br />
                - V.</div>

            <div className='row flex flex-row flex-wrap px-[12%] mt-10 gap-5 justify-center'>

                {
                    data.posts && data.posts.map((post) => {
                        return (
                            <div className='col w-[30%] h-auto' key={post._id} >
                                <div
                                    className='card flex flex-col justify-between rounded-lg'
                                    style={{ border: "1px solid lightgray" }}
                                >
                                    <div className='img-container flex flex-col justify-start'>
                                        <img
                                            className='rounded-t-md rounded-b-sm h-[300px] max-w-[100%]'
                                            src={post.img} />
                                    </div>
                                    <hr />
                                    <div className='card-body p-3'>
                                        <div className='post-title'>
                                            <h3 className='title font-bold text-xl mb-2'>{post.title}</h3>
                                        </div>
                                        <hr className=' mb-4 border-gray-300' />

                                        <div className='post-content'>
                                            <p className='content'>{post.content.slice(0, 485)}</p>
                                        </div>
                                        <hr className='mt-2 mb-4 border-gray-300' />

                                        <div className='card-footer flex flex-col justify-between gap-1'>
                                            <div className='post-author'>
                                                <p className='author'><span className='font-bold'>Author:</span> {post.author.username}</p>
                                            </div>
                                            <div>
                                                <p className='rating mb-2'><span className='font-bold'>Rating: </span>{post.rate} / 5
                                                </p>
                                                <DeletePostModal post={post} postID={post._id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='posts-per-page mt-8 flex justify-center'>
                <p>Posts per page: </p>
                <select
                    className='select w-16 ml-2 pl-2 rounded'
                    style={{ border: "1px solid lightgray" }}
                    name="pages"
                    onChange={
                        (event) => [setPageSize(event.target.value), setPage(1)]
                    }>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={10}>10</option>
                </select>
            </div >
            <div className='mt-5 flex flex-row justify-center'>
                <p>Page: {data.currentPage} / {data.totalPages}</p>
            </div>
            <ReactPaginate
                className='pagination flex flex-row justify-center items-center gap-10 mt-5 mb-10 border-black rounded font-bold'
                style={{ border: "1px solid gray" }}
                breakLabel="..."
                pageCount={data.totalPages}
                nextLabel="Next"
                previousLabel="Previous"
                onClick={handleClick}
            />
            <BackToTop href="#" />
            <Footer />
        </>

    )
}

export default Homepage