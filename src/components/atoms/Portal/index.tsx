import { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

const portalId = 'portals';

function getOrCreateSelector(id: string) {
  const selector = document.querySelector(`#${id}`);
  if (!selector) {
    const bodyEl = document.querySelector(`body`);
    const el = document.createElement('div');
    el.setAttribute('id', id);
    bodyEl?.appendChild(el);
    return el;
  }

  return selector;
}

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  const portalSelectorId = getOrCreateSelector(portalId);
  if (!portalSelectorId) {
    return null;
  }
  return ReactDOM.createPortal(children, portalSelectorId);
};
