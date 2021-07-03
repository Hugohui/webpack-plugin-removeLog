const fs = require('fs')

module.exports = class RemoveLogs {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        // 编译器准备环境
        compiler.hooks.environment.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs 编译器准备环境');
        });

        // 编译器环境设置完成
        compiler.hooks.afterEnvironment.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs 编译器环境设置完成');
        });
        
        // entry被处理之后
        compiler.hooks.entryOption.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs entry被处理之后');
        });

        // 在初始化内部插件集合完成设置
        compiler.hooks.afterPlugins.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs 在初始化内部插件集合完成设置');
        });

        // 开始执行构建前执行
        compiler.hooks.beforeRun.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs 开始执行构建前执行');
        }); 
        
        // 输出 asset 到 output 目录之前执行
        compiler.hooks.emit.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs 输出 asset 到 output 目录之前执行');
        });


        // 编译完成之后调用
        compiler.hooks.done.tap('RemoveLogs', stats => {
            console.log('RemoveLogs 编译完成之后调用');

            const { path, filename } = stats.compilation.options.output
            try {
                let file_path = path + '/' + filename
                fs.readFile(file_path, 'utf-8', (err, data) => {
                    const rgx = /console.log\(['|"](.*?)['|"]\)/;
                    const newdata = data.replace(rgx, "");
                    if (err) console.log(err);
                    fs.writeFile(file_path, newdata, function(err) {
                        if (err) {
                            return console.log(err)
                        }
                    });
                })
            } catch (error) {
                console.log(error);
            }
        })

        // 编译失败调用
        compiler.hooks.failed.tap('RemoveLogs', (context, entry) => {
            console.log('RemoveLogs 编译失败调用');
        })
    }
}