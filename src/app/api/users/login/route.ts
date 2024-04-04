import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
connect()


export  async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {password, email} = reqBody

        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

     const validPassword =  await bcrypt.compare(password, user.password)

     if(!validPassword){
        return NextResponse.json({error: "password wrong"}, {status: 400})
     }

     const tokenData = {
        id: user._id,
        username : user.username,
        email: user.email
     }

     const token = jwt.sign(tokenData, process.env.TOKEN! , {expiresIn: '1d'})

     const respone = NextResponse.json({
        message: "Logged in Success",
        success: true
     })

     respone.cookies.set("token", token, {
        httpOnly: true
     })

     return respone

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}