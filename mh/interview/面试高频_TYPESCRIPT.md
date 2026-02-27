## 目录

- [ts 中 interface 和 type 的区别是什么？](##1)

## ts 中 interface 和 type 的区别是什么？

- 公司：

  1. 2024/5/09/15:00 固德威（苏州外派，线上，薪资：15k-18k）
  2. 2025/3/13/16:00 爱奇迹（外派，线上）薪资 10-14k

- 第一次回答：

  1. interface 用于定义接口的形状，常用于定义对象，type 用于定义数据类型。

- 总结：

  1. interface 支持定义多种同名的接口，同时会将同名的接口进行合并，type 定义同名的类型会报错。
     ```ts
     interface Point {
       x: number
     }
     interface Point {
       y: number
     } // 合并为 { x: number; y: number; }
     ```
  2. interface 用于描述接口的形状，更加直观和简洁。type 更加通用，适合联合类型元祖，映射等高级操作。
     ```ts
     type UnionType = string | number // 联合类型
     type MappedType = { [K in keyof T]: boolean } // 映射类型（需 type）
     ```
