import React from 'react';
import UploadForm from '../upload/UploadForm';

function HomePage() {
    return (
        <div className="page flex items-center justify-center flex-col bg-orange-400">
            <div className="absolute w-full left-0 top-0 flex items-center justify-start overflow-hidden z-0">
                <img
                    src="https://images.theconversation.com/files/457639/original/file-20220412-26-ftg3ry.png?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
                    alt="ad"
                    className="h-40 cursor-pointer"
                />

                <img
                    src="https://cdn.vox-cdn.com/thumbor/-uvRiraMIb4gwwf53270ZzzslXo=/0x209:1366x924/fit-in/1200x630/cdn1.vox-cdn.com/uploads/chorus_asset/file/8491551/Sketchy_page.png"
                    alt="sus"
                    className="h-40 cursor-pointer"
                />

                <img
                    src="https://i.kym-cdn.com/photos/images/facebook/001/916/022/5ad.png"
                    alt="ad"
                    className="h-40 cursor-pointer"
                />
                <img
                    src="https://computerrepairdoctor.com/wp-content/uploads/2017/07/1000000th-visitor.jpg"
                    alt="ad"
                    className="h-40 cursor-pointer"
                />
                <img src="https://preview.redd.it/c1uelats21k31.jpg?auto=webp&s=378257a87e4d721b52b911c11acc913794370ec6" alt="ad" className="h-40 cursor-pointer" />

                <img src="https://weburbanist.com/wp-content/uploads/2010/05/Montage2.gif" alt="ad" className="h-40 cursor-pointer" />
            </div>

            <h1 className="mb-20 text-white">Kidala upload</h1>

            <UploadForm />

            <div className="absolute w-full left-0 bottom-0 flex items-center justify-start overflow-hidden z-0">
                <img src="https://cdn.discordapp.com/attachments/781481173930737664/951548287310245978/unknown.png" alt="ad" className="h-40 cursor-pointer" />
                <img src="https://pics.me.me/thumb_single-ballers-in-your-area-70269911.png" alt="ad" className="h-40 cursor-pointer" />
                <img src="https://art.ngfiles.com/images/983000/983657_relatedguy_meet-hot-milfs-in-your-area.gif?f1565294763" alt="ad" className="h-40 cursor-pointer" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT61zWdnDrqaS345Z5UZAplIerVRFOTNC_IrdS2PItL2BCKtDND2ZjcrCBT_p2N3WGF1cY&usqp=CAU" alt="ad" className="h-40 cursor-pointer" />
                <img src="https://img-comment-fun.9cache.com/media/a2Ro5NO/aoKrJjn0_700w_0.jpg" alt="ad" className="h-40 cursor-pointer" />
                <img src="https://krebsonsecurity.com/wp-content/uploads/2012/06/snapad.png" alt="ad" className="h-40 cursor-pointer" />
                <img src="http://cdn.gsmarena.com/pics/15/01/micromax-ads/gsmarena_001.jpg" alt="ad" className="h-40 cursor-pointer" />
                <img src="https://preview.redd.it/o2no22xotw761.jpg?width=640&crop=smart&auto=webp&s=e039cd40e5deb8e456a377e060304545fd9e57b6" alt="ad" className="h-40 cursor-pointer" />
                <img src="" alt="ad" className="h-40 cursor-pointer" />
            </div>
        </div>
    );
}

export default HomePage;
