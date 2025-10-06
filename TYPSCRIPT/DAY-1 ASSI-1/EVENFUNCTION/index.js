function checkArr(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            sum = sum + arr[i];
        }
    }
    console.log(sum);
}
checkArr([23, 1, 3, 3, 5, 6]);
