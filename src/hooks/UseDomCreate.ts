import { onUnmounted } from 'vue'

function UseDomCreate(nodeId: string) {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default UseDomCreate