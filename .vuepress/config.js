// const sidebar1 = require('vuepress-auto-sidebar')

module.exports = {
  title: '个人资料库',
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '资料库', link: '/zh/' },
      { 
        text: '在线工具', 
        ariaLabel: '现在工具',
        items: [
          { 
            text: '在线编辑', 
            items: [
                { text: 'PDF 转换器', link: 'https://smallpdf.com/cn/pdf-to-word' },
                { text: 'JSON 编辑器 ', link: 'https://www.bejson.com/jsoneditoronline' },
                { text: 'MD 表格生成 ', link: 'https://tableconvert.com/?output=text&data=id%2C name%2C age%2C gender 1%2C Lawrence%2C 39%2C M 2%2C Oliver%2C 25%2C M 3%2C Roberta%2C 17%2C F 4%2C Bamboo%2C 70%2C F' },
                { text: 'CRON 表达式', link: 'http://cron.qqe2.com/' },
                { text: '代码格式化 ', link: 'http://tool.oschina.net/codeformat/html' },
                { text: '公式编辑器 ', link: 'https://zh.numberempire.com/latexequationeditor.php' },
                { text: '二维码生成器', link: 'https://cli.im/' },
                { text: '在线编码转换 ', link: 'https://cli.im/' },
                { text: 'YAML <-> Properties ', link: 'http://www.toyaml.com/' },
                { text: '在线 Web 练习', link: 'https://jsfiddle.net/' }
              ] 
          },
          {  
            text: '在线服务', 
            items: [
              { text: 'Boot CDN    ', link: 'https://www.bootcdn.cn/                    ' },
              { text: '百度 CDN     ', link: 'http://cdn.code.baidu.com/                  ' },
              { text: '微信 CDN    ',  link: 'http://qydev.weixin.qq.com/cdn/cdnjs.html         ' },
              { text: '科大谷歌字体加速',link: 'https://servers.ustclug.org/2014/06/blog-googlefonts-speedup/' },
              { text: 'tldr 命令手册  ',link: 'https://tldr.ostera.io/                    ' }
              ] 
          },
          {  
            text: '开源镜像', 
            items: [
              { text: 'OPSX       ', link: 'https://opsx.alibaba.com/  ' },
              { text: 'AZURE      ', link: 'https://mirror.azure.cn/   ' },
              { text: 'Docker HUB',  link: 'https://hub.docker.com/          ' }
              ] 
          },
          {  
            text: '趋势分析', 
            items: [
              { text: '谷歌趋势      ', link: 'https://trends.google.com/trends/?geo=US' },
              { text: '百度指数      ', link: 'http://index.baidu.com/#/               ' },
              { text: '百度流量研究院',  link: 'https://tongji.baidu.com/data/browser         ' }
              ] 
          },
        ]
      },
      {
        text: '下载网站',
        ariaLabel: '下载网站',
        items: [
          { text: '微软msdn', link: 'https://msdn.itellyou.cn/' }
        ]
      },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ],
    // sidebar: sidebar1.getSidebar(),
    lastUpdated: '最后更新时间', // string | boolean
  },

  // sidebar: [
  //     '/',
  //     '/zh',
  //     '/zh/aliyun/',
  //     ['/page-b', 'Explicit link text']
  //   ]
  // themeConfig: {
  //   lastUpdated: '最后更新时间' // string | boolean
  // }
}