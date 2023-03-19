import Sortable, { SortableEvent } from "sortablejs";

type SortableData = any[];

class SortableWrapper {
  private sortable: Sortable;
  newList: any[];
  dataSource: any[];
  realDomStart: number;
  onDragDrop: Function;
  //   onDrop: Function;
  constructor(
    element: HTMLElement,
    data: SortableData,
    realDomStart: number,
    onDragDrop: Function
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
    this.onDragDrop = onDragDrop;
    // this.onDrop = onDrop;
  }
  updateRealDomStart = (idx: number) => {
    this.realDomStart = idx;
  };
  updateDataSource = (data) => {
    this.dataSource = data;
    console.log(this.dataSource);
  };

  private handleSortStart = (event: SortableEvent): void => {};
  private handleSortChange = (event: SortableEvent): void => {};
  private handleSortEnd = (event: SortableEvent): void => {
    const draggingRealIndex = event.oldIndex + this.realDomStart;
    const realNewIdx = this.realDomStart + event.newIndex;
    const item = this.dataSource.splice(draggingRealIndex, 1)[0];
    this.dataSource.splice(realNewIdx, 0, item);
    this.onDragDrop(this.dataSource);
  };
}

export default SortableWrapper;
