import Vuex from 'vuex';
import Vue from 'vue';

// vue와 vuex를 vuex를 사용하기 전에 연결해줘야함.
Vue.use(Vuex);

// export const 와 export default의 차이:
// export const 는 이 파일의 데이터를 import 할 때 import { 변수명 } from '경로'; 이런 식으로 가져가야한다.
// 이 때 변수명은 반드시 같아야 한다.
// export default 는 이 파일을 import 할 때 쓰인다. import 파일명 from '경로' 이런 식으로 가져가야한다.

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
    state: {
        // vue의 data와 유사함
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    },
    getters: {
        // vue의 computed와 유사함
    },
    mutations: {
        // state는  mutation을 통해서 바꾸는 것을 매우 권장함.
        // state를 수정할 때 사용해요. 동기적으로
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, col }) {
            // vuex에는 this.$set이 없기 때문에 배열에 데이터를 넣기 위해선 Vue.set을 사용해야함
            Vue.set(state.tableData[row], col, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    },
    actions: {
        // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
    },
})