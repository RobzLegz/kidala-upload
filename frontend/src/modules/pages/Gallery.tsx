import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { receiveFiles, setDbFileLen } from '../../redux/slices/appSlice';
import { ListFilesResponse, getFromHash } from '../../requests/fileRequests';
import { LIST_FILES_ROUTE } from '../../requests/routes';
import { PageComponent } from '../../types/PageComponent';
import { default as GalleryComponent } from '../../ui/gallery/Gallery';
import GalleryNotification from '../../ui/notifications/MainNotification';
import Nav from '../../ui/navigation/Nav';
import PageModule from '../PageModule';
import { FileInterface } from '../../interfaces/file';

interface GalleryProps extends ListFilesResponse {
    og_file?: FileInterface;
}

const Gallery: PageComponent<GalleryProps> = ({ files, total_db, og_file }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            if (files) {
                dispatch(receiveFiles(files));
            }

            if (total_db) {
                dispatch(setDbFileLen(total_db));
            }
        } catch (err) {}
    }, []);

    return (
        <PageModule
            title="Gallery"
            description="Kidala life - combining social media with file upload"
            className="pt-24"
            file={og_file}
        >
            <Nav gallery />

            <GalleryNotification />

            <GalleryComponent />
        </PageModule>
    );
};

Gallery.getInitialProps = async ({ pathname, query, asPath }) => {
    try {
        let file: FileInterface | undefined = undefined;

        if (typeof query?.f === 'string') {
            file = await getFromHash(query.f);
            console.log(file);
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const route = `${LIST_FILES_ROUTE}?cursor=0&limit=15`;

        const res = await fetch(route, requestOptions);
        const resJson: ListFilesResponse = await res.json();

        if (file) {
            return {
                ...resJson,
                og_file: file,
            };
        }

        return {
            ...resJson,
        };
    } catch (err) {
        return {};
    }
};

export default Gallery;
