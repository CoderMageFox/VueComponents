/**
* Created by magefox on 17-10-23.
*/
<template>
    <div class="page-default">
        <div class="leftpage">
            <h1>首字母检索选择组件</h1>
            <h3>传入首字母版本</h3>
            <h5>使用说明: 该组件用于首字母选择后跳转至对应汉字开头为该字母的选项.传入数据格式如下:</h5>
            <img src="../../statics/pics/data.png"/>
        </div>
        <b>组件内调取的接口请自行修改.</b>
     <p>注:数据格式为json格式,具体数据可以参考/mock文件夹下的namelist.json文件,此处使用<b>EasyMock</b>封装成了网络请求.</p>
        实现效果如下:
       <FirstletterSelect></FirstletterSelect>
    </div>
</template>
<script>
    import FirstletterSelect from "../../wheels/FirstletterSelect.vue"
    export default{
        props: [],
        components: {FirstletterSelect},
        data: function () {
            return {}
        },
        methods: {
        },
        created: function () {
        }

    }
</script>
<style>
    *{

    }
</style>