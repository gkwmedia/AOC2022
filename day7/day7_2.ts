export const day = 7;

type Dir = {
  parent?: Dir;
  files: { [name: string]: number };
  dirs: { [name: string]: Dir };
};

const fs: Dir = { files: {}, dirs: {} };

let currentDir = fs;

let input: string | string[] = await Deno.readTextFile("./input.txt");
input = input.split("\n");

for (const command of input) {
  const [cmd, ...rest] = command.split(" ");

  console.log(cmd);
  if (cmd == "$") {
    console.log(rest);
    if (rest[0] == "cd") {
      let dir = rest[1];
      if (dir == "/") {
        currentDir = fs;
      } else if (dir == "..") {
        currentDir = currentDir.parent!;
      } else {
        if (!currentDir.dirs[dir]) {
          currentDir.dirs[dir] = { parent: currentDir, files: {}, dirs: {} };
        }
        currentDir = currentDir.dirs[dir];
      }
    }
  } else if (cmd !== "dir") {
    let name = rest[0];
    // console.log(name);
    currentDir.files[name] = parseInt(cmd);
  }
}

const sizes: number[] = [];

function calcSizes(dir: Dir): number {
  let size = 0;
  for (const file in dir.files) {
    size += dir.files[file];
  }
  for (const _dir in dir.dirs) {
    const dirSize = calcSizes(dir.dirs[_dir]);
    size += dirSize;
    sizes.push(dirSize);
  }
  return size;
}
const totalDisk = 70000000;
const neededSpace = 30000000;
const totalSize = calcSizes(fs);
const freeSpace = totalDisk - totalSize;
const sizeNeeded = neededSpace - freeSpace;
console.log("size needed: ", sizeNeeded);
// console.log(sizes);
console.log("freeSpace: ", freeSpace);

const answer = sizes
  .filter((size) => size >= sizeNeeded)
  .reduce((a, b) => Math.min(a, b));
console.log("answer: ", answer);
// const totalSize = sizes.reduce((a, b) => a + b);

console.log("Total size: ", totalSize);
