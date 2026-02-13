function blockChain(
  data,
  prev = {
    index: 0,
    hash: "0",
  },
) {
  const index = prev.index + 1;
  const hash = hashCode(prev.index + 1 + prev.hash + JSON.stringify(data));
  return {
    index: index,
    hash: hash,
    data: data,
    prev: prev,
    chain: (data) =>
      blockChain(data, {
        index: index,
        hash: hash,
      }),
  };
}

const hashCode = (str) =>
  (
    [...str].reduce((h, c) => (h = (h << 5) - h + c.charCodeAt(0)) & h, 0) >>> 0
  ).toString(36);

const first = blockChain({ a: 1 });
console.log(first.index);
console.log(first.data);
console.log(first.prev);
console.log(first.hash);
console.log(hashCode('10{"a":1}'));

const second = first.chain({ hello: "world" });
console.log(second.hash); //                           -> '18drvvc'
console.log(hashCode('21103f27{"hello":"world"}')); // -> '18drvvc'

const chain = second
  .chain({ value: 4455 })
  .chain({ some: "data" })
  .chain({ cool: "stuff" });

const fork = second
  .chain({ value: 335 })
  .chain({ some: "data" })
  .chain({ cool: "stuff" });

console.log(chain.hash); //  -> '1qr3qfs'
console.log(fork.hash); //   -> '1x9gsc1'
console.log(chain.index); // -> 5
console.log(fork.index); //  -> 5
