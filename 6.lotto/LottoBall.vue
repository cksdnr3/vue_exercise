<template>
  <div class="ball" :style="styleBackground">{{ number }}</div>
</template>

<script>
  export default {
    name: 'LottoBall',
    // prop는 readonly특징을 가지고 있어 변경이 불가능하다.
    // 부모로 부터 받은 props를 자식의 data에 넣고 변경하는 방법도 있지만, 부모의 데이터는 바뀌지 않아
    // 데이터가 서로 맞지 않을 수 있어 권장하는 방법은아니다.
    // 그러므로 부모의 데이터는 부모쪽에서 변경하고 변경됐으면 자식에게 넘겨주는 방식으로 하는 것이 좋다.
    props: {
      number: Number
    },
    data() {
      return {
      }
    },
    computed: {
      // 데이터 변경이 있을 땐 computed가 좋다.
      // 둘다 데이터를 변경할 때 사용하는데 어떤점이 다를까?
      // computed 와 watch의 차이점:
      // computed는 데이터를 변경하고 어떤 값을 return 하고
      // watch는 데이터를 변경하는 특정한 동작을 수행한다.
      styleBackground() {
        console.log("styleBackground")
        let background;
        if (this.number <= 10) {
          background = 'red';
        } else if (this.number <= 20) {
          background = 'orange';
        } else if (this.number <= 30) {
          background = 'pink';
        } else if (this.number <= 40) {
          background = 'dodgerblue';
        } else {
          background = 'green';
        }
        return {
          backgroundColor: background
        }
      }
    }
  }
</script>

<style>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>