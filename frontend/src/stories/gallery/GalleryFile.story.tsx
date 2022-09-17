import React from 'react';
import { Story } from '@storybook/react';
import GalleryFile, { GalleryFileProps } from '../../ui/gallery/GalleryFile';
import { FileInterface } from '../../interfaces/file';
import { toBoolean } from '../utils/toBoolean';
import { toNumber } from '../utils/toNumber';

export default {
    title: 'Gallery/GalleryFile',
    component: GalleryFile,
};

const testFile = {
    name: 'Insane.mp4',
    hash: 'da7c4174d96171cf35ea8f1d3d6567d9',
    size: 1229201,
    author: '',
    email: '',
    phoneNumber: '',
    private: false,
    is_ad: false,
    tag: 'crazy',
    description: 'sasgdbasd sauhdusva uogdvas vodsauvd uasd',
} as FileInterface;

const galleryFileProps: GalleryFileProps = {
    props: testFile,
    testLikes: 10,
    testShares: 20,
    testSaves: 30,
    testGivenLikes: 3,
};

export const Main: Story<GalleryFileProps> = ({ ...props }) => (
    <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        <GalleryFile
            testSaved={props.testSaved}
            testLikes={props.testLikes || galleryFileProps.testLikes}
            testShares={props.testShares || galleryFileProps.testShares}
            testSaves={props.testSaves || galleryFileProps.testSaves}
            testGivenLikes={
                props.testGivenLikes || galleryFileProps.testGivenLikes
            }
            {...props}
            props={galleryFileProps.props}
        />
    </div>
);

Main.argTypes = {
    testSaved: toBoolean(),
    testLikes: toNumber(),
    testShares: toNumber(),
    testSaves: toNumber(),
    testGivenLikes: toNumber(),
};

Main.bind({});
