import React, { useState } from 'react'

const DeletePostModal = ({post, postID}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    
    const [posts, setPosts] = useState([])

    const deletePost = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post/${postID}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            })
            const posts = await response.json()
            setPosts(posts)
            alert("Post successfully deleted")
            window.location.reload()
        } catch (error) {

        }
    }

    return (
        <>
            <button className='bg-red-500 hover:bg-red-600 rounded p-1 w-[100%] font-semibold' onClick={() => setIsOpen(true)}>Delete Post</button>

            <dialog
                className='delete-post w-fit mt-5 relative rounded-md'
                style={{ border: "1px solid lightgray" }}
                open={isOpen}>
                <div className='delete-body'>
                    <div className='close-icon flex justify-end p-0 m-0'>
                        <p
                            className='font-extrabold text-xl cursor-pointer'
                            onClick={() => setIsOpen(false)}>✖</p>
                    </div>
                    <div className='logout-close mb-5'>
                        <h4 className=' text-center text-2xl font-bold'>Do you want to delete the post?</h4>
                    </div>

                    <hr />
                    <div className='buttons pt-[10%] flex justify-evenly'>
                        <button 
                        className=' bg-green-500 hover:bg-blue-500 h-[35%] w-32 rounded-lg text-lg font-bold'
                        onClick={() => deletePost(post.postID)}
                        >Yes</button>
                        <button
                            className='close w-32 rounded-lg bg-red-500 hover:bg-red-600 font-bold'
                            onClick={() => setIsOpen(false)}>No</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeletePostModal