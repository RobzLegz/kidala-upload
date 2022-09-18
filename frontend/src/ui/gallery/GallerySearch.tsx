import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { HistoryItem } from '../search/History';
import GlobalSearch from '../search/GlobalSearch';

const history: HistoryItem[] = [
    { id: '1', term: 'javascript' },
    { id: '2', term: 'react graphql' },
    { id: '3', term: 'español' },
    { id: '4', term: 'elon musk interview' },
    { id: '5', term: 'elon muk' },
]; // make this dynamic

const GallerySearch = () => {
    const appInfo: AppInfo = useSelector(selectApp);

    const [term, setTerm] = useState('');

    return (
        <div className="flex-1 pl-4 2xl:pl-16 pr-2">
            <GlobalSearch
                term={term}
                setTerm={setTerm}
                history={history}
                searchResults={
                    appInfo.files
                        ? appInfo.files.filter(
                              (file) =>
                                  file.name
                                      .toLowerCase()
                                      .substring(0, term.length) ===
                                  term.toLowerCase()
                          )
                        : []
                }
            />
        </div>
    );
};

export default GallerySearch;
