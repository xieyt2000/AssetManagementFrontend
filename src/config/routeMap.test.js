import routeMap from './routeMap'
describe('routeMap test', function () {
  it('test', function () {
    expect(routeMap[0].path).toBe('/dashboard')
    expect(routeMap[1].path).toBe('/user')
    expect(routeMap[2].path).toBe('/log')
    expect(routeMap[3].path).toBe('/asset/management')
    expect(routeMap[4].path).toBe('/asset/category')
    expect(routeMap[5].path).toBe('/department')
    expect(routeMap[6].path).toBe('/asset/require')
  })
})
