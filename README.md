# fb-similar-discussions

[![Build Status](https://travis-ci.org/vencax/fb-similar-discussions.svg)](https://travis-ci.org/vencax/fb-similar-discussions)

Implements facebook like comments that are grouped into discussions.
Particular comments can be up/down voted (similar to [stackoverflow](http://stackoverflow.com/)).
Each comment can be replied. Order of replies within comments are according date.

Uses [MobX](https://mobxjs.github.io/mobx/) for state management.
And aims to extendability and code readability and simplicity.

See yourself an example of [small forum](examples/forum/).

## tech details

It is raw ES6 lib, so you need bundler with transpiling (webpack with babel loader).
Try it by yourself:

```sh
git clone https://github.com/vencax/fb-similar-discussions fbsd
cd fbsd
npm i
make run
```

The application is now available at [http://localhost:8080](http://localhost:8080).
