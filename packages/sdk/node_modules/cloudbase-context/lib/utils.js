/**
 * 检验并获取当前所使用的的 collection 链接
 * 作用：通过判断当前用户配置环境，从而返回不同的 collection 去做后续的操作
 * @param {*} param0
 */
export const checkCollection = ({useDev, devCollection, collection}) => {
  let collectionName = collection
  if (devCollection !== '' && useDev && typeof useDev === 'boolean') {
    collectionName = useDev ? devCollection : collection
  }
  return collectionName
}
