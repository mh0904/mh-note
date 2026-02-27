# 目录

- [TypeScript 的类有哪些成员可见性？](##1)

## TypeScript 的类有哪些成员可见性？

1. 类的成员可见性指的是类中的属性，方法，访问器等等成员在类的内部和外部的可访问性。
2. 常见的类的成员的可见性分为三种：分别是 public、private、protected。
   public：默认的配置，即类的成员在类的内部和外部都可以被访问。
   private：只能在类的内部访问，不可以在类的外部或者继承的子类中访问。
   protected：只能在类的内部和继承的子类中访问，但是不可以在类的外部访问。
3. 代码展示：

```ts
class Animal {
  public name: string
  private age: number
  protected species: string

  constructor(name: string, age: number, species: string) {
    this.name = name
    this.age = age
    this.species = species
  }

  public getAge(): number {
    return this.age // 可以在类内部访问 private 成员
  }
}

class Dog extends Animal {
  constructor(name: string, age: number, species: string) {
    super(name, age, species)
  }

  public getSpecies(): string {
    return this.species // 可以在子类中访问 protected 成员
  }
}

const dog = new Dog('Buddy', 3, 'Canine')
console.log(dog.name) // 输出 "Buddy"
// console.log(dog.age); // 错误: 不能在类外部访问 private 成员
// console.log(dog.species); // 错误: 不能在类外部访问 protected 成员
```
