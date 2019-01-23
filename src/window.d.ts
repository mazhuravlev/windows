declare interface Window {
  CefSharp: any;
  vasya: {
    save: (json: string) => void;
    load: () => string;
  };
}

declare var window: Window;
