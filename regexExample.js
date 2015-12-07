var regex = /^\$\d+(\.*\d*)$/;
if (regex.test(arr[6])) priceField = arr[6];
else if(regex.test(arr[5])) priceField = arr[5];