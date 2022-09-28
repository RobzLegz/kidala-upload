import { useRouter } from 'next/router';
import React from 'react';
import ProfileSettings from './ProfileSettings';
import SettingsSidebar from './SettingsSidebar';

const SettingsContainer = () => {
    const router = useRouter();

    const { page } = router.query;

    return (
        <div className="flex items-start justify-start w-full px-12">
            <SettingsSidebar />

            {page === 'profile' ? <ProfileSettings /> : null}
        </div>
    );
};

export default SettingsContainer;
