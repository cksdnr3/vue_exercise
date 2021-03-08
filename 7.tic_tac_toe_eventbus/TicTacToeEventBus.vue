<template>
  <div>
    <div>turn: {{ turn }}</div>
    <table-component :table-data="tableData"/>
    <div v-if="winner">winner: {{ winner }}</div>
  </div>
</template>

<script>
  import TableComponent from "./TableComponent";
  import EventBus from "./EventBus";

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
    methods: {
      onClickTd(rowIndex, colIndex) {
        this.$set(this.tableData[rowIndex], colIndex, this.turn);
        console.log("rowIndex: " + rowIndex,"colIndex: " + colIndex)

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
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
            this.turn = 'O';
            this.winner = '';
            this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          } else {
            this.turn = this.turn === 'O' ? 'X' : 'O';
          }
        }
      }
    },
    // 컴포넌트가 생성될 때 이벤트 버스에 메서드들을 실는다.
    // 이벤트 버스를 사용하면 좋은점:
    // 데이터가 정의된 곳에서 데이터를 전부 가공하고 실행이 필요한 곳에서 버스를 호출해 메서드를 실행한다.
    // 데이터가 정의된 곳에서 데이터를 가공하기 때문에 코드가 짧아지고 $root 와 같은 코드를 안써도 돼
    // 가독성이 좋아진다.
    created() {
      // 사용자 정의(커스텀) event를 정의할 수 있다.
      EventBus.$on('clickTd', this.onClickTd);
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