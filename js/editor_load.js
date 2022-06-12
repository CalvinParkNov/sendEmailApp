ClassicEditor.create(document.querySelector('textarea[name="contents"]'), {
        language: 'ko'

    }).then(function (editor) {
        objEditor = editor;
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };

        $('style').append('.ck-editor__editable { min-height: ' + $('textarea[name="contents"]').height() + 'px !important; }');
    }).catch(function (error) {

        console.log(error);

    });
    
    class MyUploadAdapter {

    constructor(loader) {

        this.loader = loader;

    }

    upload() {

        return this.loader.file

            .then(file => new Promise((resolve, reject) => {

                this._initRequest();

                this._initListeners(resolve, reject, file);

                this._sendRequest(file);

            }));

    }

    abort() {

        if (this.xhr) { this.xhr.abort(); }

    }

    _initRequest() {

        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', '/index.php/dataFunction/upload_receiver_from_ck', true);

        xhr.responseType = 'json';

    }

    _initListeners(resolve, reject, file) {

        const xhr = this.xhr;

        const loader = this.loader;

        const genericErrorText = "Couldn't upload file: ${ file.name }.";

        xhr.addEventListener('error', () => reject(genericErrorText));

        xhr.addEventListener('abort', () => reject());

        xhr.addEventListener('load', () => {

            const response = xhr.response;

            if (!response || response.error) {

                return reject(response && response.error ? response.error.message : genericErrorText);

            }

            resolve({

                default: response.url

            });

        });

        if (xhr.upload) {

            xhr.upload.addEventListener('progress', evt => {

                if (evt.lengthComputable) {

                    loader.uploadTotal = evt.total;

                    loader.uploaded = evt.loaded;

                }

            });

        }

    }

    _sendRequest(file) {

        const data = new FormData();

        data.append('upload', file);

        this.xhr.send(data);

    }

}