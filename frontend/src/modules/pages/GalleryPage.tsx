import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { receiveFiles, setDbFileLen } from '../../redux/slices/appSlice';
import { ListFilesResponse } from '../../requests/fileRequests';
import { LIST_FILES_ROUTE } from '../../requests/routes';
import { PageComponent } from '../../types/PageComponent';
import PageModule from '../PageModule';

interface GalleryPageProps extends ListFilesResponse {}

const GalleryPage: PageComponent<GalleryPageProps> = ({
    files,
    cursor,
    total_db,
}) => {
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
        >
            sadasds
        </PageModule>
    );
};

GalleryPage.getInitialProps = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const route = `${LIST_FILES_ROUTE}?cursor=0&limit=15`;

    const res = await fetch(route, requestOptions);
    const resJson: ListFilesResponse = await res.json();

    return {
        ...resJson,
    };
};

export default GalleryPage;
