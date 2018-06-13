// component/listitem/list_item.js
Component({
    externalClasses: ['listItem'],
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      tapItem(e){
          const { id } = e.currentTarget.dataset;
          this.triggerEvent('tabItemHandle', { id })
      }
  }
})