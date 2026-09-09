// 分类：文件内容与文本处理
const DATA_TEXT = [
  {
    name: "cat",
    category: "文件内容与文本处理",
    summary: "连接并输出文件内容",
    description: "最简单的文件查看命令，也常用于合并文件或把内容送入管道。",
    syntax: "cat [选项] 文件...",
    options: [
      ["-n", "输出行号"],
      ["-b", "只给非空行编号"],
      ["-s", "压缩连续的空行为一行"],
      ["-A", "显示所有不可见字符（含行尾符）"]
    ],
    examples: [
      ["cat /etc/os-release", "查看系统版本信息"],
      ["cat a.txt b.txt > merged.txt", "合并两个文件"],
      ["cat -n file.txt", "带行号查看文件"]
    ]
  },
  {
    name: "tac",
    category: "文件内容与文本处理",
    summary: "逆序输出文件内容",
    description: "与 cat 相反，从最后一行开始逐行输出到第一行。",
    syntax: "tac 文件...",
    options: [],
    examples: [
      ["tac access.log | head", "查看日志最后写入的几行"]
    ]
  },
  {
    name: "less",
    category: "文件内容与文本处理",
    summary: "分页查看文件内容",
    description: "交互式分页阅读器，支持上下翻页与搜索，是查看大文件的首选。",
    syntax: "less [选项] 文件",
    options: [
      ["-N", "显示行号"],
      ["-S", "超长行不换行，可横向滚动"],
      ["-i", "搜索时忽略大小写"],
      ["+F", "类似 tail -f，实时跟踪文件追加内容"]
    ],
    examples: [
      ["less -N app.log", "带行号分页查看日志"],
      ["less +F app.log", "实时跟踪日志末尾"],
      ["cmd | less", "把任意命令输出分页查看"]
    ]
  },
  {
    name: "more",
    category: "文件内容与文本处理",
    summary: "简单分页查看文件",
    description: "较早期的分页命令，功能弱于 less；less 是它的增强版。",
    syntax: "more 文件",
    options: [
      ["+N", "从第 N 行开始显示"],
      ["-N", "每屏显示 N 行"]
    ],
    examples: [
      ["more /etc/passwd", "分页查看 passwd 文件"]
    ]
  },
  {
    name: "head",
    category: "文件内容与文本处理",
    summary: "查看文件开头部分",
    description: "默认输出前 10 行，可指定行数或字节数。",
    syntax: "head [选项] 文件",
    options: [
      ["-n N", "输出前 N 行"],
      ["-c N", "输出前 N 个字节"],
      ["-q", "多文件时不输出文件名标题"]
    ],
    examples: [
      ["head -n 20 file.txt", "查看文件前 20 行"],
      ["head -c 100 config.bin", "查看文件前 100 个字节"]
    ]
  },
  {
    name: "tail",
    category: "文件内容与文本处理",
    summary: "查看文件末尾部分",
    description: "默认输出最后 10 行；-f 可实时跟踪文件新增内容，是排查日志的利器。",
    syntax: "tail [选项] 文件",
    options: [
      ["-n N", "输出最后 N 行"],
      ["-f", "持续跟踪文件追加的新行（Ctrl+C 退出）"],
      ["-F", "更强的跟踪模式，文件被轮转后也能继续跟随"],
      ["-c N", "输出最后 N 个字节"]
    ],
    examples: [
      ["tail -n 50 app.log", "查看日志最后 50 行"],
      ["tail -f /var/log/syslog", "实时监控系统日志"],
      ["tail -F error.log", "文件被切割重建后仍持续跟踪"]
    ]
  },
  {
    name: "grep",
    category: "文件内容与文本处理",
    summary: "按模式搜索文本并输出匹配行",
    description: "Linux 最常用的文本搜索命令，支持正则表达式，常与管道配合过滤命令输出。",
    syntax: "grep [选项] 模式 [文件...]",
    options: [
      ["-i", "忽略大小写"],
      ["-r", "递归搜索目录"],
      ["-n", "输出匹配行时显示行号"],
      ["-v", "反选，输出不匹配的行"],
      ["-c", "只统计匹配行数"],
      ["-l", "只列出包含匹配内容的文件名"],
      ["-E", "使用扩展正则（等价 egrep）"],
      ["-A/-B/-C N", "同时输出匹配行之后/之前/前后 N 行"]
    ],
    examples: [
      ["grep -n 'error' app.log", "在日志中搜索 error 并显示行号"],
      ["grep -ri 'password' ./config", "递归且忽略大小写搜索"],
      ["ps aux | grep nginx", "过滤进程列表"],
      ["grep -E '^(http|https)://' urls.txt", "匹配以 http:// 或 https:// 开头的行"]
    ]
  },
  {
    name: "sed",
    category: "文件内容与文本处理",
    summary: "流编辑器：对文本做替换、删除、插入等处理",
    description: "逐行读取并处理文本，最常用于批量替换，也支持按行号或模式寻址。",
    syntax: "sed [选项] '脚本' 文件",
    options: [
      ["-i", "直接修改原文件（建议先备份）"],
      ["-e", "执行多个脚本"],
      ["-n", "安静模式，只输出被处理的行"],
      ["-E", "使用扩展正则"]
    ],
    examples: [
      ["sed 's/old/new/g' file.txt", "把每行所有 old 替换为 new 并输出"],
      ["sed -i.bak 's/foo/bar/g' config", "直接修改文件，并自动生成 .bak 备份"],
      ["sed -n '10,20p' file.txt", "只输出第 10 到 20 行"],
      ["sed '/^#/d' config", "删除所有以 # 开头的注释行"]
    ]
  },
  {
    name: "awk",
    category: "文件内容与文本处理",
    summary: "按列处理文本的编程式工具",
    description: "以行为单位读取、按分隔符切分为列，适合做统计、格式化与条件筛选，功能远不止于此。",
    syntax: "awk '模式 { 动作 }' 文件",
    options: [
      ["-F 分隔符", "指定字段分隔符，如 -F: 以冒号分隔"],
      ["-v 变量=值", "传入外部变量"]
    ],
    examples: [
      ["awk '{print $1, $3}' data.txt", "输出每行的第 1 和第 3 列"],
      ["awk -F: '{print $1}' /etc/passwd", "提取系统中的所有用户名"],
      ["awk '{sum += $1} END {print sum}' nums.txt", "对第一列求和"],
      ["awk '$3 > 90 {print $0}' scores.txt", "只输出第三列大于 90 的行"]
    ]
  },
  {
    name: "cut",
    category: "文件内容与文本处理",
    summary: "按列或字符范围截取文本",
    description: "按分隔符切出指定列，或按字节/字符位置截取，适合处理表格化文本。",
    syntax: "cut [选项] 文件",
    options: [
      ["-d 分隔符", "指定字段分隔符，默认制表符"],
      ["-f 列号", "取出第几列，如 -f1,3"],
      ["-c 范围", "按字符位置截取，如 -c1-10"]
    ],
    examples: [
      ["cut -d: -f1 /etc/passwd", "以冒号分隔并取出第一列"],
      ["echo 'a,b,c' | cut -d, -f2", "取出逗号分隔后的第 2 个字段"]
    ]
  },
  {
    name: "sort",
    category: "文件内容与文本处理",
    summary: "对文本行排序",
    description: "按字典序或数值排序，支持按列排序和逆序输出。",
    syntax: "sort [选项] 文件",
    options: [
      ["-n", "按数值大小排序"],
      ["-r", "逆序排序"],
      ["-k N", "按第 N 列排序"],
      ["-t 分隔符", "指定列分隔符"],
      ["-u", "去重后输出（与 uniq 不同，无需相邻）"]
    ],
    examples: [
      ["sort names.txt", "按字典序排序"],
      ["sort -n -r scores.txt", "按数值从大到小排序"],
      ["ps aux | sort -k3 -nr | head", "按 CPU 占用排序并取前几行"]
    ]
  },
  {
    name: "uniq",
    category: "文件内容与文本处理",
    summary: "去除相邻的重复行",
    description: "只对连续重复的行生效，因此通常先 sort 再 uniq，常用于统计唯一值。",
    syntax: "uniq [选项] 文件",
    options: [
      ["-c", "统计每行出现的次数"],
      ["-d", "只显示重复的行"],
      ["-u", "只显示不重复的行"]
    ],
    examples: [
      ["sort file.txt | uniq", "排序后去重"],
      ["sort file.txt | uniq -c", "统计每个值出现次数"],
      ["sort file.txt | uniq -c | sort -nr", "按出现次数从高到低排列"]
    ]
  },
  {
    name: "wc",
    category: "文件内容与文本处理",
    summary: "统计行数、单词数和字节数",
    description: "Word Count，默认依次输出行数、单词数、字节数和文件名。",
    syntax: "wc [选项] 文件",
    options: [
      ["-l", "只统计行数"],
      ["-w", "只统计单词数"],
      ["-c", "只统计字节数"],
      ["-m", "统计字符数"]
    ],
    examples: [
      ["wc -l file.txt", "统计文件行数"],
      ["cat *.log | wc -l", "统计多个日志文件总行数"]
    ]
  },
  {
    name: "tr",
    category: "文件内容与文本处理",
    summary: "转换或删除字符",
    description: "Translate，做字符级替换、删除或压缩，常配合管道处理文本。",
    syntax: "tr [选项] 字符集1 [字符集2]",
    options: [
      ["-d", "删除指定字符"],
      ["-s", "把连续重复字符压缩为一个"],
      ["-c", "取字符集补集"]
    ],
    examples: [
      ["echo hello | tr 'a-z' 'A-Z'", "转成大写"],
      ["cat file.txt | tr -s '\\n'", "压缩连续空行为一个换行"],
      ["tr -d '\\r' < win.txt > unix.txt", "删除 Windows 文件的回车符"]
    ]
  },
  {
    name: "diff",
    category: "文件内容与文本处理",
    summary: "逐行比较两个文件的差异",
    description: "输出两个文件的差异，常用于代码变更查看；-u 统一格式更易读，配合 patch 使用。",
    syntax: "diff [选项] 文件1 文件2",
    options: [
      ["-u", "以统一格式输出差异"],
      ["-r", "递归比较两个目录"],
      ["-q", "只报告文件是否不同"]
    ],
    examples: [
      ["diff -u old.conf new.conf", "以统一格式查看配置差异"],
      ["diff -rq dir1 dir2", "快速找出两个目录中不同的文件"]
    ]
  },
  {
    name: "tee",
    category: "文件内容与文本处理",
    summary: "把输出同时写到文件并显示在终端",
    description: "像 T 形管道一样把数据分流：一份写文件，一份继续输出，常用于边记录边查看日志。",
    syntax: "命令 | tee [选项] 文件",
    options: [
      ["-a", "追加写入而非覆盖"],
      ["-i", "忽略中断信号"]
    ],
    examples: [
      ["./build.sh 2>&1 | tee build.log", "把构建输出同时显示并保存到 build.log"],
      ["echo hello | tee -a log.txt", "追加写入日志"]
    ]
  },
  {
    name: "paste",
    category: "文件内容与文本处理",
    summary: "按列合并多个文件",
    description: "把多个文件逐行合并，默认以制表符连接成新行。",
    syntax: "paste [选项] 文件...",
    options: [
      ["-d 分隔符", "指定分隔符"],
      ["-s", "把每个文件的全部行合并为一行"]
    ],
    examples: [
      ["paste a.txt b.txt", "把两个文件逐行拼接"],
      ["paste -d, a.txt b.txt", "以逗号拼接"]
    ]
  },
  {
    name: "nl",
    category: "文件内容与文本处理",
    summary: "带行号输出文件",
    description: "Number Lines，输出文件并为每一行编号，等价于 cat -n 的更可控版本。",
    syntax: "nl [选项] 文件",
    options: [
      ["-ba", "所有行都编号"],
      ["-v N", "起始编号为 N"]
    ],
    examples: [
      ["nl -ba /etc/hosts", "为所有行添加行号输出"]
    ]
  },
  {
    name: "xargs",
    category: "文件内容与文本处理",
    summary: "把标准输入转换为命令参数",
    description: "将管道前一个命令的输出按行/空白切分，作为参数传给后续命令，解决参数过长等问题。",
    syntax: "前一个命令 | xargs [选项] 命令",
    options: [
      ["-n N", "每次最多使用 N 个参数"],
      ["-I {}", "用 {} 占位符替换参数位置"],
      ["-0", "按 NUL 字符切分，配合 find -print0 使用可安全处理含空格文件名"]
    ],
    examples: [
      ["find . -name '*.log' | xargs rm", "删除所有 .log 文件"],
      ["find . -name '*.png' -print0 | xargs -0 ls -l", "安全处理含空格的文件名"],
      ["echo '1 2 3' | xargs -n1 echo item:", "每个数字执行一次命令"]
    ]
  },
  {
    name: "od",
    category: "文件内容与文本处理",
    summary: "以八进制等格式转储文件内容",
    description: "查看文件的原始字节表示，排查不可见字符、BOM 或二进制结构时很有用。",
    syntax: "od [选项] 文件",
    options: [
      ["-c", "以可打印字符形式显示"],
      ["-A x", "以十六进制显示偏移地址"],
      ["-t x1", "每字节以十六进制显示"]
    ],
    examples: [
      ["od -c file.txt | head", "查看文件开头的每个字符"],
      ["od -A x -t x1z file.bin", "以十六进制加 ASCII 对照查看"]
    ]
  }
];
