<template>
  <div>
    <mine-form></mine-form>
    <div>{{ timer }}</div>
    <table-component></table-component>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from "./store";
import MineForm from './MineForm'

export default {
  components: {
    MineForm
  },
  computed: {
    ...mapState(['timer', 'result'])
  },
  methods: {

  }
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>