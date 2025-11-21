import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";
import axiosInstance from "../api/axios.js";


const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.user);
    useEffect(() => {
        const fetchMessages = async () => {
            // console.log(selectedUser)
            if (!selectedUser?._id) {
                console.log("No selected user yet");
                return;
            }
            try {
                const res = await axiosInstance.get(`/messages/${selectedUser._id}`, {
                    withCredentials: true,
                });
                const msgs = res.data.messages;
                dispatch(setMessages(msgs));
                // console.log("Axios fetch msg", msgs);
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [selectedUser, dispatch]);
};

export default useGetMessages;
