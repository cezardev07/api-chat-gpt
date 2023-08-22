import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsRobot } from "react-icons/bs";

import { SiProbot } from "react-icons/si";

import { useState, useEffect, useRef } from "react"

export const Header = () => {
    const [menuMobile, setMenuMobile] = useState<boolean>(false)
    const [buttonMenuMobile, setButtonMenuMobile] = useState<boolean>(false)

    const navBar = useRef(null)
    
    const handleToggleMenuMobile = () => {
        setMenuMobile(!menuMobile)
    }

    const handleResize = () => {
        if(navBar.current){
            const width = (navBar.current as HTMLDivElement).clientWidth
            if(width >= 460){
                setMenuMobile(false)
                setButtonMenuMobile(false)
            }
            if(width < 460){
                setMenuMobile(false)
                setButtonMenuMobile(true)
            }
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("load", () => {
            if(navBar.current){
                const width = (navBar.current as HTMLDivElement).clientWidth
                if(width < 460){
                    setMenuMobile(false)
                    setButtonMenuMobile(true)
                }
            }
        })
    },[])

    return(
        <header className="fixed w-full top-0 left-0 p-4 z-50 bg-white"> 
            <nav ref={navBar} className="relative mx-auto flex items-center justify-between gap-5 max-w-[1400px] ">
                <Link 
                    to="/api-chat-gpt" 
                    className="decoration-none"
                >
                    {/* caso queira colocar logo marca */}
                    {/* <img src={} alt="" className="w-52 img_resposive"/> */}
                    <span className="text-5xl text-black">
                        <SiProbot/>
                    </span>
                </Link>
                <ul className={menuMobile === true ? "absolute top-12 right-0 flex flex-col items-center justify-center gap-3 bg-white" : "flex items-center justify-center gap-3 responsive_menu_mobile"}>
                    <Link 
                        to="/api-chat-gpt/sobre"
                        className="active:scale-90 flex items-center justify-center text-[#111111] bg-transparent rounded-sm w-[101px] px-5 py-2 whitespace-nowrap decoration-none shadow_hover_orage gap-1"
                    >
                        <span className="text-lg">
                            <AiOutlineInfoCircle/>
                        </span>
                        sobre
                    </Link>
                    <Link 
                        to="/api-chat-gpt/chat" 
                        className="active:scale-90 flex items-center justify-center text-white bg-[#111111] rounded-sm w-[101px] px-5 py-2 whitespace-nowrap decoration-none shadow_hover_orage gap-1"
                    >
                        <span className="text-lg">
                            <BsRobot/>
                        </span>
                        IA
                    </Link>
                </ul>
                <div className={buttonMenuMobile === true ? "block" : "hidden"}>
                    <button onClick={handleToggleMenuMobile} className="mobile">
                        {
                            menuMobile === false ? (
                                <svg className="w-[37px] h-[37px] p-2 text-[10px] rounded-[3px] bg-[#111111] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 14h6m-3 3v-6M1.857 1h4.286c.473 0 .857.384.857.857v4.286A.857.857 0 0 1 6.143 7H1.857A.857.857 0 0 1 1 6.143V1.857C1 1.384 1.384 1 1.857 1Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 11 6.143V1.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H1.857A.857.857 0 0 1 1 16.143v-4.286c0-.473.384-.857.857-.857Z"/>
                                </svg>
                            ) : (
                                <svg className="w-[37px] h-[37px] p-2 text-[10px] rounded-[3px] bg-[#111111] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            )
                        }
                    </button>
                </div>
            </nav>
        </header>
    )
}