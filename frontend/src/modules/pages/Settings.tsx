import { NextPage } from 'next';
import React from 'react';
import Nav from '../../ui/navigation/Nav';
import PageModule from '../PageModule';

const Settings: NextPage = () => {
    return (
        <PageModule
            title="Settings"
            description="Kidala file upload. User settings"
            className="pt-24 px-2"
        >
            <Nav />
        </PageModule>
    );
};

export default Settings;
