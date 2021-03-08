<template>
  <tr>
    <td-component v-for="(_, index) in rowData" :key="index" :col-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
  import TdComponent from "./TdComponent";
  export default {
    components: {
      TdComponent
    },
    computed: {
      rowData() {
        return this.$store.state.tableData[this.rowIndex];
      }
    },
    props: {
      rowIndex: Number,
    },
  }
</script>