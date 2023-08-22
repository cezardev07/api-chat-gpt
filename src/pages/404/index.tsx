import { Link } from "react-router-dom"

export const PageDefault = () => {
    return(
        <div 
            className="h-full w-screen flex items-center justify-center flex-col gap-5"
        >
            <h1 
                className="text-6xl">
                404
            </h1>
            <Link 
                to="/api-chat-gpt/" 
                className="hover:text-blue-800"
            >
                Pagina não encontrada, clique aqui para voltar para a pagina inicial
            </Link>
        </div>
    )
}