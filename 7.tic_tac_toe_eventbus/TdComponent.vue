<template>
  <td @click="onClickTd">{{ colData }}</td>
</template>
<script>
import EventBus from "./EventBus";

export default {
  props: {
    colData: String,
    rowIndex: Number,
    colIndex: Number,
  },
  methods: {
    onClickTd() {
      if (this.colData) return;

      // emit은 on과 대응된다.
      // 즉, EventBus의 on으로 등록한 커스텀 메서드를 호출해서 사용한다는 뜻
      // 여기선 root컴포넌트인 TicTacToeEventBus.vue에서 등록된 메서드를 사용할 수 있음
      EventBus.$emit('clickTd', this.rowIndex, this.colIndex);
    }
  }
}
</script>