import React from 'react'
import Navbar from '../Navbar'

function Home() {
  return (
    <div className='font-mono'><Navbar/>
      <div className="mt-10">
      <h1 className='text-3xl font-semibold text-center mt-10'>Welcome</h1>
      </div>
    </div>
  )
}

export default Home