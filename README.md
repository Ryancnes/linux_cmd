# Linux 命令查询手册

一个纯静态的 Linux 命令查询网站：支持关键词搜索、分类筛选、命令详情（语法、常用选项、示例一键复制），无需后端和数据库，打开网页即可使用，也可以部署到 GitHub Pages 免费托管。

## 功能特点

- 🔍 全文搜索：支持命令名、中文功能描述、英文说明搜索（如 `grep`、`端口`、`压缩`）
- 📂 分类浏览：文件目录、文本处理、压缩打包、权限用户、进程管理、系统信息、网络、磁盘、软件包、Shell 技巧共 10 类
- 📖 命令详情：中文释义、语法、常用选项表、可直接复制的实用示例
- ⚡ 快捷键：按 `/` 聚焦搜索框，按 `Esc` 关闭弹窗
- 🔗 可分享链接：点击命令后 URL 变为 `#cmd=ls`，刷新或分享后直接定位该命令
- 📱 响应式布局：桌面与手机均可正常使用

当前已收录 **156 条命令**，覆盖 10 个分类，并会随着学习笔记持续补充（例如 groupadd/groupdel、route、sar、nmcli、LVM 系列等）。

## 本地预览

直接用浏览器打开 `index.html` 即可。若想用本地服务器预览（推荐）：

```bash
# 任选一种，在站点目录下执行
python3 -m http.server 8000
# 或
npx serve .
```

然后访问 http://localhost:8000 。

## 部署到 GitHub Pages

### 方法一：新建仓库上传（最简单）

1. 登录 GitHub，点击右上角 **+ → New repository**；
2. 仓库名填写，例如 `linux-commands`，选择 **Public**，直接点击 **Create repository**（不要勾选 README）；
3. 把本目录下所有文件上传到仓库根目录，可通过以下任一方式：
   - 网页端：进入仓库 → **Add file → Upload files**，把 `index.html`、`css/`、`js/`、`README.md` 全部拖入；
   - 命令行：
     ```bash
     cd 本目录
     git init
     git add .
     git commit -m "初始化 Linux 命令查询网站"
     git branch -M main
     git remote add origin https://github.com/<你的用户名>/linux-commands.git
     git push -u origin main
     ```
4. 进入仓库 **Settings → Pages**；
5. 在 **Build and deployment** 的 **Source** 下拉框选择 **Deploy from a branch**；
6. **Branch** 选择 `main`，目录选择 `/ (root)`，点击 **Save**；
7. 等待约 1-2 分钟，访问：
   `https://<你的用户名>.github.io/linux-commands/`

以后每次 `git push` 到 `main`，GitHub Pages 都会自动重新发布。

### 方法二：Fork 本项目仓库

如果本站点已存在于 GitHub 公共仓库，可以直接 Fork 该仓库，然后在自己的 Fork 中打开 **Settings → Pages** 按上面的步骤发布。

## 自定义域名（可选）

1. 在仓库 Settings → Pages 中填写你的域名；
2. 到域名服务商处添加一条 `CNAME` 记录，指向 `<用户名>.github.io`；
3. 等待 DNS 生效即可。

## 扩充命令库

命令数据按分类存放在 `js/data/` 目录下，每个文件是一个数组。新增命令时：

1. 找到对应分类的文件（或新建一个数据文件）；
2. 追加一条记录，格式如下：

```js
{
  name: "命令名",
  category: "所属分类",
  summary: "一句话简介",
  description: "更详细的说明",
  syntax: "命令名 [选项] [参数]",
  options: [
    ["-x", "选项说明"],
    ["--long", "选项说明"]
  ],
  examples: [
    ["命令示例", "示例说明"]
  ]
}
```

3. 若新建了数据文件，需要在 `index.html` 的 `<body>` 末尾、`js/app.js` 之前加入对应的 `<script>` 引用，并在 `js/app.js` 顶部的合并列表中加入该数组名；
4. 刷新页面即可看到新命令，然后提交推送到 GitHub。

## 说明

命令描述基于通用 Linux 发行版整理，部分内容整理自本地学习笔记（文件管理、用户与组管理、网络与磁盘运维等）。不同发行版（Debian/Ubuntu、RHEL、Arch 等）的包管理命令不同，实际使用请以 `man 命令名` 的官方文档为准。
