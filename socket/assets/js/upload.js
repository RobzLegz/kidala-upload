let Upload = {
    init(socket) {
        let channel = socket.channel('upload:lobby', {});
        channel.join();
        this.listenForUpload(channel);
    },
    listenForUpload(channel) {
        document
            .getElementById('upload-form')
            .addEventListener('submit', (e) => {
                e.preventDefault();

                let msg = document.getElementById('msg').value;

                channel.push('shout', { msg: msg });

                document.getElementById('msg').value = '';

                channel.on('shout', (payload) => {
                    let msgBox = document.querySelector('#msg-box');
                    let msgBlock = document.createElement('p');

                    msgBlock.insertAdjacentHTML('beforeend', `${payload.msg}`);
                    msgBlock.className = 'msg';

                    msgBox.appendChild(msgBlock);
                });
            });
    },
};

export default Upload;
