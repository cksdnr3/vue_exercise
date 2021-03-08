<template>
  <div>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value"/>
      <button type="submit">입력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
function getNumbers() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}
  export default {
    data() {
      return {
        correct: getNumbers(),
        value: '',
        result: '',
        tries: [],
      }
    },
    methods: {
      onSubmitForm() {
        if (this.value === this.correct.join('')) {
          this.tries.push({
            try: this.value,
            result: 'HomeRun!',
          });
          alert("승리! 게임을 다시시작합니다.")
          this.correct = getNumbers();
          this.tries = [];
        } else {
          if (this.tries.length < 9) {
            let strike = 0;
            let ball = 0;
            let valueArray = this.value.split('').map(v => parseInt(v));

            for (let i = 0; i < 4; i++) {
              if (valueArray[i] === this.correct[i]) {
                strike++
              } else if(this.correct.includes(valueArray[i])) {
                ball++
              }
            }
            this.tries.push({
              try: this.value,
              result: `스트라이크: ${strike}, 볼: ${ball}`
            });

          } else {
            alert(`패배! 정답: ${JSON.stringify(this.correct)}`)
            alert('게임을 다시시작합니다.')
            this.correct = getNumbers();
            this.tries = []
          }
        }
        this.value = '';
        this.$refs.answer.focus();
      }
    },
  };
</script>

<style>

</style>