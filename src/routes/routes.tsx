import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/index";
import { Chat } from "../pages/chat/index";
import { PageDefault } from "../pages/404/index";

export const RoutesPage = () => {
    return(
        <>
            <Routes>
                <Route path="/api-chat-gpt/" element={<Home/>}/>
                <Route path="/api-chat-gpt/chat" element={<Chat/>}/>
                <Route path="*" element={<PageDefault/>}/>
            </Routes>
        </>
    )
}