<template>
  <div id="app" data-server-rendered="true">
    <MenuTemplate>
      <router-view />
    </MenuTemplate>
  </div>
</template>
<script>
import MenuTemplate from "./menu/menu";

export default {
  components: { MenuTemplate },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #7a7580;
}
.b-card {
  border-radius: 15px !important;
  overflow: hidden;
}
.b-card.imgCard {
  max-height: 200px;
  max-width: 1024px;
}
.container-fluid {
  padding-right: 1% !important;
  padding-left: 1% !important;
}
</style>
