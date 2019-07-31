# react-virtualized-tree
A virtualized tree view react component based on [react-window](https://github.com/bvaughn/react-window)


![screen](https://user-images.githubusercontent.com/1687695/62229355-29f0f880-b3c8-11e9-8488-2203be76e83e.gif)

## API
|name|type|default|description|
|-----|---|--------|----|
|items|array of objects||Each object must contain next properties: **id** (number), **text** (string), **rootId** (number or null)|
|width|number|300|component width|
|height|number|400|component height|
|rowHeight|number|25|single row height|
|onRowClick|function||row click handler|
