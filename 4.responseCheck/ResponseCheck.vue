<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <div>
      <div>평균 시간: {{ average }} ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
  let startTime = 0;
  let endTime = 0;
  let timeOut = null;

  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message: '클릭해서 시작하세요.'
      }
    },
    // 표현식을 html태그 쪽에 쓰는 건 좋지 않다. computed에 넣어 쓰는 것이 좋다.
    // 그 외에도 computed는 캐싱이되기 때문에 성능 측면에서도 좋다.
    // html태그 쪽의 {{}}의 데이터가 변경되면 전체가 다시 렌딩된다.
    // 그러면 계산식 쪽도 다시 렌딩된다는 소리인데, 페이지가 열릴 때 계산식은 캐싱해두고
    // 계산식에 사용되었던 데이터가 변경되는 것이 아니면 계산식은 캐싱된 것을 사용하기 때문에
    // {{}}가 변경되어도 계산식을 다시 렌딩할 필요가 없다.
    // 즉, 데이터 가공시에는 computed를 사용하는 것이 바람직하다.
    computed: {
      average() {
        return (this.result.reduce((a, c) => a + c, 0) / this.result.length || 0)
      }
    },
    methods: {
      onReset() {
        this.result = [];
      },
      onClickScreen() {
        if (this.state === 'waiting') {
          this.state = 'ready';
          this.message = '초록색이 되면 클릭하세요!';
          timeOut = setTimeout(() => {
            this.state = 'now';
            this.message = '클릭!!!!';
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000);
        } else if (this.state === 'ready') {
          clearTimeout(timeOut)
          this.state = 'waiting';
          this.message = '너무 빨라요';
        } else if (this.state ==='now') {
          endTime = new Date();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요!'
          this.result.push(endTime - startTime);
        }
      }
    },
  };
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background: aqua;
}
#screen.ready {
  background: red;
  color: wheat;
}
#screen.now {
  background: yellow;
}
</style>