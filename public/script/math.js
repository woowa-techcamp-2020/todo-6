export function sum() {
  const { a, ...rest } = { a: 1, b: 2, c: 3 };
  const ret = rest
  console.log(ret)
  return  ret;
}

