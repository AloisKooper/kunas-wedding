/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'react' {
  export * from 'react';
  export {
    useRef,
    useState,
    useEffect,
    useCallback,
    ReactNode,
    type FC,
    type SVGProps
  } from 'react';
  export * from 'react/jsx-runtime';
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add any custom attributes you need here
  }
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}
