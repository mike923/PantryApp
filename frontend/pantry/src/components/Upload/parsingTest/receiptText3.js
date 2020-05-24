// const text = `OTARGET
// College Point - 718-661-4346
// 13505 20th Ave
// College Point, NY 11356-2446
// 04/24/2020 05:55 PM
// APPAREL
// 295000013 BASIC TOTE
// $1.98
// 2 @ $0.99 ea
// 020062984 PAJAMA SETS
// N $21.99
// GROCERY
// 071090887 CHIP A COOKI
// NF
// NE
// NF
// NF
// $2.99
// $2.79
// $3.89
// $11.96
// 071090470 KEEBLER FS
// 212080017 HELLMANNS
// 261000210 ENTENMANNS
// So 4 $2.99 ea
// 231140604 POP-TARTS
// 270050037 EGGO
// NF
// NF
// $3.59
// $8.97
// 3 @ $2.99 ea
// 071091416 OREO COOKIES
// NF
// $3.69
// Regul ar Price $4.19
// 288070935 HAAGEN DAZS
// 288075304 OATLY
// 288079794 0ATLY
// 071180330 WELCHS
// 284050214 COFFEE MATE
// 071180012 MOTTS CUP
// 212400169 BERTOLLI
// 071050737 RUFFLES
// NF
// NF
// NF
// NF
// NF
// NF
// NF
// NF
// $6.49
// $4.99
// $4.99
// $2.59
// $3.59
// $2. .39
// $2.49
// $3.00
// Regul ar Price $3.99
// 284060104 OATLY!
// 284060272 OATLY!
// NF
// NF
// $4.99
// $4.99
// HEALTH AND BEAUTY
// 245040388 ALWAYS 46 EA
// 063023615 DOVE BEAUTY
// $11.99
// $6.69
// N
// $0.50-
// D40204 Digital MfrCpn
// 245040204 ALWAYS
// 063002794 SHAMPO COND
// 063002795 SHAMPO COND
// 049011012 DOVE BEAUTY
// HOME
// 062060885 MBDQBGMTR
// 062180559 Q SHEET SET
// 062181336 STAND PCASE
// 064080535 MBD SHWR LNR
// N
// $5.89
// $5.99
// $5.99
// $9. .89
// $60.00
// $23.99
// $4.99
// $6.00
// T
// T
// SUBTOTAL
// RedCard Savings
// T= NY TAX 8.87500 on $117.36
// TOTAL
// $243.28
// $12.18-
// $10.58
// $241,68
// $241.68
// 058511
// *3073 TARGET CARD
// AUTH CODE:
// Your Target Circle earnings are in!
// Open the Target App or visit
// Target.com/Circle to see your benefits.
// `;

// const removeFN = (text) => text.replace(/FN/gi, '\n');

// const removeNewLine = (text) => text.replace(/(\r\n|\n|\r)/gm, ' ');

// const getDate = (text) => {
//   return text.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
// };

// const getAddress = (text) => {
//   return text.match(
//     /^(?n:(?<address1>(\d{1,5}(\ 1\/[234])?(\x20[A-Z]([a-z])+)+ )|(P\.O\.\ Box\ \d{1,5}))\s{1,2}(?i:(?<address2>(((APT|B LDG|DEPT|FL|HNGR|LOT|PIER|RM|S(LIP|PC|T(E|OP))|TRLR|UNIT)\x20\w{1,5})|(BSMT|FRNT|LBBY|LOWR|OFC|PH|REAR|SIDE|UPPR)\.?)\s{1,2})?)(?<city>[A-Z]([a-z])+(\.?)(\x20[A-Z]([a-z])+){0,2})\, \x20(?<state>A[LKSZRAP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADL N]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD] |T[NX]|UT|V[AIT]|W[AIVY])\x20(?<zipcode>(?!0{5})\d{5}(-\d {4})?))$/,
//   );
// };

// const splitByCategoy = (text) =>
//   text.split(
//     /(?=grocery)|(?=cleaning supply)|(?=apparel)|(?=test)|(?=home)|(?=subtotal)|(?=health and beauty)/gi,
//   );

// const makeCategoryObj = (arr) => {
//   const obj = {};

//   for (let i = 0; i < arr.length; i++) {
//     const lines = arr[i].trim().split('\n');
//     if (i === 0) {
//       obj.heading = lines;
//     } else {
//       const category = lines[0];
//       const info = lines.splice(1);
//       // console.log(category);
//       obj[category] = info;
//     }
//   }
//   return obj;
// };

// const getProducts = (text) => {
//   const splittedText = splitByCategoy(text);
//   const splittedTextObj = makeCategoryObj(splittedText);
//   // console.log(splittedTextObj);
//   return splittedTextObj;
// };

