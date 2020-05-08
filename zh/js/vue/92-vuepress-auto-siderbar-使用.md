# Vuepress Plugin Auto Sidebar

## 介绍（Introduction）

这是为 vuepress 自动~~生成侧边栏~~**分组**的插件。

### 1. 目录结构示例

```
docs
├── exampleMenu1
│   ├── exampleSubMenu1-1
│   │   └── file1.md
│   ├── exampleSubMenu1-2
│   │   └── exampleSubMenu1-2-1
|   |       └── file1.md
│   └── exampleSubMenu1-2
│   |   ├── file1.md
│   |   ├── file2.md
│   |   └── file3.md
|   ├── file1-1.md # 不推荐目录、文件同级
|   └── README.md # 原因见 提问5
├── exampleMenu2
│   ├── file1.md
│   └── README.md
```

## 安装（Install）

```
npm i vuepress-plugin-auto-sidebar -D
```

## 使用（Usage）

### 1. 无注释

有部分使用者跟我说注释后显得太乱，那就简单点。

```
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  }
}
```

### 2. 注释

与上方一致，仅仅是添加了注释。

```
// 修改 docs/.vuepress/config.js

module.exports = {
  // 引入插件
  plugins: {
    // 更多方式可参考:
    // https://v1.vuepress.vuejs.org/zh/plugin/using-a-plugin.html
    "vuepress-plugin-auto-sidebar": {} // 可参考下方的 “可选项”
  },
  themeConfig: {
  	// 无需配置
  }
}
```

## 可选项（Optional）

| 属性名称（key） | 类型（type） | 预设值（default） | 说明（description）                                          |
| --------------- | ------------ | ----------------- | ------------------------------------------------------------ |
| sort            | String       | asc               | 排序，`asc` 为升序，其他如 `desc` 为降序，更精准的排序见下方。 |
| titleMode       | String       | default           | 标题（分组）模式，可选参数为 `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`。 |
| titleMap        | Object       |                   | 标题映射，可与 `titleMode` 参数同时使用，且其优先度更高。    |
| nav             | Boolean      | false             | 生成 nav 简易模板。                                          |

### 1. sort

`asc` 和 `desc` 只能根据文件名称 `ASCII` 码进行排序。更精准的排序需要在文件中添加 `autoPrev` 或 `autoNext` 并指定**同目录下**的文件名，需要注意的是，错误的文件名会导致侧边栏不显示该文件。

```
---
autoPrev: fileNameXX
---
```

### 2. titleMode 说明

示例目录（Demo directory）：

```
docs
├── exampleMenu1
│   ├── exampleSubMenu1-a
│   │   └── file1.md
│   ├── exampleSubMenu1-b
│   │   └── file1.md
│   └── exampleSubMenu1-c
│       ├── file1.md
│       ├── file2.md
│       └── file3.md
├── exampleMenu2
│   ├── file1.md
│   └── README.md
```

分别得到的分组标题结果：

1. `default` ：

   ```
   exampleSubMenu1-a # exampleSubMenu1-a
   exampleSubMenu1-b # exampleSubMenu1-b
   exampleSubMenu1-c # exampleSubMenu1-c
   exampleMenu2 # exampleMenu2
   ```

2. `uppercase`：

   ```
   exampleSubMenu1-a # EXAMPLESUBMENU1-A
   exampleSubMenu1-b # EXAMPLESUBMENU1-B
   exampleSubMenu1-c # EXAMPLESUBMENU1-C
   exampleMenu2 # EXAMPLEMENU2
   ```

3. `camelcase`：

   ```
   exampleSubMenu1-a # exampleSubMenu1A
   exampleSubMenu1-b # exampleSubMenu1B
   exampleSubMenu1-c # exampleSubMenu1C
   exampleMenu2 # exampleMenu2
   ```

4. `titlecase`：

   ```
   exampleSubMenu1-a # Example Sub Menu1 A
   exampleSubMenu1-b # Example Sub Menu1 B
   exampleSubMenu1-c # Example Sub Menu1 C
   exampleMenu2 # Example Menu2
   ```

### 3. titleMap 说明

同样使用上述示例，配置 plugins：

```
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
    	titleMap: {
    		"exampleSubMenu1-a": "🎉 Hello Vuepress 🎉",
    		"exampleSubMenu1-c": "🎉 Auto Sidebar 🎉"
    	}
    }
  ],
}
```

得到结果：

```
exampleSubMenu1-a # 🎉 Hello Vuepress 🎉
exampleSubMenu1-b # exampleSubMenu1-b
exampleSubMenu1-c # 🎉 Auto Sidebar 🎉
exampleMenu2 # exampleMenu2
```

### 4. nav

在执行 `npm run docs:dev` 后生成 `.vuepress/nav.js` 文件，接着在 `.vuepress/config.js` 引入：

```
// .vuepress/config.js
const nav = require("./nav.js");

module.exports = {
  themeConfig: {
    nav // ES6 简写
  },
}
```

然后再次执行 `npm run docs:dev` 即可看到导航栏。

当 `.vuepress/nav.js` 已存在时将不会重复生成覆盖，一般推荐第一次生成导航栏时使用，因为这只会生成一个简易模板，更个性化建议修改它，[可参考](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#导航栏)。

## 提问（Questions）

### 1. 它的作用是自动生成侧边栏吗？

不，它**并不是**一个自动生成侧边栏的插件，**仅仅可以帮助你对同一目录下的文件进行分组。**

### 2. 当输入 `/exampleSubMenu1-a/` 路径之类时显示 404。

这是由于你在该目录下缺乏 `README.md` 文件，在 [vuepress](https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html#默认的页面路由) 提及了原因。

### 3. 生成侧边栏后左侧显示的是文件路径，而非文件名。

这是由于你的 `md` 缺乏标题，你可以选择：

1. 在 `md` 文件头部增加 `title` 属性，或[更多格式](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html#其他格式的-front-matter)。

   ```
   ---
   title: 标题
   ---
   ```

2. 当然你也可以添加 `markdown` 语法中的 `#`、`##`、`###` 标题符号。

   ```
   # 标题
   这是内容。
   ```

### 4. 希望像 vuepress 官网那样侧边栏存在多个分组？

需要在文件头添加分组标识：

```
---
autoGroup-1: 分组名称
# autoGroup+10: 分组名称
---
```

其中 `autoGroup` 为固定格式，不可更改。`-` 和 `+` 二者选其一，`-` 代表在默认分组的下方，数字越大越往下；`+` 代表在默认分组的上方，数字越大越往上。

效果示例及[参考文件地址](https://github.com/shanyuhai123/documents/tree/master/docs/frontend/javascript)。

[![image-20200114004204016](../../../static/img/image-20200114004204016.png)](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/blob/master/assets/image-20200114004204016.png)

### 5. 为什么不推荐目录、文件同级存在？

因为当同时存在时会导致如下图问题，这是由于 `vuepress` 默认主题导致的。

[![image-20200118012857853](../../../static/img/image-20200118012857853.png)](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar/blob/master/assets/image-20200118012857853.png)

如果你的 `vuepress` 文档不考虑支持多语言，那么你可以考虑直接修改 `vuepress` 的文件。

```
<-- node_modules/@vuepress/theme-default/components/NavLink.vue -->
<RouterLink
  v-if="isInternal"
  class="nav-link"
  :to="link"
  exact
  @focusout.native="focusoutAction"
>
  {{ item.text }}
</RouterLink>
```

不过并不推荐这样去修改，因为当使用自动化部署重新拉取 `vuepress` 时会导致其被覆盖。