import localforage from "localforage";
import "./app.css";
import App from "./App.svelte";

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
  name: "MarkdownEditorDB",
});

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
