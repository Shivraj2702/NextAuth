'use client'
import axios from 'axios'
import Link from 'next/link'

import React, { useEffect } from 'react'
import { useState } from 'react'


export default function VerifyEmailPage() {

   const [token, setToken] = useState("")
   const [verified, setverified] = useState(false)
   const [error, setError] = useState(false)

   const verifyEmail = async () => {
      try {
         await  axios.post("/api/users/verifyemail", {token})
          setverified(true)
      } catch (error: any) {
        setError(true)
        console.log(error.response.data)
      }
   }

   useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
    verifyEmail()
   }, [])


  return (
   <>
   <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
        <h1>
            Verified Email
        </h1>
        <h1>
            {token ? `${token}` : "no token"}
        </h1>

        { verified && (
            <div>
                 <h1>Your verified</h1>
                <Link href='/login'>Login</Link> 
            </div>
        )}
         { error && (
            <div>
                 <h1> error</h1>      
            </div>
        )}
   </div>
   </>
  )
}

