export const comma = (str: string): string => {
  let arr = str.split("");
  let result = "";
  for (let i = arr.length - 1; i > 0; i--) {
    if (i % 3 == 0 && i != 0) {
      result.concat(`,${arr[i]}`);
    } else {
      result.concat(arr[i]);
    }
  }
  return result;
};
