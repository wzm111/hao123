<template>
    <div class="header-wrap">
        <div class="header">
            <div class="logo">
                <a href="#">
                    <h1>程序员导航</h1>
                </a>
            </div>

            <div class="data-time" v-formatdate="{times: nowDate, format: 'YYYY年MM月DD日 hh:mm:ss 星期w', zh: true}">
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'Header',

    props: {},

    components: {},

    data() {
        return {
            nowDate: new Date()
        };
    },

    computed: {},

    methods: {
    },

    created() {
        setInterval(() => {
            this.nowDate = new Date();
        }, 1000)
    },
};
</script>

<style lang="less" scoped>
.header-wrap {
    width: 100%;
    background-color: #000;
    color: #fff;
}
.header {
    height: 50px;
    line-height: 50px;
    width: 1200px;
    margin: 0 auto;
    font-size: 18px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    .logo {
        flex: 1;
        h1 {
            color: #fff;
        }
    }
    .data-time {
        text-align: right;
    }
}

@media (max-width: 480px) {
    .header {
        width: 100%;
    }
}
</style>