import React from 'react';
import { Story } from '@storybook/react';
import UploadForm from '../../ui/uploadForm/UploadForm';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';

export default {
    title: 'UploadForm',
    component: UploadForm,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story = ({ ...props }) => {
    return <UploadForm {...props} />;
};

Main.bind({});
