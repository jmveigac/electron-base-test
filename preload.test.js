jest.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn()
  }
}))

const { contextBridge } = require('electron')

test('exposes only runtime version information to the renderer', () => {
  require('./preload')

  expect(contextBridge.exposeInMainWorld).toHaveBeenCalledWith('versions', {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  })
})
