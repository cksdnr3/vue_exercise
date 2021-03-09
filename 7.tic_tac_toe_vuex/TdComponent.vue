<template>
  <td @click="onClickTd">{{ colData }}</td>
</template>
<script>
import { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from "./store";
import { mapState } from 'vuex';

export default {
  props: {
    rowIndex: Number,
    colIndex: Number,
  },
  computed: {
    // 현재 이 상태에서 웹 페이지에서 게임을 해보면 이전과 달리 update가 9번 실행되는 것을 볼 수 있다.
    // 왜그럴까?
    // vuex state관리를 computed에서 하기 때문이다.
    // 그렇다면 기존의 component를 쪼개놓은 의미가 없어지는 문제가 생긴다.
    // 어떻게 해결할까?
    // 그냥 컴포넌트를 나누지말고 하나의 메인컴포넌트에서 실행하는 방법이 최선...
    // 사실 vue는 virtualDOM알고리즘이 화면이 달라진 것을 확인해서
    // 변경된 화면을 띄우는데 실제로 데이터가 변경되지 않으면 화면을 다시그리지 않는다. (이미최적화 되어있음)
    // 그러므로 정말로 성능상에 문제는 없지만 1개씩 올라가는 update를 보면 마음이 편한다.
    ...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      colData(state) {
        return state.tableData[this.rowIndex][this.colIndex];
      },
    }),


    // vuex의 state를 사용하기 위해선 computed에 연결하여 사용해야 한다.
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
    // vuex를 쓰면 부모 컴포넌트에서 데이터를 내려받을 필요 없이
    // state에 있는 정보를 사용하면 된다.
    // colData() {
    //   return this.$store.state.tableData[this.rowIndex][this.colIndex];
    // }
  },
  methods: {
    onClickTd() {
      if (this.colData) return;

      // this.$set(this.tableData[rowIndex], colIndex, this.turn);
      // 위 부분은 state가 변하는 부분이다. 이를 state를 변경시키는 작업은 mutation에 정의되어 있고
      // mutation을 호출하는 방법은 commit을 통해서 호출한다.
      // this.$store.commit('뮤테이션 이름') 혹은
      // this.$store.commit(뮤테이션 변수명) 뮤테이션 변수를 import해서 사용한다.
      // 뮤테이션 변수를 사용하면 오타를 잡아내기 쉽다!
      this.$store.commit(CLICK_CELL, { row: this.rowIndex, col: this.colIndex });

      let win = false;
      if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][this.colIndex] === this.turn && this.tableData[1][this.colIndex] === this.turn && this.tableData[2][this.colIndex] === this.turn) {
        win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
        win = true;
      }

      if (win) {
        // this.winner = this.turn;
        // commit의 2번째 인자로 SET_WINNER에 인자를 보낼 수 있다.
        this.$store.commit(SET_WINNER, this.turn);

        // this.turn = 'O';
        // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        this.$store.commit(RESET_GAME)
      } else {
        let all = true;
        this.tableData.forEach((row) => {
          row.forEach((cell) => {
            if(!cell) {
              all = false;
            }
          });
        });
        if (all) {
          // this.winner = '';
          this.$store.commit(NO_WINNER);

          // this.turn = 'O';
          // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          this.$store.commit(RESET_GAME);
        } else {
          // this.turn = this.turn === 'O' ? 'X' : 'O';
          this.$store.commit(CHANGE_TURN);
        }
      }
    }
  }
}
</script>