<template>
  <div>
    <div>turn: {{ turn }}</div>
<!--    table을 compnent로 쪼개는 이유:-->
<!--    기존의 html로 테이블을 만들던 방식으로 테이블을 만들면-->
<!--    테이블요소 중 하나인 td를 바꾸면 table도 바뀌는 것이다.-->
<!--    하나의 table이 바뀐다면 아래 tr 모두를 바꾸는 것이고 tr을 바꾼다는 것은-->
<!--    모든 td를 바꾼다는 것이다. 그렇다면 3 x 3의 테이블이 있다면 총 9개의 td가 update되는 것이고-->
<!--    그 것은 성능의 저하를 불러일으킨다. 그러므로 컴포넌트를 쪼개 component하나가 update되게 하는 것이-->
<!--    성능을 증가시키는 코드이다.-->
    <table-component :table-data="tableData"/>
    <div v-if="winner">winner: {{ winner }}</div>
  </div>
</template>

<script>
  import TableComponent from "./TableComponent";

  export default {
    components: {
      TableComponent
    },
    data() {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        winner: '',
      };
    },
  };
</script>

<style>
div {
  font-size: 2rem;
}
table {
  border-collapse: collapse;
}
td {
  border: 2px solid black;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>