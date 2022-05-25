import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import * as glob from 'glob'

// console.log("sign");
const root = path.join(__dirname, '../app')

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex')
}

function sha256(file) {
    const data = fs.readFileSync(file)
    return crypto.createHash('sha256').update(data).digest('hex')
}

let hash = sha256(path.join(root, 'package.json'))
glob.sync(path.join(root, '{main,render}/**/*')).forEach((file) => {
    if (fs.statSync(file).isFile()) {
        hash += sha256(file)
    }
})
hash = md5('bili' + 'bili' + '-' + hash)

fs.writeFileSync(path.join(root, '.appkey'), hash, { encoding: 'utf-8' })
console.log('sign done')
