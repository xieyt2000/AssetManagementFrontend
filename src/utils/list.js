
export const getList = async (api, self, listName = null) => {
  const res = await api()
  const { data: list, code } = res.data
  if (code === 200 && listName != null) {
    self.setState({
      [listName]: list
    })
  }
}
