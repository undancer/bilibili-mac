import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import * as path from 'path'
import * as helpers from './helpers'
import { glob } from 'glob'
import * as fs from 'fs'
import chalk from 'chalk'

const decode = (input: string) => {
    const ast = parse(input)
    // console.log("helpers,", Object.keys(helpers))
    Object.entries(helpers).forEach(([key, helper]) => {
        console.log(key, ' -> ', helper)
        traverse(ast, helper)
    })

    const { code: output } = generate(ast, {
        retainLines: true
    })
    return output
}

const cli = () => {
    console.log(chalk.blue('bootstrap'))
    const argv = yargs(hideBin(process.argv), process.cwd())
        // yargs(process.argv.slice(2))
        .options({
            src: {
                type: 'string',
                default: path.join(process.cwd(), './app')
            },
            dest: {
                type: 'string',
                default: path.join(process.cwd(), './dist')
            }
        })
        // .help()
        .parseSync()

    const { src, dest } = argv
    console.log(chalk.blue('files'))
    glob.sync(path.resolve(src, '{main,render}/**/*')).forEach((file) => {
        if (fs.statSync(file).isFile()) {
            const out = path.resolve(dest, path.relative(src, file))
            fs.mkdirSync(path.dirname(out), { recursive: true })
            if (path.extname(file) === '.js') {
                // types.isFile(null);
                try {
                    const data = fs.readFileSync(file, { encoding: 'utf-8' })

                    const code = decode(data)

                    console.log(chalk.blue('write'), chalk.gray(path.relative(process.cwd(), file)), chalk.gray(path.relative(process.cwd(), out)))
                    fs.writeFileSync(out, code)
                } catch (e) {
                    console.log(chalk.blue('copy'), chalk.gray(path.relative(process.cwd(), file)), chalk.gray(path.relative(process.cwd(), out)))
                    fs.copyFileSync(file, out)
                }
            } else {
                console.log(chalk.blue('copy'), chalk.gray(path.relative(process.cwd(), file)), chalk.gray(path.relative(process.cwd(), out)))
                fs.copyFileSync(file, out)
            }
        }
    })
}
export default cli
