import { useState, useEffect, useContext} from "react";
import { MyContext } from "../../context/provider";

export const Mensage = ({props} : any) => {
    const [ text, setText ] = useState<string>("")
    const [ cursorLine, setCursorLine ] = useState<string>("")

    const { pergunta, resposta, referencia } = props
    const { setStopLoop, setLine} = useContext<any>(MyContext)

    useEffect(() => {
        if (pergunta) {
            const array = resposta.split(" ")
    
            const delayedTextUpdate = async () => {
                setStopLoop(true)
                setCursorLine("writing")
                console.log("A IA está respondendo!")

                let newText = "" // Essa variável armazenar o novo texto

                // Não e recomendado acessar o dom diretamente e apenas um teste!
                const tagDom = document.querySelectorAll(".ia div")

                if(referencia){
                    handleScroll(referencia)                    
                }
                
                // acessando o DOM diretamente e apenas um teste!
                tagDom.forEach(item => {
                    item.classList.add("active_disable_selection")                    
                })

                for (let i = 0; i < array.length; i++) {

                    newText += array[i] + " " // Concatena a palavra atual
                    setText(newText) // Atualiza o estado com o novo texto

                    await new Promise((resolve) => setTimeout(resolve, 20)) // time
                }
                
                // DOM diretamente
                tagDom.forEach(item => {                    
                    item.classList.remove("active_disable_selection")
                })

                console.log("A IA terminou de responder!")

                setLine(false)
                setStopLoop(false)
                setCursorLine("hidden")
                setTimeout(() => {setCursorLine(" ")},1500)
            };
    
            delayedTextUpdate()
    
            return () => {
                setText("") // Limpa o texto quando o componente é desmontado
            }
        }
    }, [pergunta, resposta])

    const events = (chatElement : HTMLDivElement) => {
        if(chatElement.clientWidth >= 560){
            let loop_scroll: number | undefined
    
            loop_scroll = setInterval(() => {
                chatElement.scrollTop = chatElement.scrollHeight
            })
            chatElement.addEventListener("mouseenter", () => {
                clearInterval(loop_scroll)
            })
            chatElement.addEventListener("mouseleave", () => {
                loop_scroll = setInterval(() => {
                    chatElement.scrollTop = chatElement.scrollHeight;
                })
            })
            chatElement.addEventListener("touchstart", () => {
                clearInterval(loop_scroll)
            });
            chatElement.addEventListener("touchmove", () => {
                clearInterval(loop_scroll)
            });
        }
    }

    const handleScroll = (stateRef:HTMLDivElement) => {
        const chatElement : HTMLDivElement = stateRef

        // -------- Scroll para o final do chat -------- 
        events(chatElement)

        const scrollEvents = () => {
            // -------- Scroll para o final do chat -------- 
            events(chatElement)
        }

        window.addEventListener("resize", () => {
            scrollEvents()
        })

        window.addEventListener("load", () => {
            scrollEvents()
        })
    }

    return(
        <div>    
            <div className="client bd-transparent pl-[20px] pr-[20px]">
                <div className="wrapper max-w-[768px] mx-auto pt-[20px] pb-[20px] whitespace-pre-wrap">
                    {
                        pergunta
                    }
                </div>
            </div>
            <div className="ia bg-[#f7f7f8] pl-[20px] pr-[20px]">
                <div className={
                    cursorLine === "hidden"
                    ? "animation_pulse wrapper max-w-[768px] mx-auto pt-[20px] pb-[20px] whitespace-pre-wrap"
                    : cursorLine === "writing" 
                    ? "text_ia wrapper max-w-[768px] mx-auto pt-[20px] pb-[20px] whitespace-pre-wrap"
                    : "wrapper max-w-[768px] mx-auto pt-[20px] pb-[20px] whitespace-pre-wrap" 
                }
                >
                    {
                        text
                    }
                </div>
            </div>
        </div>
    )
}