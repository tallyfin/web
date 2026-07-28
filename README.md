# tallyfin/web

The Tallyfin web app: invoice list, invoice preview and settings.

Views render to HTML strings and are hydrated on the client. Tests run in Node:

```sh
npm test
```

All user-facing text lives in `src/i18n/`. Don't hard-code strings in views.
