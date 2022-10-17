import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    NotificationInfo,
    selectNotification,
} from '../../redux/slices/notificationSlice';

const MainNotification = () => {
    const dispatch = useDispatch();

    const notificationInfo: NotificationInfo = useSelector(selectNotification);

    const [disapearCountdown, setDisapearCountdown] =
        useState<number | null>(null);

    const clearNotif = () => {
        dispatch(clearNotification());
        setDisapearCountdown(null);
    };

    useEffect(() => {
        if (typeof disapearCountdown === 'number') {
            if (disapearCountdown === 0) {
                clearNotif();
            }

            setTimeout(() => {
                setDisapearCountdown(disapearCountdown - 1);
            }, 1000);
        }
    }, [disapearCountdown]);

    useEffect(() => {
        if(notificationInfo.message){
            setDisapearCountdown(4);
        }
    }, [notificationInfo.message]);

    if (!notificationInfo.message) {
        return null;
    }

    return (
        <div
            className="w-full flex items-center justify-center fixed top-20 left-0 bg-transparent_dark"
            onClick={clearNotif}
        >
            <div className="w-[96%] max-w-[800px] p-2 rounded-lg bg-notification-red transition-all duration-300 hover:opacity-90 cursor-pointer">
                <p className="text-white">{notificationInfo.message}</p>
            </div>
        </div>
    );
};

export default MainNotification;
