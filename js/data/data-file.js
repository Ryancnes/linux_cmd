// 分类：文件与目录
const DATA_FILE = [
  {
    name: "ls",
    category: "文件与目录",
    summary: "列出目录中的文件和子目录",
    description: "最常用的目录列举命令，支持长格式、隐藏文件、人类可读大小、按时间排序等输出方式。",
    syntax: "ls [选项] [文件或目录...]",
    options: [
      ["-l", "以长格式显示详细信息（权限、链接数、属主、大小、时间）"],
      ["-a", "显示所有文件，包括以 . 开头的隐藏文件"],
      ["-h", "配合 -l 使用，以 K/M/G 等人类可读方式显示大小"],
      ["-t", "按修改时间从新到旧排序"],
      ["-S", "按文件大小从大到小排序"],
      ["-R", "递归列出子目录内容"],
      ["-d", "只列出目录本身，不进入目录"],
      ["-i", "显示文件的 inode 编号"]
    ],
    examples: [
      ["ls -lh", "以人类可读大小查看当前目录文件"],
      ["ls -la /etc", "查看 /etc 目录全部文件，含隐藏文件"],
      ["ls -lt | head", "查看最近修改的几个文件"]
    ]
  },
  {
    name: "pwd",
    category: "文件与目录",
    summary: "显示当前所在的工作目录",
    description: "Print Working Directory，输出当前 shell 所在的绝对路径。",
    syntax: "pwd",
    options: [
      ["-P", "显示物理路径，不解析符号链接"]
    ],
    examples: [
      ["pwd", "输出当前目录的绝对路径"]
    ]
  },
  {
    name: "cd",
    category: "文件与目录",
    summary: "切换当前工作目录",
    description: "shell 内建命令，进入指定目录；不带参数回到用户主目录。",
    syntax: "cd [目录]",
    options: [
      ["-", "回到上一次所在目录"],
      ["~", "进入当前用户的主目录"]
    ],
    examples: [
      ["cd /var/log", "进入 /var/log 目录"],
      ["cd ..", "返回上一级目录"],
      ["cd -", "切换到上次所在目录"]
    ]
  },
  {
    name: "mkdir",
    category: "文件与目录",
    summary: "创建新目录",
    description: "创建目录；配合 -p 可以一次性创建多级目录，已存在时也不会报错。",
    syntax: "mkdir [选项] 目录名...",
    options: [
      ["-p", "递归创建多级目录，如 mkdir -p a/b/c"],
      ["-m", "创建时直接设置权限，如 mkdir -m 700 dir"],
      ["-v", "显示创建过程"]
    ],
    examples: [
      ["mkdir project", "创建单个目录 project"],
      ["mkdir -p src/components/ui", "一次性创建多级目录"],
      ["mkdir -m 700 private", "创建权限为 700 的私有目录"]
    ]
  },
  {
    name: "rmdir",
    category: "文件与目录",
    summary: "删除空目录",
    description: "只能删除空目录；要删除非空目录请使用 rm -r。",
    syntax: "rmdir [选项] 目录名...",
    options: [
      ["-p", "逐级删除空的父目录"],
      ["-v", "显示删除过程"]
    ],
    examples: [
      ["rmdir tmp", "删除空目录 tmp"],
      ["rmdir -p a/b/c", "依次删除 c、b、a（都为空时）"]
    ]
  },
  {
    name: "touch",
    category: "文件与目录",
    summary: "创建空文件或更新文件时间戳",
    description: "文件不存在时创建空文件；文件已存在时将其访问和修改时间更新为当前时间。",
    syntax: "touch [选项] 文件...",
    options: [
      ["-t", "指定时间戳，如 touch -t 202609091200 file"],
      ["-a", "只修改访问时间"],
      ["-m", "只修改修改时间"],
      ["-c", "文件不存在时不创建"]
    ],
    examples: [
      ["touch README.md", "创建空文件 README.md"],
      ["touch -t 202601010000 old.txt", "把文件时间改为 2026-01-01 00:00"]
    ]
  },
  {
    name: "cp",
    category: "文件与目录",
    summary: "复制文件或目录",
    description: "复制源文件到目标路径；复制目录需要 -r，保留属性时可加 -p 或 -a。",
    syntax: "cp [选项] 源文件 目标文件（或目标目录）",
    options: [
      ["-r", "递归复制整个目录"],
      ["-p", "保留权限、属主和时间戳等属性"],
      ["-a", "归档模式，等价于 -dR --preserve=all，常用于备份"],
      ["-i", "目标已存在时先询问确认"],
      ["-u", "仅当源文件更新时才覆盖"],
      ["-v", "显示复制过程"],
      ["-n", "不覆盖已存在的文件"]
    ],
    examples: [
      ["cp app.py backup/app.py", "复制单个文件"],
      ["cp -r project /backup/project", "递归复制整个目录"],
      ["cp -a /home/user /backup", "归档复制，保留所有属性"]
    ]
  },
  {
    name: "mv",
    category: "文件与目录",
    summary: "移动文件或目录，也可用于重命名",
    description: "把文件移动到新位置；在同一目录内移动即相当于重命名。",
    syntax: "mv [选项] 源文件 目标路径",
    options: [
      ["-i", "目标存在时询问确认"],
      ["-f", "强制覆盖，不询问"],
      ["-u", "目标较旧或不存在时才移动"],
      ["-v", "显示移动过程"]
    ],
    examples: [
      ["mv old.txt new.txt", "将 old.txt 重命名为 new.txt"],
      ["mv *.log logs/", "把当前目录所有 .log 文件移动到 logs 目录"],
      ["mv -i file /tmp/", "移动到 /tmp，如目标同名先确认"]
    ]
  },
  {
    name: "rm",
    category: "文件与目录",
    summary: "删除文件或目录",
    description: "永久删除文件，不会进入回收站，请谨慎使用；删除目录需加 -r。",
    syntax: "rm [选项] 文件或目录...",
    options: [
      ["-r", "递归删除目录及其内容"],
      ["-f", "强制删除，忽略不存在的文件，不再提示"],
      ["-i", "每次删除前询问确认"],
      ["-v", "显示删除过程"]
    ],
    examples: [
      ["rm file.txt", "删除单个文件"],
      ["rm -rf ./build", "强制递归删除 build 目录（注意核对路径！）"],
      ["rm -i *.tmp", "逐个确认后删除临时文件"]
    ]
  },
  {
    name: "ln",
    category: "文件与目录",
    summary: "创建硬链接或符号链接",
    description: "默认创建硬链接；-s 创建符号链接（软链接），软链接类似 Windows 的快捷方式。",
    syntax: "ln [选项] 目标文件 链接名",
    options: [
      ["-s", "创建符号链接"],
      ["-f", "链接名已存在时强制覆盖"],
      ["-v", "显示链接创建过程"]
    ],
    examples: [
      ["ln -s /usr/bin/python3 /usr/local/bin/python", "为 python3 创建软链接"],
      ["ln file.txt hard.txt", "为文件创建硬链接（同一 inode）"]
    ]
  },
  {
    name: "find",
    category: "文件与目录",
    summary: "在目录树中按条件查找文件",
    description: "功能强大的查找命令，可按名称、类型、大小、时间、权限等条件查找，还能直接对结果执行操作。",
    syntax: "find [查找路径] [匹配条件] [动作]",
    options: [
      ["-name 模式", "按文件名匹配，支持通配符，如 '*.log'"],
      ["-iname 模式", "忽略大小写匹配文件名"],
      ["-type f/d/l", "按类型查找：普通文件/目录/符号链接"],
      ["-size +100M", "查找大于 100M 的文件"],
      ["-mtime -7", "查找 7 天内修改过的文件"],
      ["-user 用户名", "按属主查找"],
      ["-exec 命令 {} \\;", "对每个结果执行命令"],
      ["-delete", "删除查找到的文件（谨慎）"]
    ],
    examples: [
      ["find . -name '*.py'", "在当前目录递归查找所有 Python 文件"],
      ["find /var/log -type f -mtime -3", "查找 3 天内修改过的日志文件"],
      ["find . -size +100M -exec ls -lh {} \\;", "找出超过 100M 的文件并列出详情"],
      ["find . -name '*.tmp' -delete", "删除所有 .tmp 临时文件"]
    ]
  },
  {
    name: "locate",
    category: "文件与目录",
    summary: "按文件名快速查找文件",
    description: "基于预建的文件名数据库查找，速度远快于 find，但需要先执行 updatedb 更新索引，新文件可能查不到。",
    syntax: "locate [选项] 关键词",
    options: [
      ["-i", "忽略大小写"],
      ["-c", "只输出匹配数量"],
      ["-l N", "最多输出 N 条结果"]
    ],
    examples: [
      ["locate nginx.conf", "查找所有名为 nginx.conf 的文件"],
      ["locate -i readme", "忽略大小写查找 readme 相关文件"]
    ]
  },
  {
    name: "tree",
    category: "文件与目录",
    summary: "以树状图显示目录结构",
    description: "按树形层级直观展示目录内容，适合浏览项目结构（部分发行版需单独安装）。",
    syntax: "tree [选项] [目录]",
    options: [
      ["-L N", "只显示 N 层深度"],
      ["-a", "包含隐藏文件"],
      ["-d", "只显示目录"],
      ["-h", "同时显示文件大小"]
    ],
    examples: [
      ["tree -L 2", "查看当前目录两层深度的树状结构"],
      ["tree -d", "只显示目录层级"]
    ]
  },
  {
    name: "stat",
    category: "文件与目录",
    summary: "显示文件的详细状态信息",
    description: "输出文件大小、inode、权限、属主、各类时间戳等元数据。",
    syntax: "stat [选项] 文件",
    options: [
      ["-c 格式", "按自定义格式输出，如 %s 为大小、%y 为修改时间"],
      ["-f", "显示所在文件系统的信息"]
    ],
    examples: [
      ["stat file.txt", "查看文件完整状态信息"],
      ["stat -c '%s bytes, modified at %y' file.txt", "只输出大小和修改时间"]
    ]
  },
  {
    name: "file",
    category: "文件与目录",
    summary: "识别文件类型",
    description: "通过文件内容特征判断真实类型（如文本、图片、可执行文件），而不是只看扩展名。",
    syntax: "file [选项] 文件...",
    options: [
      ["-b", "不输出文件名，只显示类型"],
      ["-i", "输出 MIME 类型"]
    ],
    examples: [
      ["file unknown.bin", "识别文件的真实类型"],
      ["file -i logo.png", "输出文件的 MIME 类型"]
    ]
  },
  {
    name: "realpath",
    category: "文件与目录",
    summary: "输出文件的绝对路径",
    description: "解析相对路径和符号链接，打印最终的真实绝对路径。",
    syntax: "realpath [选项] 路径",
    options: [
      ["-m", "路径不存在时也进行规范化输出"],
      ["-s", "不解析符号链接，只做字符串规范化"]
    ],
    examples: [
      ["realpath ./scripts/run.sh", "得到脚本的绝对路径"],
      ["realpath /usr/bin/python", "查看软链接指向的真实路径"]
    ]
  }
];
