<template>
  <div>
    <div id="computer" :style="backgroundImg"></div>
    <div>
      <button @click="onClickButton('ROCK')">바위</button>
      <button @click="onClickButton('SCISSORS')">가위</button>
      <button @click="onClickButton('PAPER')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }} 점</div>
  </div>
</template>

<script>
  const rspCords = {
    ROCK: '-20px',
    SCISSORS: '-136px',
    PAPER: '-285px',
  }

  const scores = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
  }

  const computerChoice = (imgCords) => {
    return Object.entries(rspCords).find(function (v) {
      return v[1] === imgCords;
    })[0];
  }

  let interval = null;

  export default {
    data() {
      return {
        imgCord: rspCords.ROCK,
        result: '',
        score: 0,
      }
    },
    computed: {
      backgroundImg() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCord} 0px`
        }
      }
    },
    methods: {
      changeHand() {
        interval = setInterval(() => {
          if (this.imgCord === rspCords.ROCK) {
            this.imgCord = rspCords.SCISSORS;
          } else if (this.imgCord === rspCords.SCISSORS) {
            this.imgCord = rspCords.PAPER;
          } else if (this.imgCord === rspCords.PAPER) {
            this.imgCord = rspCords.ROCK;
          }
        }, 100)
      },
      onClickButton(choice) {
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imgCord)];
        const diff = myScore - cpuScore;

        console.log("choice: " + choice)
        console.log("myScore: " + myScore)

        console.log("cpuScore: " + cpuScore)


        if (diff === 0) {
          this.result = 'draw!';
        } else if ([-1, 2].includes(diff)) {
          this.result = 'win!';
          this.score++;
        } else if ([1, -2].includes(diff)) {
          this.result = "lose!";
          this.score--;
        }
        console.log(this.score)
        console.log(diff)
        setTimeout(() => {
          this.changeHand();
        }, 1000)
      }
    },
    // component가 생성될 때 ceated가 작동
    // data, computed, methods 등등에서 정보를 가지고 화면에 채워지는 것 까지가 created이다.(화면에는 안보임)
    created() {

    },
    // component가 화면에 렌더링 될 때 mounted 가 작동
    // 화면을 조작할 땐 화면이 전부 렌더링 된 후에 하는 것이 좋으므로 mounted에서 화면조작을 한다.(화면에 보이는 것이 mounted)
    mounted() {
      this.changeHand();
    },
    // component가 변경되면 updated가 작동
    updated() {
    },
    // component가 사라져도 mounted의 interval은 계속 실행된다.
    // 여기서 컴포넌트를 destroy하기 전에 이러한 작업들을 멈춰주는게 좋다.
    beforeDestroy() {
      clearInterval(interval);
    },
    // component가 화면에서 사라지면 destroyed 가 작동
    destroyed() {
    },
  };
</script>

<style scoped>
#computer {
  width: 148px;
  height: 200px;
}
</style>