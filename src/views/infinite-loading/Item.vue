<script setup lang="ts">
import { onMounted, getCurrentInstance } from "vue";
const props = defineProps({
  source: {
    type: Object,
    default: () => ({}),
  },
  changeItem: {
    type: Function,
  },
});
const upToTop = (index: number) => {
  // console.log(props.changeItem(index));
};
</script>

<template>
  <div class="item-inner" :data-id="source.id">
    <div class="head">
      <span class="index"># {{ source.index }}</span>
      <span class="name">{{ source.name }}</span>
      <span class="upTop" @click="upToTop(source.index)">置顶</span>
    </div>
    <div class="desc">{{ source.desc }}</div>
  </div>
</template>

<style lang="less" scoped>
.item-inner {
  .head {
    font-weight: 500;
  }
  .index {
    margin-right: 1em;
  }
  .name {
    margin-left: 1em;
  }
  .desc {
    padding-top: 0.5em;
    text-align: justify;
  }
  .upTop {
    float: right;
  }
}
</style>
