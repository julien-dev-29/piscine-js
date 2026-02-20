# Training Exercices

## Points à travailler

- Récursivité
  ```js
  const sums = (number) => {
    const result = [];
    const backtrack = (remaining, start, path) => {
      if (remaining === 0) {
        result.push([...path]);
        return;
      }
      for (let i = start; i <= remaining; i++) {
        path.push(i);
        backtrack(remaining - i, i, path);
        path.pop();
      }
    };
    backtrack(number, 1, []);
    return result;
  };
  ```
- Les dates (epoch, etc...)
  ```js
  const date = Date.now();
  date.setMonth(1);
  ```
- Les Expressions Régulières

  ```js
  function letterSpaceNumber(str) {
    const regex = /([a-zA-Z])\s(\d+)/g;
    const results = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
      results.push(`${match[1]} ${match[2]}`);
    }

    return results;
  }
  ```
## Graph

![graph](/skills-tree.avif)
```
