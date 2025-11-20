import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(
                    "http://localhost:8080/api/users/all"
                );
                dispatch(setOtherUsers(res.data.users));
            } catch (error) {
                console.log("Error in fetchOtherUsers:", error);
            }
        };

        fetchOtherUsers();
    }, []);
};

export default useGetOtherUsers;
