jest.mock('electron', () => ({
  BrowserWindow: jest.fn()
}))

const path = require('node:path')
const { BrowserWindow } = require('electron')
const { createWindow } = require('./app')

describe('createWindow', () => {
  let loadFile

  beforeEach(() => {
    loadFile = jest.fn()
    BrowserWindow.mockReset()
    BrowserWindow.mockImplementation(() => ({ loadFile }))
  })

  test('creates a secure BrowserWindow and loads the renderer', () => {
    const win = createWindow()

    expect(BrowserWindow).toHaveBeenCalledWith({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true
      }
    })
    expect(loadFile).toHaveBeenCalledWith('index.html')
    expect(win).toEqual({ loadFile })
  })
})
