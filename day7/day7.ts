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
    console.log(name);
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

calcSizes(fs);

// console.log(sizes);
const answer = sizes.filter((size) => size < 100000).reduce((a, b) => a + b);
console.log("The answer: ", answer);
// console.log("FileSystem structure", fs);
