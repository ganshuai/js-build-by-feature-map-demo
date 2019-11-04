const test = () => console.log(2)
test()

class A {
  say() {
    console.log('A.say')
  }
}

const a = new A
a.say()

const x = 1
const y = 2

const obj = { x, y }
const obj1 = {...obj}

console.log('obj1', obj1)

const list1 = [1,2, ...[ 3, 4]]

function test2(...arg) {
  console.log(arg)
}

test2(1,2,3,4)