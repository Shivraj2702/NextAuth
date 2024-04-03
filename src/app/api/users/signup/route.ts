import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs"
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request: NextRequest) {
  try {
      const reqBody = await request.json()
      const {username, password, email} = reqBody

     const user =  await User.findOne({email})

    if(user) {
        return NextResponse.json({error : "user alredy exist"}, {status: 400})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    new User({
      username,
      email,
      password : hashedPassword
    })

    const savedUser = await User.save()

    await sendEmail({email, emailType: "VERIFY", UserId: savedUser._id})

    return NextResponse.json({
      message: "User registerd successfully",
      success: true,
      savedUser
    })


  } catch (error:any) {
         return NextResponse.json({error: error.message}, {status: 500})
  }

}