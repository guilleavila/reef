import { getNode } from "./getNode"

export const toggleImage = (nodeID1, nodeID2) => {
    const node1 = getNode(nodeID1)
    node1.style.visibility = 'hidden'
    const node2 = getNode(nodeID2)
    node2.style.visibility = 'visible'
}

