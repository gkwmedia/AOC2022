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
  }
}

console.log("FileSystem structure", fs);
