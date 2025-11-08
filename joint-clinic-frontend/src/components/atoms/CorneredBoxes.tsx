import React from 'react';

interface IProps {
    type: "glass" | "section" | "shadowBox" | "input",
    children: React.ReactNode,
}

const CorneredBoxes = ({type,children}:IProps)=>{
    const classes =`flex-1 ${
        type == "glass" ? 
            " flex-col px-[88px] py-[33px] w-fit h-fit items-center justify-center bg-[rgb(255,255,255,0.4)] rounded-[35px] border-[3px] [border-image:radial-gradient(circle_at_center,_rgba(255,255,255,1),_rgba(255,255,255,0))_1] backdrop-blur-[17px] ovreflow-hidden" :
            type == "section" ?
                "flex-col px-[88px] py-[33px] gap-[10px] w-fit h-fit items-center justify-center rounded-[55px] bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.36)] backdrop-blur-[30px]" : 
                type == "shadowBox" ? 
                    "flex-col px-[44px] py-[13px] gap-[10px] w-fit h-fit items-center justify-center rounded-[55px] bg-white shadow-[10px_10px_11.2px_3px_rgba(0,0,0,0.25)]" : 
                    type == "input" ? 
                        "flex-row px-[88px] py-[33px] gap-[10px] w-fit h-fit border-1 items-center justify-center bg-transparent rounded-[48px]" : 
                        undefined
    }`;
    return(
        <div className= {type=="glass"?'overflow-hidden rounded-[35px] max-w-fit max-h-fit ':""}>
            <div className={classes}>
                {children}
            </div>
        </div>
    )
};


export default CorneredBoxes;