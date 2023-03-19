<template>
  <div class="example">
    <GithubCorner />
    <Introduction
      description="Use <code>@tobottom</code> to listen scroll reach bottom, add a footer slot as loading, then append next parts data into <code>data-sources</code> array."
    />

    <div class="example-content">
      <Tab @tab-change="onTabChange" />

      <div class="result">Items count: {{ items.length }}.</div>

      <div v-show="isShowView">
        <VirtualList
          ref="virtualListRef"
          id="list"
          class="list-infinite scroll-touch"
          :data-key="'id'"
          :data-sources="items"
          :data-component="Item"
          :estimate-size="70"
          :item-class="'list-item-infinite'"
          :footer-class="'loader-wrapper'"
          @totop="onScrollToTop"
          @tobottom="onScrollToBottom"
          @scroll="onVirtualScroll"
        >
          <template #footer>
            <div class="loader"></div>
          </template>
        </VirtualList>
      </div>

      <CodeBlock v-show="!isShowView" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, nextTick, watch, onUnmounted } from "vue";
import { Random } from "mockjs";
// @ts-ignore
import VirtualList from "vue3-virtual-scroll-list";

import GithubCorner from "../../components/Corner.vue";
import Introduction from "../../components/Introduction.vue";
import Tab from "../../components/Tab.vue";
import CodeBlock from "./Code.vue";
import Item from "./Item.vue";
import { TAB_TYPE, DEFAULT_TAB } from "../../common/const";
import getSentences from "../../common/sentences";
import genUniqueId from "../../common/gen-unique-id";

import SortableWrapper from "./dragPolicy";

const getPageData = (count: number, currentLength: number) => {
  const DataItems = [];
  for (let i = 0; i < count; i++) {
    const index = currentLength + i;
    DataItems.push({
      index,
      name: Random.name(),
      id: genUniqueId(index),
      desc: getSentences(),
    });
  }
  return DataItems;
};
// const changeItem = (index: number) => {
//   items.value.unshift(...items.value.splice(index, 1));
// };
const pageSize = 10;
const items = ref(getPageData(pageSize, 0));
console.log(items.value, "看看items啥样");
onMounted(() => {
  initSortable();
});
const isShowView = ref(DEFAULT_TAB === TAB_TYPE.VIEW);
const onTabChange = (type: TAB_TYPE) => {
  isShowView.value = type === TAB_TYPE.VIEW;
};

const isLoading = ref(false);
/**
 *  range start字段代表着是在如果加载全部DOM第一个DOM所在的索引
 *  想要实现拖拽的同时获得该item真实的DOM索引 需要start + event.oldIndex
 **/
const realDomStart = ref(0);
const onVirtualScroll = (e, range) => {
  if (range) {
    const { start } = range;

    if (realDomStart.value === start) return;
    realDomStart.value = start;
  }
};
let Sortable: any;
const initSortable = () => {
  const el = document.querySelector("#list>div");
  Sortable = new SortableWrapper(
    el,
    items.value,
    realDomStart.value,
    (dragEndData) => {
      // console.log(dragEndData);
      items.value = [...dragEndData];
    }
  );
};
watch(
  () => realDomStart.value,
  (val) => {
    console.log(realDomStart.value, ".value.value.value");
    Sortable.updateRealDomStart(val);
  }
);
watch(
  () => items.value,
  (val) => {
    console.log(val, "VALLLLLLLLLLLLLLL");
  },
  {
    immediate: true,
  }
);

// ...

watch(
  () => Sortable,
  (newVal) => {
    console.log("bianlema");
    items.value = newVal;
  }
);

const onScrollToTop = () => {
  console.log("at top");
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    items.value = getPageData(pageSize, items.value.length).concat(items.value);
  }, 500);
};

const onScrollToBottom = () => {
  console.log("at bottom");

  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    items.value = items.value.concat(
      reactive(getPageData(pageSize, items.value.length))
    );
    console.log(items.value, "itemsvalue");
    Sortable.updateDataSource(items.value);
  }, 500);
};
</script>

<style lang="less">
.result {
  margin-bottom: 1em;
}
.list-infinite {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
  position: relative;

  .list-item-infinite {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
  }

  .loader-wrapper {
    padding: 1em;
  }
  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(
      to right,
      #9b4dca 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