// const getPrices = (text) => {
//   return text.match(/[$]\d+(\.)(\d{1,2})?/g);
// };

// const isProductNum = (text) => {
//   return !isNaN(text) && text.length === 9;
// };

// const cleanAddress = (arr) => {
//   return arr.map((ele) => (getDate(ele) ? null : ele)).join(' ');
// };

// const getItems = (products) => {
//   // console.log(getPrices('$2.99'));
//   // console.log(getPrices('2.99'));
//   console.log(products);

//   const obj = {};

//   const entries = Object.entries(products);

//   for (let i = 0; i < entries.length; i++) {
//     const category = entries[i][0];
//     const text = entries[i][1];

//     if (category === 'heading') {
//       console.log(`Heading: `, category);
//     } else if (
//       category.match(
//         /(?=grocery)|(?=cleaning supply)|(?=apparel)|(?=test)|(?=home)|(?=subtotal)|(?=health and beauty)/gi,
//       )
//     ) {
//       console.log(`Category match: `, category);
//     } else {
//       console.log(`Else: `, category);
//     }
//   }

//     if (category === 'heading') {
//       continue;
//     } else if (category === 'SUBTOTAL') {
//       continue;
//     } else {
//       console.log(category);
//     }
//   }

//   const productsArr = [];
//   const pricesArr = [];

//   let priceCount = 0;
//   let productNumCount = 0;

//   for (let i = 1; i < products.length; i++) {
//     let str = products[i];
//     if (getPrices(str)) {
//       str = str.replace('L', '');
//       if (str.includes('@')) {
//         const quantity = str.match(/^(.*?)(?=@)/g)[0].trim() * 1;
//         const price = str.match(/\$*?(\d+.\d\d)/g)[0].trim();
//         // console.log(`Multiple Items: `, quantity, price);
//         pricesArr.push([quantity, price]);
//       } else {
//         priceCount += 1;
//         pricesArr.push([1, str.trim()]);
//       }
//     } else if (isProductNum(str)) {
//       // console.log(`Product #: `, str);
//       productNumCount += 1;
//     } else if (str.length) {
//       productsArr.push(str);
//     }
//   }

//   // console.log(`Prices before clean up: `, pricesArr.length, pricesArr);
//   for (let i = 0; i < pricesArr.length - 1; i++) {
//     if (pricesArr[i][0] > 1 && pricesArr[i - 1][0] > 1) {
//       if (
//         pricesArr[i][0] * Number(pricesArr[i][1].slice(1)) ===
//         Number(pricesArr[i + 1][1].slice(1))
//       ) {
//         pricesArr.splice(i + 1, 1);
//       }
//     } else if (pricesArr[i + 1][0] > 1) {
//       pricesArr.splice(i, 1);
//     }
//   }
//   // console.log(`Prices after clean up: `, pricesArr.length, pricesArr);
//   // console.log(`Price count: `, priceCount);
//   // console.log(`Product # count: `, productNumCount);
//   // console.log(`Products count: `, productsArr.length);

//   // const obj = { products: productsArr, prices: pricesArr };
//   return obj;
// };

// const getTotal = (arr) => {
//   return arr.reduce((acc, num) => acc + num[0] * Number(num[1].slice(1)), 0);
// };

// const makeReceiptItems = (prod, pric) => {
//   const obj = {};
//   prod.map((ele, i) => {
//     ele = ele.trim();
//     if (pric[i]) {
//       obj[ele] = {
//         name: ele,
//         price: pric[i][1].slice(1),
//         quantity: pric[i][0],
//       };
//     }
//   });
//   return obj;
// };

// const algoRythm3 = (text) => {
//   text = removeFN(text);
//   // text = removeNewLine(text);
//   // console.log(`TEXT`, text);`
//   const obj = {
//     address: null,
//     storeName: null,
//     phone: null,
//     products: {},
//     prices: [],
//     receiptDate: null,
//     receiptTotal: 0,
//   };

//   obj.receiptDate = getDate(text)[0];
//   obj.prices = getPrices(text);
//   obj.products = getProducts(text); // Working
//   obj.storeName = obj.products.heading[0]; // Working
//   obj.address = cleanAddress(obj.products.heading.slice(1)); // Working
//   // console.log(`Address => `, obj.address);
//   obj.storeName = 'Target';
//   console.log(`Get Items: `, getItems(obj.products));
//   // const { products, prices } = getItems(obj.products.grocery, obj.prices);
//   // obj.products = products;
//   // obj.prices = prices;
//   // obj.receiptTotal = getTotal(obj.prices);
//   // obj.receiptItems = makeReceiptItems(obj.products, obj.prices);

//   return obj;
// };

// algoRythm3(text);
