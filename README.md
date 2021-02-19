# dynamic-form
antd 动态表单



## Toy单项类型

| 参数名 | 类型                           | 描述                                 | 是否必须 |
| :------: | :------: | :------: | :------: |
| type   | 表单 | 容器 | 其他（后续添加） | 区分类型的目的是为了注入不同的参数                           | 是       |
| x-component   | `string`                       | 组件类型，例如：Input，TextArea，Text，Icon 等                 | 是       |
| mode   | `string`                       | 当前数据类型（例如：笔记，画线等） | 否       |


### 表单

```javascript

import * as Toy from 'toy'

```