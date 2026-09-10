// 分类：文件与目录
const DATA_FILE = [
  {
    name: "ls",
    category: "文件与目录",
    summary: "列出目录中的文件和子目录",
    description: "最常用的目录列举命令。ls -l 输出的每一列依次是：文件类型与权限、硬链接数、属主、属组、大小、时间、文件名。",
    syntax: "ls [选项] [文件或目录...]",
    options: [
      ["-a", "显示所有文件，包括以 . 开头的隐藏文件"],
      ["-A", "显示除 . 和 .. 之外的所有文件"],
      ["-l", "以长格式显示详细信息（权限、链接数、属主、属组、大小、时间）"],
      ["-h", "配合 -l 使用，以 K/M/G 等人类可读方式显示大小"],
      ["-d", "只列出目录本身，不进入目录"],
      ["-i", "显示文件的 inode 编号"],
      ["-n", "以数字形式显示用户和组 ID，而非名称"],
      ["-F", "在名称后附加类型符号（/ 表示目录，* 表示可执行文件）"],
      ["-r", "逆序输出"],
      ["-R", "递归列出所有子目录内容"],
      ["-S", "按文件大小排序（大的在前）"],
      ["-t", "按修改时间排序（新的在前）"],
      ["-u", "按访问时间排序并显示 atime"],
      ["-1", "每行只输出一个文件名"],
      ["--color=auto", "按文件类型着色显示（never / always / auto）"],
      ["--full-time", "显示完整的时间戳信息"]
    ],
    examples: [
      ["ls -lh", "以人类可读大小查看当前目录文件"],
      ["ls -la /etc", "查看 /etc 目录全部文件，含隐藏文件"],
      ["ls -lt | head", "查看最近修改的几个文件"],
      ["ls -Sl /home", "按文件大小排序查看 /home"],
      ["ls /dev/sd*", "结合通配符查看所有 sd 开头的设备"],
      ["ls -l | grep '.txt'", "配合管道筛选出 .txt 文件"]
    ]
  },
  {
    name: "pwd",
    category: "文件与目录",
    summary: "显示当前所在的工作目录",
    description: "Print Working Directory，输出当前 shell 所在位置的绝对路径。",
    syntax: "pwd",
    options: [
      ["-L", "显示逻辑路径（默认，保留符号链接形式）"],
      ["-P", "显示物理路径，解析掉符号链接"]
    ],
    examples: [
      ["pwd", "输出当前目录的绝对路径"],
      ["pwd -P", "查看解析符号链接后的真实路径"]
    ]
  },
  {
    name: "cd",
    category: "文件与目录",
    summary: "切换当前工作目录",
    description: "shell 内建命令，进入指定目录；路径可用绝对或相对写法，不带参数时回到用户主目录。",
    syntax: "cd [目录]",
    options: [
      ["-L", "切换到符号链接所在的目录（默认行为）"],
      ["-P", "切换到符号链接对应的实际物理目录"],
      ["-", "回到上一次所在目录"],
      ["~", "进入当前用户的主目录"]
    ],
    examples: [
      ["cd /var/log", "进入 /var/log 目录"],
      ["cd ..", "返回上一级目录"],
      ["cd ~", "回到当前用户的家目录"],
      ["cd -", "切换到上次所在目录"]
    ]
  },
  {
    name: "mkdir",
    category: "文件与目录",
    summary: "创建新目录",
    description: "创建目录；目标已存在时不会覆盖而是提示。配合 -p 可以一次性创建多级目录，父目录缺失也能自动建好。",
    syntax: "mkdir [选项] 目录名...",
    options: [
      ["-p", "递归创建多级目录，如 mkdir -p a/b/c"],
      ["-m", "创建时直接设置权限，如 mkdir -m 700 dir"],
      ["-v", "显示创建过程"],
      ["-z", "设置目录的 SELinux 安全上下文"]
    ],
    examples: [
      ["mkdir project", "创建单个目录 project"],
      ["mkdir dir5 dir6 dir7", "一次创建多个目录"],
      ["mkdir -p src/components/ui", "一次性创建多级目录"],
      ["mkdir -m 700 private", "创建权限为 700 的私有目录（仅属主可读写执行）"],
      ["mkdir -p /dir8/dir1/dir2/dir3/dir4", "在根目录下一次性创建多级嵌套目录"]
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
    description: "创建空文件或修改时间戳。文件不存在时创建空文件；已存在时更新其时间戳。涉及三种时间：atime（最后被读取）、mtime（内容最后被修改）、ctime（元数据最后被更改）。",
    syntax: "touch [选项] 文件...",
    options: [
      ["-a", "只修改访问时间"],
      ["-m", "只修改修改时间"],
      ["-c", "文件不存在时不创建"],
      ["-d", "指定日期时间字符串，如 -d \"2023-06-28 08:31\""],
      ["-t", "按 [[CC]YY]MMDDhhmm[.ss] 格式指定时间，如 202301011200.30"],
      ["-r", "以参考文件的时间戳为准，如 touch -r doc.txt file"]
    ],
    examples: [
      ["touch README.md", "创建空文件 README.md"],
      ["touch File{1..5}.txt", "结合花括号扩展一次创建 5 个空文件"],
      ["touch -d '2023-06-28 08:31' file.txt", "把时间修改为指定日期时间"],
      ["touch -t 202301011200.30 112.txt", "精确设置时间戳到秒"],
      ["touch -r doc.txt 112.txt", "让 112.txt 的时间戳与 doc.txt 一致"],
      ["touch -a file.txt", "只更新文件的访问时间"]
    ]
  },
  {
    name: "cp",
    category: "文件与目录",
    summary: "复制文件或目录",
    description: "复制文件或目录，常用于备份。复制目录必须加 -r，否则会报错；保留权限与归属信息时用 -a。",
    syntax: "cp [选项] 源文件 目标文件（或目标目录）",
    options: [
      ["-a", "归档模式，等价于 -dpr 组合，常用于备份"],
      ["-r", "递归复制整个目录"],
      ["-p", "保留权限、属主和时间戳等属性"],
      ["-d", "复制符号链接本身，而不是它指向的文件"],
      ["-i", "目标已存在时先询问确认"],
      ["-f", "目标已存在时直接覆盖（cp 默认别名含 -i，必要时用 \\cp 绕过）"],
      ["-b", "覆盖前先为目标文件创建备份"],
      ["-l", "为目标建立硬链接，而不是复制文件"],
      ["-s", "为目标建立软链接，而不是复制文件"],
      ["-u", "仅当源文件更新时才覆盖"],
      ["-n", "不覆盖已存在的文件"],
      ["-v", "显示复制过程"]
    ],
    examples: [
      ["cp app.py backup/app.py", "复制单个文件"],
      ["cp -r project /backup/project", "递归复制整个目录"],
      ["cp -a /home/user /backup", "归档复制，保留所有权限与归属信息"],
      ["cp a.txt b.txt /etc/", "一次复制多个文件到指定目录"],
      ["\\cp -f test.txt /etc/", "绕过 cp -i 别名，强制覆盖（也可用 /bin/cp）"]
    ]
  },
  {
    name: "mv",
    category: "文件与目录",
    summary: "移动文件或目录，也可用于重命名",
    description: "移动或重命名文件与目录：在同一目录内移动相当于重命名。移动目录不需要 -r（这点与 cp 不同）。注意：如果目标路径不存在，会把源文件重命名成该路径名。",
    syntax: "mv [选项] 源文件 目标路径",
    options: [
      ["-i", "目标存在时询问确认"],
      ["-f", "强制覆盖，不询问"],
      ["-n", "不覆盖任何已存在的文件"],
      ["-b", "覆盖前先为目标文件创建备份"],
      ["-u", "目标较旧或不存在时才移动"],
      ["-v", "显示移动过程"],
      ["-Z", "设置文件安全上下文"]
    ],
    examples: [
      ["mv old.txt new.txt", "将 old.txt 重命名为 new.txt"],
      ["mv test new_test", "重命名目录"],
      ["mv *.log logs/", "把当前目录所有 .log 文件移动到 logs 目录"],
      ["mv a.txt b.txt new_test /home", "把多个文件与目录同时移动到 /home"],
      ["mv Dir1 /etc/Dir2", "移动目录并指定新的目录名"],
      ["mv -f test.txt /home/", "强制覆盖目标目录中的同名文件"]
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
