import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { receiveFiles, setDbFileLen } from '../../redux/slices/appSlice';
import { ListFilesResponse } from '../../requests/fileRequests';
import { LIST_FILES_ROUTE } from '../../requests/routes';
import { PageComponent } from '../../types/PageComponent';
import { default as GalleryComponent } from '../../ui/gallery/Gallery';
import GalleryNotification from '../../ui/notifications/MainNotification';
import Nav from '../../ui/navigation/Nav';
import PageModule from '../PageModule';

interface GalleryProps extends ListFilesResponse {}

const Gallery: PageComponent<GalleryProps> = ({ files, total_db }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (files) {
            dispatch(receiveFiles(files));
        }

        if (total_db) {
            dispatch(setDbFileLen(total_db));
        }
    }, []);

    return (
        <PageModule
            title="Gallery"
            description="Kidala life - combining social media with file upload"
            className="pt-24"
        >
            <Nav gallery />

            <GalleryNotification />

            <GalleryComponent />
        </PageModule>
    );
};

Gallery.getInitialProps = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const route = `${LIST_FILES_ROUTE}?cursor=0&limit=15`;

    const res = await fetch(route, requestOptions);
    const resJson: ListFilesResponse = await res.json();console.log(resJson)

    return {
        ...resJson,
    };
};

export default Gallery;
