"use client";

import {color} from "@/lib/constants/colors";
import {router} from "next/client";

const BookNowButton=()=>{
    return (
        <button
            className={"px-8 py-2 text-xl text-white rounded-[48px]"}
            onClick={()=>{router.push("/")}}
            style={{
                backgroundColor: color.warning,
                cursor: "pointer"
            }}
        >
            Book Now
        </button>
    )
}

export default BookNowButton;