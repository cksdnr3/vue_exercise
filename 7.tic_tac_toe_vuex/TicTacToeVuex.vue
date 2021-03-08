<template>
  <div>
    <div>turn: {{ turn }}</div>
    <table>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td @click="onClickTd(rowIndex, colIndex)" v-for="(colData, colIndex) in rowData" :key="colIndex">{{ colData }}</td>
      </tr>
    </table>
    <div v-if="winner">winner: {{ winner }}</div>
  </div>
</template>

<script>
// vuex를 사용하기 전 store를 메인 컴포넌트와 연결해줘야함.
import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from "./store";
import TableComponent from "./TableComponent";
import { mapState } from 'vuex';

export default {
  // vuex를 사용하기 전 store를 메인 컴포넌트와 연결해줘야함.
  store,
  components: {
    TableComponent
  },
  computed: {
    ...mapState([ 'winner', 'turn', 'tableData' ])
  },
  methods: {
    onClickTd(rowIndex, colIndex) {
      if (this.tableData[rowIndex][colIndex]) return;

      this.$store.commit(CLICK_CELL, { row: rowIndex, col: colIndex });

      let win = false;
      if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][colIndex] === this.turn && this.tableData[1][colIndex] === this.turn && this.tableData[2][colIndex] === this.turn) {
        win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
        win = true;
      }

      if (win) {

        this.$store.commit(SET_WINNER, this.turn);

        this.$store.commit(RESET_GAME)

      } else {

        let all = true;
        this.tableData.forEach((row) => {
          row.forEach((col) => {
            if(!col) {
              all = false;
            }
          });
        });
        if (all) {
          this.$store.commit(NO_WINNER);

          this.$store.commit(RESET_GAME);

        } else {
          this.$store.commit(CHANGE_TURN);
        }
      }
    }
  }
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