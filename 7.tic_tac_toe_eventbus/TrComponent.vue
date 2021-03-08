<template>
  <tr>
    <td-component v-for="(colData, index) in rowData" :key="index" :col-data="colData" :col-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
  import TdComponent from "./TdComponent";
  export default {
    components: {
      TdComponent
    },
    props: {
      rowData: Array,
      rowIndex: Number,
    },
  }
</script>