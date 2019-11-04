import * as fs from 'fs'
import * as express from 'express'
import * as service from 'js-build-by-feature-map-express-service'
import * as path from 'path'
import * as os from 'os'
import * as open from 'open'

var app = express()
var pagesHandle = express.static(path.resolve(__dirname, '../pages'))
const webpackConfig = {
  entry: {
    result: path.resolve(__dirname, '../source-code/index.js')
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  devtool: 'none',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js/
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        config: {
          name: 'config',
          chunks: 'initial',
          test: path.resolve(__dirname, './src/constants/config.js'),
          reuseExistingChunk: true
        }
      }
    }
  }
}

service.service(app, {
  route: '/dist',
  webpackConfig: webpackConfig,
  buildConfig: {
    isDifferentFile: true
  }
})

//express 返回html
app.use('/pages', pagesHandle)

//页面：编译前代码和编译后代码对比以及运行结果
app.use('/source-code', (req: express.Request, res: express.Response) => {
  const sourceCode = fs.readFileSync(_path('../source-code/index.js')).toString()
  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
  res.send(sourceCode)
})

app.listen(8003)

const ip = getIPAdress() || 'localhost'
console.log(`使用chrome和IE打开：http://${ip}:8003/pages/demo.html 对比编译结果`)
open(`http://${ip}:8003/pages/demo.html`)

function _path(file: string) {
  return path.resolve(__dirname, file)
}


function getIPAdress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
      let iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
          let alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}