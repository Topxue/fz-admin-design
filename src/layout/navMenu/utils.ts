// 菜单高亮（详情时，父级高亮）
export const setParentHighlight = (currentRoute: RouteToFrom) => {
  const { path, meta } = currentRoute
  const pathSplit = meta?.isDynamic
    ? meta.isDynamicPath!.split('/')
    : path!.split('/')
  if (pathSplit.length >= 4 && meta?.isHide)
    return pathSplit.splice(0, 3).join('/')
  else return path
}
