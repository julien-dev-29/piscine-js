const findIp = (str) => {
  const match = str.match(
    /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/,
  );
  return match ? [match[0]] : [];
};

const findYolo = (str) => {
  const match = str.match(
    /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,
  );
  return match ? [match[0]] : [];
};

console.log(findIp("255.0.0.27:3000"));

console.log(findYolo("255.4.0.27:3000"));
