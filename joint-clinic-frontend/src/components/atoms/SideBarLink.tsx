"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {color} from "@/lib/constants/colors";
import {useState} from "react";
import Image from "next/image";

interface SideBarLinkProps {
    linkHref: string,
    icon: string,
    title: string,
}

const SideBarLink=({linkHref,title, icon}:SideBarLinkProps)=>{
    const pathname=usePathname();
    const isActive=pathname===linkHref;
    const [isHovered, setHovered] = useState(false);
    return(
        <Link
            href={linkHref}
            className={`flex flex-1 flex-row justify-center items-center hover:text-[#1E5598] hover:fill-[#1E5598] gap-2 w-fit`}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
        >
            <Image src={icon} alt={"Hi"} height={16}/>
            <h3
                style={{
                    color:isActive?color.secondary:isHovered?color.secondary:color.primary,
                }}
            >{title}</h3>
        </Link>
    )
}

export default SideBarLink;