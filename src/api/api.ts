// const ENDPOINT_API = import.meta.env.VITE_ENDPOINT_API
// const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

// Como e para fonte de estudos, Estarei deixando assim porque o layout vai está no gh-page, mas não e o recomendado caso queira fazer deploy em produção!!!

const ENDPOINT_API = "https://api.openai.com/v1/chat/completions"
const OPENAI_API_KEY = ""

export const api = async (pergunta : string | undefined) => {
    if(pergunta){
        try {
            const res = await fetch(ENDPOINT_API, {
                method: "POST",
        
                headers: {
                    Accept: "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${OPENAI_API_KEY}`
                },
        
                body : JSON.stringify({
                    // model: "text-davinci-003",
                    model: "gpt-3.5-turbo",
                    prompt: pergunta,
                    max_tokens: 500,
                    temperature: 0.5
                })
            })
            
            const data = await res.json()
            

            if(data.error){
                return data
            }

            return data
        } catch (error) {
            console.log("[ ERRO -> ]"+ error)
        }   
    }
}