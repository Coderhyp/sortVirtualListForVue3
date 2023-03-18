import Sortable, { SortableEvent } from "sortablejs";

type SortableData = any[];

class SortableWrapper {
  private sortable: Sortable;
  newList: any[];
  dataSource: any[];
  realDomStart: number;
  //   onDrag: Function;
  //   onDrop: Function;
  constructor(
    element: HTMLElement,
    data: SortableData,
    realDomStart: number
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
    this.newList = [...data];
    this.dataSource = data;
    this.realDomStart = realDomStart;

    // this.onDrag = onDrag;
    // this.onDrop = onDrop;
  }
  updateRealDomStart = (idx: number) => {
    this.realDomStart = idx;
  };
  private handleSortStart = (event: SortableEvent): void => {
    // 从原数组 移走拖拽的这个元素
    const start = this.realDomStart + event.oldIndex;
    console.log(start, "startttttttttttttt");

    const deleteCount = 1;
    this.newList.splice(start, deleteCount);
  };
  private handleSortChange = (event: SortableEvent): void => {};
  private handleSortEnd = (event: SortableEvent): void => {
    const draggingRealIndex = event.oldIndex + this.realDomStart;
    const start = this.realDomStart + event.newIndex;
    console.log(start, "endddddddddddd");
    const deleteCount = 0;
    const item = this.newList.splice(draggingRealIndex, 1)[0];
    this.dataSource.splice(start, deleteCount, item);
  };
}

export default SortableWrapper;
