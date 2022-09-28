import React from 'react';
import { ListFilesResponse } from '../../requests/fileRequests';
import { PageComponent } from '../../types/PageComponent';
import Nav from '../../ui/navigation/Nav';
import PageModule from '../PageModule';
import MyFilesContainer from './../../ui/gallery/MyFilesContainer';

interface MyFilesProps extends ListFilesResponse {}

const MyFiles: PageComponent<MyFilesProps> = () => {
    return (
        <PageModule
            title="MyFiles"
            description="Kidala life - combining social media with file upload"
            className="pt-24"
        >
            <Nav myFiles />

            <MyFilesContainer />
        </PageModule>
    );
};

export default MyFiles;
