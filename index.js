#! /usr/bin/env node


console.log('wsw-cli走起', )
const chalk = require('chalk') // 着色
const inquirer = require('inquirer') // 命令行问询
const download = require('download-git-repo') // 下载git库作为模板
const ora = require('ora') // 进度相关
const symbols = require('log-symbols') // 输出icon


const { program } = require('commander') // 命令行api集合
program
  .version(require('./package.json').version, '-v, --version')
  .command('init <name>')
  .action(name =>{
    inquirer.prompt({
      type: 'input',
      name: 'name', // 这里的val 会作为answer的key返回
      message: '请输入项目名称'
    })
      .then(answer => {
        const pcs = ora('正在下载模板```')
        pcs.start()
        // console.log('author', answer.anthor)
        download('direct:https://github.com/davidwang1988/wsw-cli-template.git',answer.name,{clone: true}, err => {
          if (err) {
            pcs.fail()
          } else {
            pcs.succeed()
          }
          console.log(err ? err : symbols.success, chalk.green('Success'))
        })
      })
  })

program.parse(process.argv)
