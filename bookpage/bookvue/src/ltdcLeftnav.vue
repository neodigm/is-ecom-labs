<template id="v-leftnav__templ">
  <li>
    <div
      :class="{hidden: hidden}"
      @click="toggle">
      {{model.name}}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <ltdc-leftnav
        class="item"
        v-for="model in model.children"
        :model="model">
      </ltdc-leftnav>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'ltdc-leftnav',
  props: {
    model: Object
  },
  data: function () {
    return {
      ltdc_leftnav__hier: {name: "ltdc_leftnav__hier"},
      open: false,
      hidden: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  },
  mounted: function(){
    if( this.model.name === "level0" ){
      this.open = true;
      this.hidden = true;
    }
  }
}
</script>

<style>
  .item {
    background-color: #edba08;
  }
</style>
