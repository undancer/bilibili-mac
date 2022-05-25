import { NodePath, TraverseOptions } from '@babel/traverse'
import { NumericLiteral, StringLiteral, stringLiteral } from '@babel/types'

export const LiteralToString: TraverseOptions = {
    NumericLiteral: (path: NodePath<NumericLiteral>) => {
        const node = path.node
        if (node.extra && /^0[obx]/i.test(`${node.extra.raw}`)) {
            node.extra = undefined
        }
    },
    StringLiteral: (path: NodePath<StringLiteral>) => {
        const node = path.node
        let node_value
        if (node.extra && /\\[ux]/gi.test(`${node.extra.raw}`)) {
            try {
                node_value = decodeURIComponent(escape(node.value))
            } catch (error) {
                node_value = node.value
            }
            path.replaceWith(stringLiteral(node_value))
            node.extra = undefined
            // path.node.extra = {'raw': JSON.stringify(node_value), 'rawValue': node_value};
        }
    }
}
