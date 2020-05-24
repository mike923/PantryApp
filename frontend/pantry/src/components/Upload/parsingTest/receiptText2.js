const text = `OTARGET
EXPECT MORE PAY LESS:
OUEENS PLACE-718-760-5656
8801 0UEENS BLVD
ELMHURST, NY 11373
03/09/2020 11:00 AM EXPIRES 06/07/20
CLEANING SUPPLIES
TIDE 2X
003080794
T $20.99
GROCERY
GOOD HEALTH FN
MP POPCORN
QUAKER CAKES FN
071060200
071080031
071080196
$2.69L
$2.49
$5.98
FN
2@ $2.99 ea
$2.99
$1.79
$0.95
$1.69
$0.59
$0.95
$1.79
$0.99
$0.95
$0.95
$1.19
$3.99
$3.99
$2.79
$2.58
FN
FN
FN
FN
FN
FN
QUAKER
MP COOKIES
MP CRACKERS
MP KETCHUP
MP CAN VEG
GOYA
MP TORTILLA FN
GOYA PMO1
MP PASTA
MP PASTA
MP PASTA
SPECIAL K
CHEERIOS
071082154
071090323
071100702
212040261
212120211
212260913
212262010
212262509
212380282
212380585
212380591
231000100
231000692
231030043
270000084
FN
FN
FN
FN
FN
FN
AUNT JEMIMA FN
MP VEG BLEND FN
2@ $1.29 ea
5 @ $0.95 ea
$4.75
FN
MP MIX VEG
270000494
$2.49
$4.49
MARKETPANTRY
24.80Z PZROL
GG EGGS
FN
FN
FN
270000548
270060507
284031158
$1.99`;

// console.log(text);

const removeFN = (fullText) => fullText.replace(/FN/gi, '\n');

const removeNewLine = (fullText) => fullText.replace(/(\r\n|\n|\r)/gm, ' ');

const getDate = (fullText) => {
  return fullText.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
};

const getAddress = (fullText) => {
  return fullText.match(
    /^(?n:(?<address1>(\d{1,5}( 1\/[234])?(\x20[A-Z]([a-z])+)+ )|(P\.O\. Box \d{1,5}))\s{1,2}(?i:(?<address2>(((APT|B LDG|DEPT|FL|HNGR|LOT|PIER|RM|S(LIP|PC|T(E|OP))|TRLR|UNIT)\x20\w{1,5})|(BSMT|FRNT|LBBY|LOWR|OFC|PH|REAR|SIDE|UPPR)\.?)\s{1,2})?)(?<city>[A-Z]([a-z])+(\.?)(\x20[A-Z]([a-z])+){0,2}), \x20(?<state>A[LKSZRAP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADL N]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD] |T[NX]|UT|V[AIT]|W[AIVY])\x20(?<zipcode>(?!0{5})\d{5}(-\d {4})?))$/,
  );
};

const getProducts = (fullText) => {
  const obj = {
    heading: [],
    cleaning: [],
    grocery: [],
  };

  const heading = fullText
    .split(/(cleaning supplies)|(grocery)/gi)[0]
    .trim()
    .split('\n');

  const cleaningSup = fullText

    .match(/cleaning supplies([\s\S]*)(?=grocery)/gi)[0]
    .trim()
    .split('\n');

  const grocerySup = fullText

    .match(/grocery([\s\S]*)/gi)[0]
    .trim()
    .split('\n');

  console.log(`Heading => `, heading);
  console.log(`Cleaning Sup => `, cleaningSup);
  console.log(`Grocery Sup => `, grocerySup);
  obj.heading = heading;
  obj.cleaning = cleaningSup;
  obj.grocery = grocerySup;
  return obj;
};

const getPrices = (fullText) => {
  return fullText.match(/[$]\d+(\.)(\d{1,2})?/g);
};

const isProductNum = (fullText) => {
  return !isNaN(fullText) && fullText.length === 9;
};

const cleanAddress = (arr) => {
  return arr.map((ele) => (getDate(ele) ? null : ele)).join(' ');
};

const getItems = (products, prices) => {
  // console.log(getPrices('$2.99'));
  // console.log(getPrices('2.99'));

  const productsArr = [];
  const pricesArr = [];

  let priceCount = 0;
  let productNumCount = 0;

  for (let i = 1; i < products.length; i++) {
    let str = products[i];
    if (getPrices(str)) {
      str = str.replace('L', '');
      if (str.includes('@')) {
        const quantity = str.match(/^(.*?)(?=@)/g)[0].trim() * 1;
        const price = str.match(/\$*?(\d+.\d\d)/g)[0].trim();
        console.log(`Multiple Items: `, quantity, price);
        pricesArr.push([quantity, price]);
      } else {
        priceCount += 1;
        pricesArr.push([1, str.trim()]);
      }
    } else if (isProductNum(str)) {
      // console.log(`Product #: `, str);
      productNumCount += 1;
    } else if (str.length) {
      productsArr.push(str);
    }
  }

  console.log(`Prices before clean up: `, pricesArr.length, pricesArr);
  for (let i = 0; i < pricesArr.length - 1; i++) {
    if (pricesArr[i][0] > 1 && pricesArr[i - 1][0] > 1) {
      if (
        pricesArr[i][0] * Number(pricesArr[i][1].slice(1)) ===
        Number(pricesArr[i + 1][1].slice(1))
      ) {
        pricesArr.splice(i + 1, 1);
      }
    } else if (pricesArr[i + 1][0] > 1) {
      pricesArr.splice(i, 1);
    }
  }
  console.log(`Prices after clean up: `, pricesArr.length, pricesArr);
  console.log(`Price count: `, priceCount);
  console.log(`Product # count: `, productNumCount);
  console.log(`Products count: `, productsArr.length);

  const obj = { products: productsArr, prices: pricesArr };
  return obj;
};

const getTotal = (arr) => {
  return arr.reduce((acc, num) => acc + num[0] * Number(num[1].slice(1)), 0);
};

const makeReceiptItems = (prod, pric) => {
  const obj = {};
  prod
    .map((e) => e.trim())
    .forEach((ele, i) => {
      if (pric[i]) {
        obj[ele] = {
          name: ele,
          price: pric[i][1].slice(1),
          quantity: pric[i][0],
        };
      }
    });
  return obj;
};

const algoRythm1 = (fullText) => {
  let trimmedText = removeFN(fullText);
  // fullText = removeNewLine(fullText);
  // console.log(`TEXT`, fullText);
  const obj = {
    address: null,
    storeName: null,
    phone: null,
    products: {},
    prices: [],
    receiptDate: null,
    receiptTotal: 0,
  };

  obj.receiptDate = getDate(trimmedText)[0];
  obj.prices = getPrices(trimmedText);
  obj.products = getProducts(trimmedText);
  obj.address = cleanAddress(obj.products.heading);
  obj.storeName = 'Target';
  console.log(`Get Items: `, getItems(obj.products.grocery, obj.prices));
  const { products, prices } = getItems(obj.products.grocery, obj.prices);
  obj.products = products;
  obj.prices = prices;
  obj.receiptTotal = getTotal(obj.prices);
  obj.receiptItems = makeReceiptItems(obj.products, obj.prices);

  return obj;
};

// algoRythm1(text);

// console.log(algoRythm1(text));

export default algoRythm1;
