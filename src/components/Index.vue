<template>
    <div ref="pageContainer">
        <Header />

        <Search class="margin-top--20" />

        <!-- 热点数据 -->
        <HotData></HotData>

        <div class="page-container" >
            <template v-for="(item, index) in tableData">
                <div class="item-container" ref="itemContainer">
                    <h2 :id="`id-${index}`">{{ item.name }}</h2>
                    <div class="item-wrap">
                        <template v-for="child in item.children">
                            <Item :item="child"></Item>
                        </template>
                    </div>
                </div>
            </template>
        </div>

        <Footer />

        <FixedNavBar ref="fixedNavBar" :handlerClick="onHandlerClick" :active="active" :tableData="tableData"  />
    </div>
</template>

<script>
// created at 2021-09-29
import Item from './Item.vue';
// import {tableData} from '../data/index.js';
import FixedNavBar from './FixedNavBar.vue';
import Footer from './Footer.vue';
import Header from './Header.vue';
import Search from './newSearch/index.vue';
import HotData from './HotData.vue';
import { basic } from '../api';

export default {
    name: 'Index',

    props: {},

    components: {
        Item,
        FixedNavBar,
        Footer,
        Header,
        Search,
        HotData,
    },

    data() {
        return {
            tableData: [],
            active: 0,
            activeArr: []
        };
    },

    computed: {
    },
    async mounted() {
        await this.queryList();
        this.init()
        window.onresize = () => {
            this.init()
        }
    },

    methods: {
        async queryList() {
            const res = await basic.QueryList({});
            this.tableData = res;
        },
        init() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.activeArr = []
                    this.$refs['itemContainer']?.map(item => {
                        // item.style.background = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
                        this.activeArr.push(item.offsetTop)
                    })
                }, 0); // 延时加载，防止拿到的数值不准确

                window.addEventListener('scroll', this.onScroll);
            })
        },
        onHandlerClick(index) {
            this.active = index;
            const top = index !== 999 ? this.$refs['itemContainer'][index].offsetTop : 0
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            })
        },
        onScroll() {
            let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
            this.activeArr.map((item, index) => {
                if (scrolled + 200 >= item) {
                    this.active = index
                    
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
.page-container {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
}
.item-container {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;

    h2 {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .item-wrap {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        /* 指定行列间距 */
        row-gap: 14px;
        column-gap: 14px;
    }
}

@media (max-width: 480px) {
    .page-container {
        width: 94%;
    }
    .item-container {
        .item-wrap {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
</style>