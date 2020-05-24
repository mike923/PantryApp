const text = `"SHOP NAME
Address: Lorem Ipsum, 23-10
Telp. 11223344
* * * * * * * * * * * * * * * * * * t * * * * *
CASH RECEIPT
* * * * * * * * * * * * * * * * * * * * * * * *
Price
1.1
2.2
3.3
4.4
5.5
Description
Lorem
Ipsum
Dolor sit amet
Consectetur
Adipiscing elit
* * * * ** * * * * * * * ** * * ** * * * * *
Total
16.5
20.0
3.5
Cash
Change
* * * * * * * * * * * * * * * * * ** * ** * *
Bank card
---234
#123456
Approval Code
THANK YOU!
designed by freepik"`;

console.log(text);

const algoRythm2 = (txt) => {
  const obj = {
    text: txt,
    storeName: null,
    address: null,
    phone: null,
    products: [],
  };

  return obj;
};

console.log(algoRythm2(text));
