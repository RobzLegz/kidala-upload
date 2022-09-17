import axios from "axios";
import { Dispatch } from "redux";
import { setFiles } from "../redux/slices/appSlice";
import { setNotification } from "../redux/slices/notificationSlice";
import { LIST_FILES } from "./routes";

export const getAllFiles = async (dispatch: Dispatch) => {
    await axios
        .get(LIST_FILES)
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

export const getFilesV2 = async () => {
    console.log("getting files")
}