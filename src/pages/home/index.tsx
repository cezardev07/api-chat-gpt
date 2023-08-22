import { Link } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { BsRobot } from "react-icons/bs";

import "./style.css";

export const Home = () => {
    return(
        <section className="home max-w-[1400px] h-[100%] mx-auto flex items-center justify-center p-[20px] ">
            <div className="wrapper flex flex-col gap-[30px] text-center">
                
                <div className="wrapper_title"> 
                    <div className="title">
                        <span className="span_1">
                            Develop.
                        </span>
                        <span className="span_2">
                            Preview.
                        </span>
                        <span className="span_3">
                            ia.
                        </span>
                    </div>
                </div>

                <div className="description mt-[-20px]">
                    <p 
                        className="text-[20px] text-[rgb(102, 102, 102)] opacity-70 max-w-[670.4px] mx-auto font-[400] tracking-[-0.4px] leading-[32px]"
                    >Develop Preview IA, credibilidade de uma marca sólida e confiavel, mais de 23 anos de experiência, IA criada a partir do GPT-3</p>
                </div>
                <div className="wrapper_buttons flex items-center justify-center flex-wrap gap-[20px]">
                    <Link 
                        to="/api-chat-gpt/"
                        className="active:scale-90 hover:bg-[#111111b7] w-[188px] h-48px bg-[#111111] text-[#ffffff] rounded-[3px] flex items-center justify-center gap-[10px] whitespace-nowrap border-[1px] border-[#111111] shadow_hover_orage pt-[10px] pb-[10px]">
                        <span className="text-[20px]">
                            <MdOutlineSchool/>
                        </span>
                        Rede Develop
                    </Link>
                    <Link to="/api-chat-gpt/chat" className="active:scale-90 active w-[188px] h-48px rounded-[3px] flex items-center justify-center gap-[10px] whitespace-nowrap border-[1px] border-[#111111] shadow_hover_orage pt-[10px] pb-[10px]">
                        <span className="text-[20px]">
                            <BsRobot/>
                        </span>
                        Preview IA
                    </Link>
                </div>
            </div>
        </section>
    )
}