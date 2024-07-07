import React from 'react'
import PostsList from '../../components/PostsList'


function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <p>Welcome to the Home page!</p>
   <PostsList/>

    </div>
  )
}

export default Home
