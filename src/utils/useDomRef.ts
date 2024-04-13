import {
  ForwardedRef,
  Ref,
  RefObject,
  useImperativeHandle,
  useRef,
} from "react";

export type DOMRef<T extends HTMLElement = HTMLElement> = Ref<DOMRefValue<T>>;

export interface DOMRefValue<T extends HTMLElement = HTMLElement> {
  UNSAFE_getDOMNode(): T | null;
}

export function createDOMRef<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
): T {
  return ref.current as T;
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref: ForwardedRef<T>,
): RefObject<T> {
  const domRef = useRef<T | null>(null);
  useImperativeHandle(ref, () => createDOMRef(domRef));
  return domRef;
}
