import Sortable, { SortableEvent } from "sortablejs";

type SortableData = any[];

interface DragStateType {
  key: any;
  index: number;
  item: any;
}

// 记录元素真实的位置
export class DragState {
  from: DragStateType;
  to: DragStateType;
  constructor() {
    this.from = { key: undefined, item: undefined, index: -1 };
    this.to = { key: undefined, item: undefined, index: -1 };
  }
}

class SortableWrapper {
  private sortable: Sortable;
  cloneList: any[];
  dragState: DragState;
  dataSource: any[];
  //   onDrag: Function;
  //   onDrop: Function;
  constructor(
    element: HTMLElement,
    data: SortableData
    // onDrag: Function,
    // onDrop: Function
  ) {
    this.sortable = new Sortable(element, {
      animation: 150,
      dataIdAttr: "data-id",
      onStart: this.handleSortStart,
      onChange: this.handleSortChange,
      onEnd: this.handleSortEnd,
    });
    this.cloneList = new Array();
    this.dragState = new DragState();
    this.dataSource = data;
    // this.onDrag = onDrag;
    // this.onDrop = onDrop;
  }

  private handleSortStart = (event: SortableEvent): void => {
    console.log(event, "start");
    this.cloneList = [...this.dataSource];
    const dataId = this.getItemDataId(event);
    this.dataSource.forEach((item, index) => {
      if (this.dataSource[index].id === dataId) {
        this.dragState.from = { item, index, key: dataId };
      }
    });
  };
  private handleSortChange = (event: SortableEvent): void => {
    const oldKey = this.dragState.from.key;
    const newKey = this.getItemDataId(event);
    console.log(oldKey, newKey);
    const from = { item: null, index: -1 };
    const to = { item: null, index: -1 };

    this.cloneList.forEach((el, index) => {
      const key = this.dataSource[index].id;
      if (key === oldKey) Object.assign(from, { item: el, index });
      if (key === newKey) Object.assign(to, { item: el, index });
    });
    // console.log(from, to);

    this.cloneList.splice(from.index, 1);
    this.cloneList.splice(to.index, 0, from.item);
  };
  private handleSortEnd = (event: SortableEvent): void => {
    console.log(event, "end");
    const oldKey = this.dragState.from.key;
    const newKey = this.getItemDataId(event);
    // this.cloneList.forEach((el, index) => {
    //   if (this.dataSource[index].id === from.key)
    //     this.dragState.to = {
    //       index,
    //       key: this.dataSource[index].id,
    //       item: this.dataSource[index],
    //     };
    // });
    console.log(oldKey, newKey, "endddd");
    const from = { item: null, index: -1 };
    const to = { item: null, index: -1 };

    this.cloneList.forEach((el, index) => {
      const key = this.dataSource[index].id;
      if (key === oldKey) Object.assign(from, { item: el, index });
      if (key === newKey) Object.assign(to, { item: el, index });
    });

    this.cloneList.splice(from.index, 1);
    this.cloneList.splice(to.index, 0, from.item);

    this.dataSource = [...this.cloneList];
    console.log(this.dataSource);
    this.clear();
  };
  private clear() {
    this.dragState = new DragState();
  }
  // 通过sortable的event获取到拖拽列表Item的Id 获取子元素原因是virtualScroll组件无法绑定data-id
  private getItemDataId = (event: SortableEvent) => {
    return event.item.children[0].getAttribute("data-id");
  };
}

export default SortableWrapper;
