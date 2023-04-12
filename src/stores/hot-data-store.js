/**
 * 热点数据
 */
import {defineStore} from 'pinia';

export const useHotDataStore = defineStore({
  id: 'HotData',

  state: () => {
    return {
      list: []
    }
  },

  getters: {
    reverselist: (state) => {
      return state.list;
    },

    hasHotData() {
      return this.reverselist && this.reverselist.length > 0;
    }
  },

  actions: {
    async loadHotData() {
      let data = await $localStore.getItem('HotData');
      if (data) {
        this.list = data;
      }
    },

    async clearHotData() {
      this.list.splice(0, this.list.length);
      await $localStore.removeItem('HotData');
    },

    async appendItem(item) {
      // 如果已经存在就删除
      let index = this.list.findIndex((row) => {
        return row.name == item.name
      })

      if (index > -1) {
        this.list.splice(index, 1);
      }

      // 最多存10个
      this.list.splice(9, this.list.length);

      this.list = [item, ...this.list];

      await $localStore.setItem('HotData', this.list);
    }
  }
})
