<template>
    <div class="fixed-navbar">
        <span @click="getClick(1000)" class="fixed-navbar__item to-message">给我留言</span>
        <template v-for="(item, index) in tableData">
            <div :class="`fixed-navbar__item ${active === index ? 'active' : ''}`" @click="getClick(index)">{{
                item.name
            }}</div>
        </template>
        <span @click="getClick(999)" class="fixed-navbar__item to-top">回到顶部 ↑</span>
    </div>
</template>

<script>
// import {tableData} from '../data/index.js';
export default {
    name: 'FixedNav',

    props: {
        handlerClick: {
            type: Function
        },
        active: {
            type: Number,
            default: 0
        },
        tableData: {
            type: Array,
            default: []
        }
    },

    components: {},

    data() {
        return {};
    },

    computed: {},

    methods: {
        async getClick(index) { 
            this.handlerClick(index);
        },
    },
};
</script>

<style lang="less" scoped>
.fixed-navbar {
    display: block;
    width: 120px;
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -730px;
    transform: translateY(125px);
    z-index: 100;
    color: #333;
    background-color: #fff;
    border: 1px solid #eee;
    border-bottom: none;

    &__item {
        color: #666;
        display: block;
        width: 100%;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        text-align: left;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        padding-left: 20px;
        box-sizing: border-box;
        cursor: pointer;
        &.active {
            font-weight: 700;
            color: cadetblue;
            background-color: #f6fbff;
        }

        &:hover {
            color: #666;
            background-color: #f6fbff;
        }
    }

    .to-message {
        background-color: cadetblue;
        color: #f5f5f5;
    }
    .to-top {
        background-color: #000;
        color: #f5f5f5;
    }
}
@media (max-width: 480px) {
    .fixed-navbar {
        display: none;
    }
}
</style>