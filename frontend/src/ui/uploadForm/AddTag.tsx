import { HashtagIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    NotificationInfo,
    selectNotification,
    setNotification,
} from '../../redux/slices/notificationSlice';

export interface AddTagProps {
    tag?: string;
    opened?: boolean;
    className?: string;
    addTag?: (e?: React.MouseEvent) => void;
    setOpened?: React.Dispatch<React.SetStateAction<boolean>>;
    setTag?: React.Dispatch<React.SetStateAction<string>>;
}

export const AddTag: React.FC<AddTagProps> = ({
    tag,
    setTag,
    opened,
    setOpened,
    className,
    addTag,
}) => {
    const dispatch = useDispatch();

    const notificationInfo: NotificationInfo = useSelector(selectNotification);

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();

        if (tag && addTag) {
            if (tag.length > 25) {
                dispatch(
                    setNotification({
                        type: 'error',
                        message: "Tags can't be that long!",
                    })
                );

                return;
            }

            addTag();
            dispatch(clearNotification());

            return;
        }

        setOpened && setOpened(!opened);
    };

    return (
        <div
            className={`h-6 transition-all duration-300 rounded-full flex items-center justify-center relative ${
                opened
                    ? 'w-48 bg-primary-800 border-2 border-primary-200'
                    : 'w-6 bg-accent'
            } ${className && className}`}
        >
            <button
                className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer`}
                onClick={handleOpen}
            >
                <HashtagIcon
                    className={`h-4 ${opened ? 'text-accent' : 'text-white'}`}
                />
            </button>

            <div
                className={`items-center justify-start flex transition-all duration-300 h-full ${
                    !opened ? 'w-0.5' : 'w-full'
                }`}
            >
                <input
                    type="text"
                    name="hashtag_new"
                    id="hashtag_new"
                    className={`w-full h-full bg-transparent outline-none text-primary-100 placeholder-primary-200 text-xs ${
                        !opened ? 'hidden' : 'block'
                    }`}
                    placeholder="Enter tag"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    value={tag}
                    onChange={(e) => setTag && setTag(e.target.value)}
                />

                <button
                    className={`bg-accent rounded-full flex items-center justify-center font-bold ${
                        opened ? 'px-2 h-full' : 'hidden'
                    }`}
                    type="button"
                    onClick={addTag}
                >
                    +
                </button>
            </div>

            {notificationInfo.message === "Tags can't be that long!" ? (
                <div
                    className="flex absolute -bottom-7 left-0 items-center justify-start bg-notification px-2 py-0.5 rounded-full"
                    onMouseOver={() =>
                        setTimeout(() => dispatch(clearNotification()), 500)
                    }
                >
                    <small className="text-white text-xs">
                        Tags can't be that long
                    </small>
                </div>
            ) : null}
        </div>
    );
};
