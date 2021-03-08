<template>
  <td @click="onClickTd">{{ colData }}</td>
</template>
<script>
export default {
  props: {
    colData: String,
    rowIndex: Number,
    colIndex: Number,
  },
  methods: {
    onClickTd() {
      if (this.colData) return;

      // 자식 컴포넌트가 최상위 컴포넌트의 data에 접근할 수 있는 방법이다.
      console.log(this.$root.$data);
      // 자식 컴포넌트가 부모 컴포넌트의 data에 접근할 수 있는 방법이다.
      console.log(this.$parent.$data);
      const rootData = this.$root.$data;

      // 일반데이터는 변경하면 변경된 값으로 렌더링 되지만
      // 배열이나 객체의 키로 값을 변경하려고하면 변경되지 않는다. 자바스크립트의 한계이다.
      // 배열의 메서드를 통해서 변경하면 변경된다!
      // 동작안하는 예시:
      // rootData.tableData[this.rowIndex][this.colIndex] = rootData.turn;
      // (실제 부모 데이터는 바뀌지만 자식 데이터와 맵핑이 안된다.)
      // 해결법은 두 가지가 있는데
      // import Vue from 'vue'
      // Vue.set(tableData[1], 0, 'X') 처럼 Vue를 임포트하고 Vue.set을 이용하는 방법과
      // this.$set(tableData[1], 0, 'X') 처럼 Vue를 임포트할 필요 없이 $set을 사용하면된다.
      this.$set(rootData.tableData[this.rowIndex], this.colIndex, rootData.turn);

      let win = false;
      if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][this.colIndex] === rootData.turn && rootData.tableData[1][this.colIndex] === rootData.turn && rootData.tableData[2][this.colIndex] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[2][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[0][0] === rootData.turn) {
        win = true;
      }

      if (win) {
        rootData.winner = rootData.turn;
        rootData.turn = 'O';
        rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
      } else {
        let all = true;
        rootData.tableData.forEach((row) => {
          row.forEach((cell) => {
            if(!cell) {
              all = false;
            }
          });
        });
        if (all) {
          rootData.turn = 'O';
          rootData.winner = '';
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else {
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
      }
    }
  }
}
</script>