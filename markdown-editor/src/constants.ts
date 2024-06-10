export const DEFAULT_DOC_BODY =
  "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, lists, and tables\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```\n\n#### Tables\n\n##### Built with\n\n| Library             | Link                                                                             |\n| ------------------- | -------------------------------------------------------------------------------- |\n| Svelte              | [svelte.dev](https://svelte.dev/)                                                |\n| TailwindCSS         | [tailwindcss.com](https://tailwindcss.com/)                                      |\n| Ace editor          | [ace.c9.io](https://ace.c9.io/)                                                  |\n| brace               | [npmjs.com/package/brace/](https://www.npmjs.com/package/brace)                  |\n| localForage         | [localforage.github.io/localForage/](https://localforage.github.io/localForage/) |\n| Svelte French Toast | [svelte-french-toast.com](https://svelte-french-toast.com/)                      |";

export const DEFAULT_DOC_TITLE = "untitled.md";

export const CURRENT_DOC_KEY = "currentDocument";

export const THEME_CHANGE_EVENT_STR = "themeChange";
export const DOC_RENAME_EVENT_STR = "docRename";
export const SAVE_CHANGES_EVENT_STR = "saveChanges";
export const LOAD_SIDEBAR_EVENT_STR = "loadSidebar";
export const SWITCH_DOC_EVENT_STR = "switchDoc";

export const DARK_STR = "dark";
export const LIGHT_STR = "light";
export const THEME_STR = "theme";
