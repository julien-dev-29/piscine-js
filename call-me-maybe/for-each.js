const forEach = (arr, callbackFn) => {
  for (let i = 0; i < arr.length; i++) {
    callbackFn(arr[i], i, arr);
  }
};

forEach([1, 2, 3], console.log);
