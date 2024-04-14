import React from 'react'

function page({params}:any) {
  return (
    <div>
        <h1>profile</h1>
        <h2>{params.id}</h2>
    </div>
  )
}

export default page