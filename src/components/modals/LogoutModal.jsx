import React, { useState } from 'react'

const LogoutModal = () => {

    const [isOpen, setIsOpen] = useState(false)

    const logout = () => {
        localStorage.removeItem("loggedIn")
        window.location.reload()
    }

    return (
        <>
            <button className='bg-red-500 hover:bg-red-600 w-32 p-2 rounded-lg font-semibold' onClick={() => setIsOpen(true)}>Logout 🚪</button>

            <dialog className='w-[100%] h-[200%] bg-black bg-opacity-25 backdrop-blur-sm absolute top-0' style={{ zIndex: "1000" }} open={isOpen}>
                <dialog className='logout h-fit w-[35%] mt-60 rounded-md ' style={{ border: "2px solid lightgray" }} open={isOpen}>
                    <div className='logout-body flex-col justify-between'>
                    <div className='close-icon flex justify-end p-0 m-0'>
                        <p
                            className='font-extrabold text-xl cursor-pointer'
                            onClick={() => setIsOpen(false)}>✖</p>
                    </div>
                    <div className='logout-close mb-5'>
                        <h4 className=' text-center text-2xl font-bold'>Do you want to log out?</h4>
                    </div>

                        <hr />
                        <div className='buttons pt-[10%] flex justify-evenly'>
                            <button className=' bg-green-500 hover:bg-blue-500 h-[35%] w-32 rounded-lg text-lg font-bold' onClick={logout}>Yes</button>
                            <button className='close w-32 rounded-lg bg-red-500 hover:bg-red-600 font-bold' onClick={() => setIsOpen(false)}>No</button>
                        </div>

                    </div>
                </dialog>
            </dialog>

        </>
    )
}

export default LogoutModal