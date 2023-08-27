import { useEffect } from "react";

export function useScrollSelectFocus({
  isOpen,
  popoverRef,
  triggerRef,
  listBoxRef,
}) {
  useEffect(() => {
    if (
      isOpen &&
      popoverRef.current &&
      triggerRef.current &&
      listBoxRef.current
    ) {
      let listBox = listBoxRef.current;
      let popoverNode = popoverRef.current;
      let selectedItem = listBox.querySelector(
        "[aria-selected=true]"
      ) as HTMLElement;
      let popoverRect = popoverNode.getBoundingClientRect();
      if (selectedItem) {
        const selectedItemRect = selectedItem.getBoundingClientRect();
        if (selectedItemRect.bottom > popoverRect.bottom) {
          listBox.scrollTop = Math.abs(
            selectedItem.offsetTop -
              popoverRect.height +
              selectedItemRect.height
          );
        }
      }
    }
  }, [isOpen]);
}
