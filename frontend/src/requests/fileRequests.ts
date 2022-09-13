import axios from "axios";
import { Dispatch } from "redux";
import { setFiles } from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { LIST_FILES_ROUTE } from "./routes";

export const getAllFiles = async (dispatch: Dispatch) => {
    await axios
        .get(LIST_FILES_ROUTE)
        .then((res) => {
            dispatch(setFiles(res.data));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};