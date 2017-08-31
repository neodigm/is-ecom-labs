<template>
  <div id="ltdcLeftnav">
    <h1>{{ msg }}</h1>
    <h2>Ducks</h2>
  </div>

<ltdc-leftnav id="js-leftnav__id">1111
  <ltdc-leftnav-nav level="1" desc="" href="">QQQQ</ltdc-leftnav-nav>
</ltdc-leftnav>

</template>

<script>
export default {
  name: 'ltdcLeftnav',
  data () {
    return {
      msg: 'leftnav'
    }
  }
}
</script>

<style>
  #ltdcLeftnav {
    background-color: #edba08;
  }
</style>
