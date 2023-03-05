import { NextPage } from 'next';
import React from 'react';
import Nav from '../../ui/navigation/Nav';
import SettingsContainer from '../../ui/settings/SettingsContainer';
import PageModule from '../PageModule';

const Settings: NextPage = () => {
    return (
        <PageModule
            title="Settings"
            description="Kidala file upload. User settings"
            className="pt-24 px-2"
        >
            <Nav />

            <SettingsContainer />
        </PageModule>
    );
};

export default Settings;
