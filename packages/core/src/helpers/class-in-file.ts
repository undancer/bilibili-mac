import { TraverseOptions } from '@babel/traverse'
import { ClassMethod, isClassMethod, isIdentifier, isStatement, ObjectExpression, ObjectMethod, stringLiteral, StringLiteral } from '@babel/types'
import template from '@babel/template'

export const class_in_file: TraverseOptions = {
    Class: (path) => {
        const parent = path.findParent((p) => {
            return p.isObjectExpression() && (<ObjectExpression>p.node).properties.length === 1
        })
        const filename = (<StringLiteral>(<ObjectMethod>(<ObjectExpression>parent!.node).properties.at(0)).key).value

        if (/^node_modules/g.test(filename)) {
            return
        }
        const buildHook = template(`console.log(%%text%%,'\\n',this);`)
        const constructor = path.node.body.body.find((method) => (isClassMethod(method) && isIdentifier(method.key) && method.key.name === 'constructor' ? method : undefined)) as
            | ClassMethod
            | undefined
        console.log(filename)
        // console.log(path.node.id)
        console.log(path.node.superClass)
        if (constructor) {
            console.log('类中的方法数', path.node.body.body.length)
            const hook = buildHook({ text: stringLiteral(`constructor in file ${filename}`) })
            if (isStatement(hook)) {
                constructor.body.body.push(hook)
            } else {
                console.log(hook)
            }
        } else {
            console.log('没有构造')
        }
    }
}
