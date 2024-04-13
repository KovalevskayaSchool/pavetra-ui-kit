import { ForwardedRef, Ref, RefObject } from "react";
export type DOMRef<T extends HTMLElement = HTMLElement> = Ref<DOMRefValue<T>>;
export interface DOMRefValue<T extends HTMLElement = HTMLElement> {
  UNSAFE_getDOMNode(): T | null;
}
export declare function createDOMRef<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
): T;
export declare function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref: ForwardedRef<T>,
): RefObject<T>;
