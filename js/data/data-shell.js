// 分类：Shell 与终端技巧
const DATA_SHELL = [
  {
    name: "echo",
    category: "Shell 与终端技巧",
    summary: "输出文本或变量值",
    description: "shell 内建命令，把参数打印到标准输出，脚本中最常用的输出方式。",
    syntax: "echo [选项] [文本]",
    options: [
      ["-n", "输出后不换行"],
      ["-e", "启用转义字符，如 \\n 换行、\\t 制表符"]
    ],
    examples: [
      ["echo 'Hello Linux'", "输出文本"],
      ["echo -e '第一行\\n第二行'", "输出带换行的多行文本"],
      ["echo \"PATH=$PATH\"", "输出环境变量值"]
    ]
  },
  {
    name: "printf",
    category: "Shell 与终端技巧",
    summary: "按格式输出文本",
    description: "比 echo 更可控的输出命令，支持 %s、%d、宽度补零等格式化，跨 shell 行为一致。",
    syntax: "printf '格式' [参数...]",
    options: [],
    examples: [
      ["printf '%s\\n' 'hello' 'world'", "每个参数输出一行"],
      ["printf '%05d\\n' 42", "输出补零的 5 位数字"],
      ["printf '%-10s %5.2f\\n' 'Tom' 3.14159", "对齐输出表格"]
    ]
  },
  {
    name: "export",
    category: "Shell 与终端技巧",
    summary: "设置并导出环境变量",
    description: "shell 内建命令，把变量导出到环境，使子进程也能继承该变量。",
    syntax: "export [变量名=值]",
    options: [
      ["-p", "列出当前已导出的环境变量"]
    ],
    examples: [
      ["export EDITOR=vim", "设置编辑器环境变量"],
      ["export PATH=\"$PATH:/opt/tools/bin\"", "追加目录到 PATH"],
      ["export -p", "查看所有环境变量"]
    ]
  },
  {
    name: "unset",
    category: "Shell 与终端技巧",
    summary: "删除 shell 变量或函数",
    description: "shell 内建命令，移除变量、函数或环境变量的定义。",
    syntax: "unset 变量名",
    options: [],
    examples: [
      ["unset TEMP_VAR", "删除临时变量"]
    ]
  },
  {
    name: "alias",
    category: "Shell 与终端技巧",
    summary: "给命令定义别名",
    description: "shell 内建命令，用简短名称替代长命令；写入 ~/.bashrc 可永久生效。",
    syntax: "alias [别名=命令]",
    options: [
      ["-p", "列出当前所有别名"]
    ],
    examples: [
      ["alias ll='ls -l'", "定义 ll 别名"],
      ["alias grep='grep --color=auto'", "让 grep 自动高亮"],
      ["alias -p", "查看已有别名"]
    ]
  },
  {
    name: "unalias",
    category: "Shell 与终端技巧",
    summary: "取消命令别名",
    description: "shell 内建命令，删除已定义的别名。",
    syntax: "unalias 别名名",
    options: [
      ["-a", "删除所有别名"]
    ],
    examples: [
      ["unalias ll", "取消 ll 别名"],
      ["unalias -a", "清除全部别名"]
    ]
  },
  {
    name: "history",
    category: "Shell 与终端技巧",
    summary: "查看命令历史",
    description: "shell 内建命令，显示输入过的命令；!N 可重放第 N 条命令。",
    syntax: "history [N]",
    options: [
      ["-c", "清空当前会话历史"],
      ["-d N", "删除第 N 条记录"]
    ],
    examples: [
      ["history", "查看命令历史"],
      ["history 20", "查看最近 20 条"],
      ["!123", "重新执行历史中第 123 条命令"]
    ]
  },
  {
    name: "which",
    category: "Shell 与终端技巧",
    summary: "定位命令的可执行文件路径",
    description: "在 PATH 中查找命令对应的可执行文件；找不到时返回非零退出码。",
    syntax: "which [选项] 命令名",
    options: [
      ["-a", "显示所有匹配路径（不只第一个）"]
    ],
    examples: [
      ["which python3", "查看 python3 所在路径"],
      ["which -a node", "查看 node 的所有候选路径"]
    ]
  },
  {
    name: "whereis",
    category: "Shell 与终端技巧",
    summary: "定位命令、源码和手册页位置",
    description: "在标准路径中查找命令的二进制、源码和 man 手册所在位置。",
    syntax: "whereis [选项] 命令名",
    options: [
      ["-b", "只查找二进制"],
      ["-m", "只查找手册页"]
    ],
    examples: [
      ["whereis ls", "查看 ls 的二进制和手册位置"],
      ["whereis -m curl", "只找 curl 的手册页"]
    ]
  },
  {
    name: "man",
    category: "Shell 与终端技巧",
    summary: "查看命令的官方手册",
    description: "Linux 最权威的命令文档；按 / 搜索、按 q 退出，章节 1 为命令、5 为配置文件格式。",
    syntax: "man [章节号] 命令名",
    options: [
      ["-k 关键词", "按关键词搜索手册（等价 apropos）"],
      ["-f 命令", "显示手册摘要（等价 whatis）"]
    ],
    examples: [
      ["man ls", "查看 ls 的手册"],
      ["man 5 crontab", "查看 crontab 文件格式说明"],
      ["man -k compress", "搜索与压缩相关的手册"]
    ]
  },
  {
    name: "help",
    category: "Shell 与终端技巧",
    summary: "查看 shell 内建命令的帮助",
    description: "bash 内建命令的帮助入口，查看如 cd、alias 等内建命令的用法。",
    syntax: "help [内建命令名]",
    options: [],
    examples: [
      ["help", "列出所有内建命令"],
      ["help cd", "查看 cd 的详细用法"]
    ]
  },
  {
    name: "source",
    category: "Shell 与终端技巧",
    summary: "在当前 shell 中执行脚本文件",
    description: "bash 内建命令（简写 .），在当前 shell 环境执行文件，常用于加载 ~/.bashrc 使配置立即生效。",
    syntax: "source 文件名",
    options: [],
    examples: [
      ["source ~/.bashrc", "重新加载 bash 配置"],
      [". ./env.sh", "用 . 简写执行脚本"]
    ]
  },
  {
    name: "env",
    category: "Shell 与终端技巧",
    summary: "显示环境变量或指定环境下运行命令",
    description: "不带参数时列出全部环境变量；也可临时为命令设置环境。",
    syntax: "env [选项] [变量=值 命令]",
    options: [
      ["-i", "以空环境启动命令"],
      ["-u 变量", "运行时移除指定变量"]
    ],
    examples: [
      ["env", "查看所有环境变量"],
      ["env | grep PATH", "过滤查看 PATH"],
      ["env LANG=en_US.UTF-8 ./app", "临时指定语言运行程序"]
    ]
  },
  {
    name: "read",
    category: "Shell 与终端技巧",
    summary: "从标准输入读取一行",
    description: "shell 内建命令，把用户输入或管道内容读入变量，是交互脚本的基础。",
    syntax: "read [选项] 变量名",
    options: [
      ["-p 提示", "输出提示文本"],
      ["-t 秒数", "等待输入的超时时间"],
      ["-s", "静默输入（不回显，适合密码）"]
    ],
    examples: [
      ["read -p '请输入姓名: ' name && echo \"你好, $name\"", "交互读取输入"],
      ["read -s -p 'Password: ' pwd", "静默读取密码"]
    ]
  },
  {
    name: "sleep",
    category: "Shell 与终端技巧",
    summary: "延迟指定时间",
    description: "让脚本或命令暂停 N 秒（支持小数），常用于等待服务就绪或限速。",
    syntax: "sleep 时间[后缀]",
    options: [],
    examples: [
      ["sleep 5", "暂停 5 秒"],
      ["sleep 0.5", "暂停半秒"],
      ["sleep 1m && echo done", "暂停 1 分钟后输出"]
    ]
  },
  {
    name: "clear",
    category: "Shell 与终端技巧",
    summary: "清空终端屏幕",
    description: "清除终端内容，等价快捷键 Ctrl+L（不会删除历史记录）。",
    syntax: "clear",
    options: [],
    examples: [
      ["clear", "清屏"]
    ]
  },
  {
    name: "seq",
    category: "Shell 与终端技巧",
    summary: "生成等差数字序列",
    description: "按指定步长生成从起始到结束的数字，常用于循环和批量操作。",
    syntax: "seq [选项] 起始 步长 结束",
    options: [
      ["-s 分隔符", "指定数字间分隔符，默认换行"],
      ["-w", "等宽补零"]
    ],
    examples: [
      ["seq 1 10", "生成 1 到 10"],
      ["seq 0 2 20", "生成 0 到 20 的偶数"],
      ["for i in $(seq 1 5); do echo \"file$i\"; done", "循环创建文件名的场景"]
    ]
  },
  {
    name: "bc",
    category: "Shell 与终端技巧",
    summary: "命令行计算器",
    description: "支持任意精度算术，配合管道可计算浮点表达式，适合脚本中使用。",
    syntax: "echo '表达式' | bc",
    options: [
      ["-l", "加载数学库（支持 sqrt、sin 等函数）"]
    ],
    examples: [
      ["echo '3.5 * 2' | bc", "计算浮点乘法"],
      ["echo 'scale=2; 10/3' | bc", "保留 2 位小数计算"],
      ["echo 'sqrt(144)' | bc -l", "计算平方根"]
    ]
  },
  {
    name: "yes",
    category: "Shell 与终端技巧",
    summary: "持续输出 y 或指定字符串",
    description: "无限重复输出参数（默认 y），可用于自动应答确认提示或灌入测试数据。",
    syntax: "yes [字符串]",
    options: [],
    examples: [
      ["yes | rm -r ./build", "自动确认删除（注意后果）"],
      ["yes | apt-get install -y nginx", "自动应答安装提示"]
    ]
  },
  {
    name: "shred",
    category: "Shell 与终端技巧",
    summary: "安全覆写删除文件内容",
    description: "多次覆写文件数据使其难以恢复，适合处理敏感文件；对 SSD/日志型文件系统效果有限。",
    syntax: "shred [选项] 文件",
    options: [
      ["-n N", "覆写 N 次（默认 3 次）"],
      ["-u", "覆写后删除文件"],
      ["-z", "最后用零覆写一遍"]
    ],
    examples: [
      ["shred -u secret.txt", "安全擦除并删除文件"],
      ["shred -n 7 -z secret.db", "覆写 7 次再加零覆写"]
    ]
  }
];
