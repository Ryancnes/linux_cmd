// 分类：软件包管理
const DATA_PKG = [
  {
    name: "apt",
    category: "软件包管理",
    summary: "Debian/Ubuntu 的高级软件包管理工具",
    description: "比 apt-get 更友好的前端，整合了 update/install 等常用操作，交互提示更清晰。",
    syntax: "sudo apt [子命令] [软件包]",
    options: [
      ["update", "更新软件源索引"],
      ["upgrade", "升级所有可升级软件包"],
      ["install 包名", "安装软件包"],
      ["remove 包名", "卸载软件包"],
      ["autoremove", "清理自动安装且不再需要的依赖"],
      ["search 关键词", "搜索软件包"],
      ["show 包名", "查看软件包详细信息"],
      ["list --installed", "列出已安装软件包"]
    ],
    examples: [
      ["sudo apt update && sudo apt upgrade -y", "更新索引并升级系统"],
      ["sudo apt install nginx", "安装 nginx"],
      ["apt search image editor", "搜索软件包"],
      ["sudo apt remove nginx", "卸载 nginx"]
    ]
  },
  {
    name: "apt-get",
    category: "软件包管理",
    summary: "Debian/Ubuntu 传统包管理命令",
    description: "apt 的底层实现，适合脚本使用；日常交互可优先用 apt。",
    syntax: "sudo apt-get [子命令] [软件包]",
    options: [
      ["update", "更新软件源索引"],
      ["upgrade", "升级软件"],
      ["install/-remove", "安装/卸载"],
      ["autoremove", "清理无用依赖"],
      ["clean", "清理下载的 .deb 缓存"]
    ],
    examples: [
      ["sudo apt-get update", "刷新软件源"],
      ["sudo apt-get install -y curl", "静默安装 curl"],
      ["sudo apt-get autoremove", "清理无用依赖"]
    ]
  },
  {
    name: "dpkg",
    category: "软件包管理",
    summary: "Debian 软件包（.deb）底层管理工具",
    description: "直接操作 .deb 包，不自动处理依赖；查已装包、提取文件等场景常用。",
    syntax: "dpkg [子命令] [软件包或文件]",
    options: [
      ["-i 包.deb", "安装本地 deb 文件"],
      ["-r 包名", "卸载（保留配置文件）"],
      ["-l [模式]", "列出已安装软件包"],
      ["-s 包名", "查看软件包状态"],
      ["-L 包名", "列出软件包安装的文件"],
      ["-S 文件路径", "查询文件属于哪个包"]
    ],
    examples: [
      ["sudo dpkg -i google-chrome.deb", "安装本地 deb 文件"],
      ["dpkg -l | grep nginx", "查找已安装的 nginx 包"],
      ["dpkg -L nginx-common | head", "查看包安装的文件"],
      ["dpkg -S /bin/ls", "查询 /bin/ls 属于哪个包"]
    ]
  },
  {
    name: "yum",
    category: "软件包管理",
    summary: "RHEL/CentOS 7 及以下版本的包管理器",
    description: "基于 RPM 的包管理器，自动处理依赖；在新版 RHEL/Fedora 中已被 dnf 替代。",
    syntax: "sudo yum [子命令] [软件包]",
    options: [
      ["install", "安装"],
      ["update", "升级"],
      ["remove", "卸载"],
      ["search", "搜索"],
      ["info", "查看包信息"],
      ["repolist", "查看软件源列表"],
      ["history", "查看包操作历史"]
    ],
    examples: [
      ["sudo yum install -y nginx", "安装 nginx"],
      ["sudo yum update -y", "升级所有软件包"],
      ["yum search nginx", "搜索软件包"]
    ]
  },
  {
    name: "dnf",
    category: "软件包管理",
    summary: "Fedora/RHEL 8+ 的包管理器",
    description: "yum 的下一代实现，性能更好、依赖解析更可靠，命令用法与 yum 基本一致。",
    syntax: "sudo dnf [子命令] [软件包]",
    options: [
      ["install", "安装"],
      ["upgrade", "升级"],
      ["remove", "卸载"],
      ["search", "搜索"],
      ["autoremove", "清理无用依赖"],
      ["groupinstall", "安装软件组"]
    ],
    examples: [
      ["sudo dnf install -y nginx", "安装 nginx"],
      ["sudo dnf upgrade", "升级系统软件"],
      ["sudo dnf groupinstall 'Development Tools'", "安装开发工具组"]
    ]
  },
  {
    name: "rpm",
    category: "软件包管理",
    summary: "RPM 软件包底层管理工具",
    description: "直接操作 .rpm 包，不自动处理依赖，主要用在查询和安装本地包。",
    syntax: "rpm [子命令] [软件包或文件]",
    options: [
      ["-ivh 包.rpm", "安装并显示进度"],
      ["-e 包名", "卸载"],
      ["-qa", "列出所有已安装包"],
      ["-qf 文件", "查询文件属于哪个包"],
      ["-ql 包名", "列出包内文件"],
      ["-qi 包名", "查看包详细信息"]
    ],
    examples: [
      ["sudo rpm -ivh nginx.rpm", "安装本地 rpm 包"],
      ["rpm -qa | grep nginx", "查询是否安装了 nginx"],
      ["rpm -qf /usr/bin/curl", "查看 curl 命令属于哪个包"]
    ]
  },
  {
    name: "pacman",
    category: "软件包管理",
    summary: "Arch Linux 的包管理器",
    description: "同时管理官方仓库和 AUR 依赖，滚动更新，包名格式简洁（全部小写）。",
    syntax: "sudo pacman [子命令] [软件包]",
    options: [
      ["-S 包名", "安装软件包"],
      ["-Syu", "同步数据库并全面升级"],
      ["-Rns 包名", "卸载并清除依赖与配置"],
      ["-Ss 关键词", "搜索软件包"],
      ["-Qi 包名", "查看已安装包信息"]
    ],
    examples: [
      ["sudo pacman -Syu", "升级整个系统"],
      ["sudo pacman -S nginx", "安装 nginx"],
      ["pacman -Ss vim", "搜索 vim 相关包"]
    ]
  },
  {
    name: "snap",
    category: "软件包管理",
    summary: "Ubuntu 的 Snap 应用管理工具",
    description: "管理自包含的 snap 应用包，沙箱运行、自动更新；命令与多数包管理器类似。",
    syntax: "sudo snap [子命令] [应用]",
    options: [
      ["install", "安装"],
      ["remove", "卸载"],
      ["refresh", "更新"],
      ["list", "列出已安装"],
      ["info", "查看应用信息"]
    ],
    examples: [
      ["sudo snap install code --classic", "安装 VS Code"],
      ["snap list", "查看已安装的 snap 应用"]
    ]
  },
  {
    name: "zypper",
    category: "软件包管理",
    summary: "openSUSE 的包管理器",
    description: "openSUSE 系列的系统包管理工具，同样基于 RPM。",
    syntax: "sudo zypper [子命令] [软件包]",
    options: [
      ["install", "安装"],
      ["update", "升级"],
      ["remove", "卸载"],
      ["search", "搜索"],
      ["info", "查看包信息"]
    ],
    examples: [
      ["sudo zypper install nginx", "安装 nginx"],
      ["sudo zypper update", "升级系统"]
    ]
  },
  {
    name: "flatpak",
    category: "软件包管理",
    summary: "跨发行版的桌面应用管理工具",
    description: "安装沙箱化的跨发行版桌面应用，通常从 Flathub 等远程仓库获取。",
    syntax: "flatpak [子命令] [应用]",
    options: [
      ["install 远程 应用", "安装应用"],
      ["run 应用", "运行应用"],
      ["update", "更新应用"],
      ["list", "列出已安装应用"],
      ["uninstall", "卸载"]
    ],
    examples: [
      ["flatpak install flathub org.videolan.VLC", "从 Flathub 安装 VLC"],
      ["flatpak run org.videolan.VLC", "运行 VLC"],
      ["flatpak list --app", "列出已安装的 GUI 应用"]
    ]
  }
];
