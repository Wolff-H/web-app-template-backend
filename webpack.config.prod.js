import path from "path"  // 首先要引入node.js中path 模块，用于处理文件与目录的路径
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"

// const 命令声明一个只读的常量，一旦声明，值不可以改变，改变会报错；只声明不赋值也会报错
// 常量存储的是一个不可以变化的变量。
// 
export default {
    entry: './src/main.ts', // 指定入口文件
    output: {
        path: path.resolve('../backend-dist'), // 指定出口文件的路径目录
        filename: 'schedule.bundle.js' // 制定出口文件的名称
    },
    target: 'node',
    mode: 'production',
    module: {
        rules: [  // 添加解析规则
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {   // 需要打包的文件后缀
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin({/* options */ })]
    },
    watchOptions: {
        ignored: /node_modules/,
        // 监听到文件变化后会等待300ms再去执行，默认300ms
        aggregateTimeout: 300,
        // 判断文件变化是通过轮询询问系统指定文件是否变化，默认每秒询问1次
        poll: 1000,
    },
}