<template>
    <a
        class="item"
        :href="item.website"
        target="_blank"
        @click="handleItemClick"
    >
        <div class="item__title-logo">
            <img class="item__logo" v-lazy="icon" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
            <span class="item__title">{{ item.name }}</span>
        </div>

        <div class="item__desc">
            {{ item.desc || '-' }}
        </div>

        <div class="item__children">
            <template v-for="child in item.children">
                <a
                    :href="child.website"
                    target="_blank"
                    @click.stop="handleChildClick(child)"
                    class="item__child"
                    >{{ child.name }}</a
                >
            </template>
        </div>
    </a>
</template>

<script>
// created at 2021-09-29
import {useHotDataStore} from '@/stores/hot-data-store.js';
import {mapActions} from 'pinia';

// const store = useHotDataStore()

// 是否是完整的url路径
const isCompleteURL = (url) => {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
}

export default {
    name: 'Item',

    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },

    components: {},

    data() {
        return {};
    },

    computed: {
        icon() {
            if (this.item.icon) {
                if (isCompleteURL(this.item.icon)) {
                    return this.item.icon;
                } 
                return `${this.$static_url}/static/img/${this.item.icon}`;
            } else {
                return '//dcdn.it120.cc/2023/03/30/1c940fcc-754a-428a-a32a-eca971b8a95b.ico';
            }
        },
    },

    methods: {
        async getData() { },

        getSrc(name) {
            const path = `/assets/img/${name}`;
            const modules = import.meta.globEager('/assets/img/**');
            // console.log(modules);

            return modules[path].default;
        },

        handleItemClick() {
            // console.log('handleItemClick', this.item);
            // this.appendItem(this.item)
            // useHotDataStore.appendItem(this.item)
            this.appendItem(this.item)
        },

        handleChildClick(child) {
            // console.log('handleChildClick', child);
            this.appendItem(child)
        },

        ...mapActions(useHotDataStore, ['appendItem']),
    },

    created() {
        // console.dir(useHotDataStore);
        this.getData();
    },
};
</script>

<style lang="less" scoped>
.lazyload,
.lazyloading {
	opacity: 0;
}
.lazyloaded {
	opacity: 1;
	transition: opacity 300ms;
}

.item {
    display: block;
    border-radius: 6px;
    background: #ffffff;
    padding: 10px;
    border: 1px solid #e4ecf3;
    box-shadow: 1px 2px 3px #f2f6f8;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.02);
        border: 1px solid #adb4bb;
        box-shadow: 1px 5px 3px #f2f6f8;
        background-color: #fafafa;
    }

    &__logo {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        vertical-align: middle;
        object-fit: contain;
    }

    &__title {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;
        color: #3273dc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10px;
    }

    &__desc {
        color: gray;
        font-size: 12px;
        padding-top: 10px;
        height: 35px;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    &__child {
        font-size: 13px;
        color: #080;
        display: inline-block;

        &:hover {
            text-decoration: underline;
        }

        &::after {
            content: '|';
            padding-left: 5px;
            padding-right: 5px;
        }

        &:last-child::after {
            content: '';
        }
    }
}
@media (max-width: 480px) {
    .item {
        overflow: hidden;
        text-overflow: ellipsis;

        &__title {
            height: 30px;
            line-height: 30px;
        }
        &__desc {
            display: none;
        }
        &__logo {
            height: 30px;
            width: 30px;
        }
        &__title-logo {
            display: flex;
        }
        &__children {
            display: none;
        }
    }
}
</style>