import React, { useState } from 'react'
import useDecodedSession from '../../hooks/useDecodedSession'

const AddPostForm = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({})
    const [file, setFile] = useState(null)

    const loggedUser = useDecodedSession()

    const handleFile = async (event) => {
        setFile(event.target.files[0])
    }

    const uploadFile = async (file) => {
        const fileData = new FormData()
        fileData.append("img", file)
        try {
            const response = await fetch("http://localhost:5050/post/uploadImg", {
                method: "POST",
                body: fileData
            })
            return await response.json()
        } catch (error) {
            console.error("File upload failed")
        }
    }

    const submitPost = async (event) => {
        event.preventDefault()

        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const postFormData = {
                    ...formData,
                    author: loggedUser._id,
                    img: uploadedFile.img
                }
                const response = await fetch("http://localhost:5050/post", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(postFormData)
                })
                alert("Post submitted succesfully")
                window.location.reload()
            } catch (error) {
                console.error("Post not submitted" + error)
            }
        } else {
            console.error("File is missing")
        }
    }

    return (
        <>
            <button
                className='bg-green-500 hover:bg-blue-500 w-32 p-2 rounded-lg font-bold'
                onClick={() => setIsOpen(true)}>New Post ➕</button>

            <dialog className='bdrop w-[100%] h-[257%] bg-black bg-opacity-25 backdrop-blur-sm' open={isOpen}>
                <dialog
                    className='add-post h-fit w-fit sticky top-28 mt-24 rounded-xl'
                    style={{ border: "1px solid lightgray" }} open={isOpen}>
                    <form
                        encType='multipart/form-data'
                        className='modal-body'
                        onSubmit={submitPost}>
                        <div className='new-close flex flex-wrap justify-between pb-4'>
                            <h4 className='font-semibold text-3xl'>New Post</h4>
                            <h4 className='font-extrabold text-xl cursor-pointer' onClick={() => setIsOpen(false)}>✖</h4>
                        </div>
                        <hr />

                        <div className='title-author-rate flex flex-wrap justify-between py-4'>
                            <div className="post-title flex justify-start gap-1">
                                <h5 className='font-bold'>Post title: </h5>
                                <input
                                    required
                                    className='rounded'
                                    style={{ border: "1px solid black" }}
                                    type='text'
                                    name='title'
                                    placeholder=' Insert title'
                                    onChange={(event) => setFormData({
                                        ...formData,
                                        title: event.target.value
                                    })} />
                            </div>
                            <div className='post-author flex flex-wrap justify-start gap-1'>
                                <h4 className='font-bold'>Author:</h4>
                                <div>
                                    {loggedUser && loggedUser.role === "admin" &&
                                        <select
                                            name='author'
                                            placeholder='author'
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    author: event.target.value
                                                })
                                            }}
                                        >
                                            <option value={loggedUser._id}>{loggedUser.username}</option>
                                        </select>}
                                </div>
                            </div>
                            <div className='post-rating flex flex-wrap justify-start gap-1'>
                                <h4 className='font-bold'>Rating: </h4>
                                <select
                                    name='rate'
                                    className='rounded'
                                    style={{ border: "1px solid black" }}
                                    onChange={(event) => setFormData({
                                        ...formData,
                                        rate: Number(event.target.value)
                                    })}
                                >
                                    <option
                                        selected
                                        hidden
                                        disabled>
                                        Rate the article</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <hr />

                        <div className='post-content py-4'>
                            <h4>Content: </h4>
                            <textarea
                                required
                                name="content"
                                className='post-content w-[100%] rounded-md p-2'
                                rows={12}
                                style={{ border: "1px solid lightgray" }}
                                onChange={(event) => setFormData({
                                    ...formData,
                                    content: event.target.value
                                })} />
                        </div>
                        <hr />

                        <div className='img-close-save flex flex-wrap justify-between pt-4'>
                            <div className='post-img flex flex-wrapjustify-start gap-1'>
                                <h4 className='font-bold'>Select image: </h4>
                                <input
                                    required
                                    name='img'
                                    type="file"
                                    onChange={handleFile} />
                            </div>
                            <div className='post-close flex flex-wrap gap-2'>
                                <button
                                    className='close w-32 rounded-lg bg-red-500 hover:bg-red-600 font-bold'
                                    onClick={() => setIsOpen(false)}>Close</button>
                                <button
                                    type='submit'
                                    className='bg-green-500 hover:bg-blue-500 w-32 rounded-lg font-bold'>Submit post ✔</button>
                            </div>

                        </div>
                    </form>
                </dialog>
            </dialog>

        </>
    )
}

export default AddPostForm