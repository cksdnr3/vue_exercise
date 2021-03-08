<template>
  <div>
    <div>당첨 숫자</div>
    <div id="result">
<!--      부모가 자식한테 data를 넘겨 줄때 넘겨줄 데이터를 태그에 적고 자식 컴포넌트에서 prps로 받는다.-->
      <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">Again?</button>
  </div>
</template>

<script>
  import LottoBall from "./LottoBall";

  function getWinNumb() {
    console.log('getWinNumb()');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1) [0]);
    }
    const bonusNumb = shuffle[shuffle.length - 1];
    const winNumb = shuffle.slice(0, 6).sort((p, c) => p - c);

    return [...winNumb, bonusNumb];
  }

  const timeOut = [];

  export default {
    components: {
      LottoBall,
    },
    data() {
      return {
        winNumb: getWinNumb(),
        winBalls: [],
        bonus: null,
        redo: false,
      }
    },
    computed: {

    },
    methods: {
      onClickRedo() {
        this.winNumb = getWinNumb();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        // watch 조건 대신에 onClick이벤트 발생시 showBalls가 작동하도록 만드는 것이 좋다는 말!
        this.showBalls();
      },
      showBalls() {
        // timeout timeInterval 같은 메서드는 컴포넌트가 사라진 이후에도 동작하기 때문에
        // 항상 clear해줘야 한다. 반복문안에 비동기 타임아웃이 6개 보너스 타임아웃이 1개 총 7개의 타임아웃을 꺼줘야한다.
        // 타임아웃을 끄기위해선 변수에 타임아웃을 담아야하고 여러개의 자료를 처리하기 위해선 배열에 담아 처리하는 것이 좋다.
        for (let i = 0; i < this.winNumb.length - 1; i++) {
          timeOut[i] = setTimeout(() => {
            this.winBalls.push(this.winNumb[i]);
          }, (i + 1) * 1000)
        }
        timeOut[6] = setTimeout(() => {
          this.bonus = this.winNumb[6];
          this.redo = true;
        }, 7000);
      }
    },
    // watch는 data의 변경이 있으면 메서드가 실행되는데, 아래와 같은 구조를 가지고 있다.
    // 데이터명(value, oldValue) {
    //  (조건) -> (동작)
    // };
    // 데이터명에 대한 메서드가 있고 value에는 그 데이터의 현재 값이 담겨 있다.
    // oldValue에는 데이터가 변경되기 전의 값이 담겨있다.
    // 해당 데이터가 변경되면 위 함수가 실행되고 조건이 충족되면 동작을 실행해 데이터를 다시 바꾸는 형식을 주로사용한다.
    // 하지만 데이터 변경을 너무 남발하면 어디선가 데이터끼리 꼬이기 쉬우므로 watch는 최대한 피하는 방식으로 코드를짜는게 좋다.
    watch: {
      // value는 this.winBalls를 의미한다.
      // 예시코드
      // winBalls(value, oldValue) {
      //   if (value.length == 0) {
      //     this.showBalls();
      //   }
      // }
    },
    mounted() {
      this.showBalls();
    },
    beforeDestroy() {
      timeOut.forEach((t) => {
        t.clearTimeout();
      })
    },
  };
</script>

<style scoped>

</style>