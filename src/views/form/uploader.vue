/**
* Created by magefox on 17-11-21.
*/
<template>
    <div class="uploader-area">
    <div class="uploader" >
            <div class="uploader-left" @click="uploadFile" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)"> <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEmUlEQVR4Xu1b0VHcMBDVnvwfUkGggsRz6+9ABQkVABVAKghUEKiAo4JwFXB8WzeGCgIdwL9vlFmPzPgcy5JsWZwD+mI4WdZ72l2t3srAKi1N010AOGaMfa/+f+R/X0spL5IkWTThgPKfQohLxtjhyMG2TX+GiEf1DgUBbwB8ifsfEkCZ/c1/vPJr0KSUe1V3ACHENWPs21shgDE2R8SXGEcEyDcEvoCKiC+xr5UAKeUtAJxLKZ/GRBIAUDA/0M3ZigACnyTJ7piA17b0UwD42TR/KwIYY/uISPFhlC3Lsu3VavWnMwH1aDlGFnTxzcoC3gmo7ZfvFjBCBt5dQJPjvMcAm0TINQgKIQ4AYJs8ZTKZzOM4vnttrwniAlmWfcnz/BIAvtQANx4/Q5IShIA0TbMG8AVOKeVZkiSnIUFX3zU4Acvl8lBKSUKKrj0h4kcfBGRZthXHsdOZZHAC0jTV5tslaM557CMeCCF+M8auXNLzTSFgJ47jhz5WUCGaCLCW7QYngALgarXKdOB8nChripWTSw1OAAEXQpwzxkhJrrdnzvluH/NXJzoieKsyuPUpNQgBNDFloieMsQ8q+t9GUXTSE/xWnuc3DTuMtRsEI6BcHXIJxthTX59XlqWT6a3dIDgBfQJd9VmL7dXKDUZJgCmwKqKs3GB0BFCyo3aV4kzRN8EaHQFCCCrQWAmxNgnWqAho2U51hnCBiLTzaNtGEEDHZES8MkyUKjWU6rq0e0Ssn0DXnn91Asqia5u2oIIemX412TERMeecH5oOR0IIOjwVuUmlPSPiy7u0lSFXQaQ+41rF+QERd+p9KOhpkp02Aqx2AJVLNGWpa64zCAFN5fYmbaBDWd4aPBGgdhXSI8jFaNVnnPPTquV4J6AF1JOK3MXJcLlcnkgpf5lsvWq6nPNtk9k7jFd09UqAxYpeI+J+xzsJxqjvCt4rARbgy/ntM8Yoz3cJeiSvrV1sqIIVQhwDwBZVsTnnVy5W4sUCHMB3WaTimaqWXwO/ljxJKe+iKNqzJaE3ASHA6wjQuRIA/JhOp7QDGFsvAkKB1xGgC6QuanRnAkKCb7GARlF2cAJCg98oAgYGP1fJyoONnKaT5QezgAHB36vc3qmeGJSAgcGTeuxU9SG3CEZAh7O6cfspO9gIG7rBghFgjSZwx5bS3Gwymcx00wGAx1K57rwNDom1cm3flC6TdmjSD3VTXXDO9zeOgI4Hpa7rMd84AgJf3n7cOALSNF0AwNeuS+ryXHEXWicc9pXEXCZS7Wtz56Dr2PXnAOCo7ba4VfnJ12TKcZSMRRF8yG8YHqWUM7q+00bAAhH3fAO0HU8Jpq2yNwA0fumi0w6a3m36YGIhpTznnDtnabZAAeC+SxZI49vo/qZ5mAgwPe/ldwA4nU6nZ66D+SKADiCfXV/uu3+XoOuFAItavG+suvGcNH9vLqAGenUr6HKhyosFEAFq66FPS1/NFVxEjNKEvBFQDqiSELqH9ymU3av3WBU763PyTkAlGdnO87zrKcuJuyiK7npsg8bqr2kyLx8Qmjpu4u8aocaphDZqAmyqv6aF+wtk1Bw67F50LgAAAABJRU5ErkJggg==">
            </div>
            <div class="uploader-right">
                <input type="file" @change="fileChange($event)" id="upload_file" style="display: none;">
            </div>
    </div>
        <div class="info-area" @click="uploadPicture">
            选中了{{imageList.length}}张图片,共计{{bytesToSize(size)}}
        </div>

    </div>
</template>

<script>
    export default{
        props: ['width','height' ],
        components: {},
        data: function () {
            return {
                imageList:[],
                size:0,
            }
        },
        computed:{

        },
        methods: {
            uploadFile:function () {
               document.getElementById('upload_file').click()
            },
            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },
            drop (el) {
                el.stopPropagation();
                el.preventDefault();
                this.fileList(el.dataTransfer);
                /*el.dataTransfer:在进行拖放操作时，DataTransfer 对象用来保存被拖动的数据。它可以保存一项或多项数据、一种或者多种数据类型。*/
            },
            dragover(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            dragenter(el){
                el.stopPropagation();
                el.preventDefault();
            },

            fileList:function (fileList) {
                let files=fileList.files;
                /*文件夹判断*/
                for (let i = 0; i < files.length; i++)
                {
                    if(files[i].type !==''){
                        this.fileAdd(files[i])
                    }else {
                        this.folders(fileList.items[i])
                    }
                }
            },
            /*文件夹处理*/
            folders(files){
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                })
            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') === -1) {
                    this.imageList.push({
                        file
                    });
                } else {
                        this.vue.imageList.push({
                            file
                        });
                }
            },
            bytesToSize(bytes) {
                if (bytes === 0) return '0 B';
                let k = 1024, // or 1024
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            },
            uploadPicture:function () {
               console.log(baseURL/ImageSet)
            }
        },
        created: function () {
        }

    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
    .uploader {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        width: 500px;
        height: 500px;
        margin: 0;

    .uploader-left {
        padding-right: 10px;
        position: relative;
        height: 100%;
        width: 100%;
        border: 1px dashed #999;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }
    }
    }

</style>
