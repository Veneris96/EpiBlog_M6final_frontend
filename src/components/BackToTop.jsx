import React from 'react'

const BackToTop = () => {
    return (
        <button
            className='back-to-top w-20 h-20 m-0 bg-slate-300 fixed bottom-[1.5%] right-[1%] font-semibold hover:underline '
            style={{ borderRadius: "50%", border: "1px solid gray" }}
        >
            <a href='#header'>
                Back <br />
                to ↑<br />
                top
            </a>
        </button>
    )
}

export default BackToTop