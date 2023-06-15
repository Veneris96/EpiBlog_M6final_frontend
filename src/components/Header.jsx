import React from 'react'
import LogoutModal from "./modals/LogoutModal.jsx"
import AddPostForm from './modals/AddPostModal.jsx'

const Header = () => {
    return (
        <header id='header' className='header h-28 w-[100%] px-[15%] flex flex-row justify-between bg-slate-300'>
            <h1 className='title text-5xl font-extrabold pt-6'>
                <a
                    className='text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-blue-400'
                    href='/homepage'>EpiBlog</a>
            </h1>
            <div className='buttons w-auto flex flex-col justify-evenly'>
                <LogoutModal />
                <AddPostForm />
            </div>
        </header>
    )
}

export default Header