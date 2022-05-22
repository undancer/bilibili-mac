import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";

const srcPath = path.join(__dirname, '../app-override')
const destPath = path.join(__dirname, '../app')

glob.sync(path.join(srcPath, '**/*')).forEach(file => {
    if (fs.statSync(file).isFile()) {
        const temp = path.relative(srcPath, file)
        const src = path.resolve(srcPath, temp)
        const dest = path.resolve(destPath, temp)
        console.log(src, " -> ", dest)
        fs.copyFileSync(src, dest)
    }
})
