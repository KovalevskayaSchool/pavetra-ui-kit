// import ReactDOM from 'react-dom';

// import { ConfirmDialog, ConfirmProps } from './Dialog';

// export const confirm = (props: ConfirmProps): { close: () => void } => {
//   const div = document.createElement('div');
//   document.body.appendChild(div);

//   function destroy(...args: any[]) {
//     const unmountResult = ReactDOM.unmountComponentAtNode(div);
//     if (unmountResult && div.parentNode) {
//       div.parentNode.removeChild(div);
//     }
//   }

//   function close() {
//     destroy();
//   }
//   function render({ ...props }: any) {
//     ReactDOM.render(<ConfirmDialog {...props} close={close} />, div);
//   }
//   render(props);
//   return {
//     close,
//   };
// };
