import * as Tree from './tree'
const testTree = [
  {
    id: 1,
    name: '1',
    children: [
      {
        id: 2,
        name: '2',
        children: [
          {
            id: 3,
            name: '3'
          }
        ]
      },
      {
        id: 4,
        name: '4'
      }
    ]
  }
]
describe('utils/tree', () => {
  it('test getParentKey', () => {
    expect(Tree.getParentKey(3, testTree)).toBe(2)
  })
  it('test expandTree', () => {
    const tmpTree = []
    Tree.expandTree(testTree, tmpTree)
    expect(tmpTree.length).toBe(4)
  })
  it('test loop', () => {
    Tree.loop('1', testTree)
  })
})
