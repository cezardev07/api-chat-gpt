import "./style.css";
import { useState, useContext, useRef} from "react";

import { Mensage } from "../../components/mensage/index";

interface typeMesage{
    pergunta: string;
    resposta: string;
    referencia?: HTMLDivElement;
}

import { MyContext } from "../../context/provider";

import { api } from "../../api/api";

export const Chat = () => {
    const [ pergunta, setPergunta] = useState<string>()
    const [ respostas, setResposta ] = useState<any>([
        {
            pergunta: "Olá, bem vindo(a) a Develop Preview IA!",
            resposta: "Sou sua IA pessoal e estou aqui para tornar sua jornada incrível. Explore novas possibilidades, obtenha respostas rápidas e desfrute de assistência inteligente. Estou animada para embarcar nessa aventura de descobertas junto com você!\n\nNavegue à vontade e explore as vastas possibilidades que a tecnologia tem a oferecer. Estou aqui para ajudar a responder às suas perguntas, solucionar problemas e até mesmo inspirá-lo(a) com ideias criativas. Juntos, vamos desbravar novas fronteiras do conhecimento.🤖💻"
        },
    ])

    const { stopLoop, setLine } = useContext<any>(MyContext)
    
    const chat_scroll = useRef(null)

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if(stopLoop === false){
            setLine(true)
            const data = await api(pergunta)
            if(data){
                if(data.choices){
                    setResposta([...respostas, {
                        pergunta: pergunta,
                        resposta: data.choices[0].text,
                        referencia: chat_scroll.current,
                    }])
                    setPergunta("")
                    setLine(false)
                }
                if(data.error){
                    if (
                        data.error.code === "model-input-max-tokens-exceeded" ||
                        data.error.message.includes("exceeds the maximum token limit")
                    ) {
                        setResposta([...respostas, {
                            pergunta: pergunta,
                            resposta: "Ops, parece que excedemos o limite de tokens permitidos. Agradecemos por testar a nossa IA.\n\nNão fique desanimado caso não tenha conseguido participar desta vez. Estaremos de volta em breve. Foi um prazer tê-lo conhecido! 🤖",
                            referencia: chat_scroll.current,
                        }])
                        setPergunta("")
                        setLine(false)
                    } else {
                        setResposta([...respostas, {
                            pergunta: pergunta,
                            resposta: data.error.message,
                            referencia: chat_scroll.current,
                        }])
                        setPergunta("")
                        setLine(false)
                    }
                }
            }
            if(!data){
                setResposta([...respostas, {
                    pergunta: pergunta,
                    resposta: "ops!, algo deu errado, tente novamente em alguns minutos🤖",
                    referencia: chat_scroll.current,
                }])
    
                setPergunta("")
                setLine(false)
            }
        }
        if(stopLoop == true){
            console.log("IA respondendo!")
        }
    }

    return(
        <section className="wrapper-chat w-full h-full flex flex-col justify-between">
            <div className="title w-full mx-auto flex flex-row pt-3 pb-5">
                <h1 className="mx-auto text-xl w-[768px] font-[600] ">
                    DEVELOP PREVIEW IA
                </h1>
            </div>
            <div className="chat flex justify-between flex-col gap-5">
                <div ref={chat_scroll} className="menssagens">
                    {
                        respostas && respostas.map(( {pergunta, resposta, referencia}: typeMesage , index : number) => {
                            return(
                                <Mensage key={index} props={{pergunta, resposta, referencia,index}}/>
                            )
                        })
                    }
                </div>
                <form onSubmit={handleSubmit} className="text-center p-[20px] border-t-[1px] border-color-[#dededf]">
                    <div className="prompt flex justify-between mb-[20px] max-w-[768px] bg-[#ffffff] mx-auto">
                        <textarea
                            onChange={({target}) => setPergunta(target.value)} 
                            value={pergunta} 
                            className="w-full h-[64px] border-0 p-[15px] resize-none text-[15px] rounded-[3px]" required name="message" id="message" placeholder="Send message"></textarea>

                        <button 
                            type="submit"
                            className="flex justify-center items-center hover:bg-[#ff6b02ea] rounded-[3px] border-0 h-[100%] p-[20px] whitespace-nowrap bg-[#ff6b02d5] text-[#ffffff] cursor-pointer" 
                            >
                            <span className="material-symbols-outlined">
                                Send
                            </span>
                        </button>
                    </div>
                    <div className="text-gray-500 text-xs">
                        <span>Free Research Preview. DEVELOP IA may produce inaccurate information about people, places, or facts</span>
                    </div>
                </form>
            </div>
        </section>
    )
}