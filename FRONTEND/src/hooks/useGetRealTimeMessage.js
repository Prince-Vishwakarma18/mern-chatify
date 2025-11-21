import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const socket = useSelector((store) => store.socket.socket);
    const messages = useSelector((store) => store.message.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        };

        socket.on("newMessage", handleNewMessage);
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, messages, dispatch]);
};

export default useGetRealTimeMessage;
