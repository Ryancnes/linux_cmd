// 分类：进程与任务管理
const DATA_PROCESS = [
  {
    name: "ps",
    category: "进程与任务管理",
    summary: "查看当前运行的进程快照",
    description: "Process Status，静态查看进程；配合 aux 或 -ef 可查看所有进程及 CPU、内存占用。",
    syntax: "ps [选项]",
    options: [
      ["-e / -A", "显示所有进程"],
      ["-f", "显示完整格式信息"],
      ["-u 用户名", "显示指定用户的进程"],
      ["aux", "BSD 风格：显示所有进程并带 CPU/内存占用"],
      ["-p PID", "查看指定 PID 的进程"],
      ["--sort=-%mem", "按内存占用降序排列"]
    ],
    examples: [
      ["ps aux", "查看所有进程"],
      ["ps aux | grep nginx", "查找 nginx 相关进程"],
      ["ps -ef --forest", "以树状缩进显示进程父子关系"],
      ["ps -p 1234 -o pid,cmd", "只查看指定 PID 的命令"]
    ]
  },
  {
    name: "top",
    category: "进程与任务管理",
    summary: "动态监控系统进程和资源占用",
    description: "实时刷新显示 CPU、内存、负载及各进程占用，交互式界面中按 q 退出。",
    syntax: "top [选项]",
    options: [
      ["-d N", "刷新间隔设为 N 秒"],
      ["-p PID", "只监控指定进程"],
      ["-o 字段", "按字段排序，如 -o %MEM"]
    ],
    examples: [
      ["top", "进入实时监控界面"],
      ["top -d 2", "每 2 秒刷新一次"],
      ["top -o %MEM", "按内存占用排序显示"]
    ]
  },
  {
    name: "htop",
    category: "进程与任务管理",
    summary: "增强版交互式进程监控",
    description: "比 top 更友好的彩色界面，支持鼠标操作、树状视图和直接管理进程（需单独安装）。",
    syntax: "htop [选项]",
    options: [
      ["-d N", "刷新间隔（秒）"],
      ["-u 用户名", "只显示指定用户进程"],
      ["-t", "以树状视图显示"]
    ],
    examples: [
      ["htop", "启动交互式监控"],
      ["sudo htop", "以 root 运行以查看所有进程并可直接 kill"]
    ]
  },
  {
    name: "pgrep",
    category: "进程与任务管理",
    summary: "按名称等条件查找进程 PID",
    description: "比 ps | grep 更精确，直接按进程名、用户等条件返回 PID，常用于脚本中。",
    syntax: "pgrep [选项] 进程名",
    options: [
      ["-l", "同时显示进程名"],
      ["-u 用户名", "限定用户"],
      ["-f", "匹配完整命令行"],
      ["-a", "显示 PID 和完整命令行"]
    ],
    examples: [
      ["pgrep -l nginx", "查找 nginx 进程并显示名称"],
      ["pgrep -u www-data php", "查找 www-data 用户运行的 php 进程"]
    ]
  },
  {
    name: "kill",
    category: "进程与任务管理",
    summary: "向进程发送信号",
    description: "默认发送 TERM 信号请求进程正常退出；加 -9 发送 KILL 强制终止。",
    syntax: "kill [信号] PID...",
    options: [
      ["-l", "列出所有信号名称"],
      ["-9", "强制杀死（KILL，不可被捕获）"],
      ["-15", "正常终止（TERM，默认）"]
    ],
    examples: [
      ["kill 1234", "请求 PID 1234 正常退出"],
      ["kill -9 1234", "强制终止 PID 1234"],
      ["kill -l", "查看可用信号列表"]
    ]
  },
  {
    name: "pkill",
    category: "进程与任务管理",
    summary: "按进程名或条件批量发送信号",
    description: "根据进程名、用户等条件匹配并发送信号，无需先查 PID。",
    syntax: "pkill [选项] 进程名",
    options: [
      ["-9", "强制终止"],
      ["-f", "匹配完整命令行"],
      ["-u 用户名", "只操作指定用户的进程"]
    ],
    examples: [
      ["pkill nginx", "向所有 nginx 进程发送 TERM"],
      ["pkill -9 -f 'python app.py'", "强制终止命令行匹配的进程"],
      ["pkill -u alice -f node", "终止 alice 运行的所有 node 进程"]
    ]
  },
  {
    name: "killall",
    category: "进程与任务管理",
    summary: "按进程名终止所有同名进程",
    description: "按名称匹配并终止所有相关进程；注意与 pkill 的匹配规则不同（killall 需要精确名）。",
    syntax: "killall [信号] 进程名...",
    options: [
      ["-9", "强制终止"],
      ["-i", "逐个确认"],
      ["-u 用户名", "只终止该用户的同名进程"],
      ["-r", "把名称当作正则表达式"]
    ],
    examples: [
      ["killall firefox", "关闭所有 firefox 进程"],
      ["sudo killall -9 chrome", "强制终止所有 chrome 进程"]
    ]
  },
  {
    name: "nice",
    category: "进程与任务管理",
    summary: "以指定优先级启动进程",
    description: "nice 值范围 -20 到 19，值越小优先级越高；普通用户只能调低优先级（正值）。",
    syntax: "nice -n 优先级 命令",
    options: [
      ["-n N", "设置 nice 值，如 -n 10 表示降低优先级"]
    ],
    examples: [
      ["nice -n 10 ./backup.sh", "以降级优先级启动备份任务，避免影响其他服务"],
      ["sudo nice -n -5 ./job.sh", "以较高优先级运行（需要 root）"]
    ]
  },
  {
    name: "renice",
    category: "进程与任务管理",
    summary: "修改运行中进程的优先级",
    description: "调整已运行进程的 nice 值，正值降低优先级，负值提高优先级（需 root）。",
    syntax: "renice 优先级 -p PID",
    options: [
      ["-p PID", "按进程号调整"],
      ["-u 用户名", "调整该用户所有进程"]
    ],
    examples: [
      ["renice 10 -p 1234", "把 PID 1234 的优先级调低"],
      ["sudo renice -5 -p 5678", "提高指定进程的优先级"]
    ]
  },
  {
    name: "jobs",
    category: "进程与任务管理",
    summary: "列出当前 shell 的后台任务",
    description: "shell 内建命令，显示当前会话中暂停或后台运行的任务及其编号。",
    syntax: "jobs [选项]",
    options: [
      ["-l", "同时显示任务对应的 PID"],
      ["-r", "只显示运行中的任务"],
      ["-s", "只显示已暂停的任务"]
    ],
    examples: [
      ["jobs -l", "查看后台任务及其 PID"]
    ]
  },
  {
    name: "bg",
    category: "进程与任务管理",
    summary: "把暂停的任务放到后台继续运行",
    description: "shell 内建命令，让 Ctrl+Z 暂停的任务在后台继续执行。",
    syntax: "bg [任务编号]",
    options: [],
    examples: [
      ["bg %1", "让 1 号任务在后台运行"],
      ["bg", "把最近暂停的任务放到后台"]
    ]
  },
  {
    name: "fg",
    category: "进程与任务管理",
    summary: "把后台任务调回前台运行",
    description: "shell 内建命令，把后台或暂停的任务切换到前台，可配合 Ctrl+C 终止、Ctrl+Z 暂停。",
    syntax: "fg [任务编号]",
    options: [],
    examples: [
      ["fg %1", "把 1 号任务调回前台"],
      ["fg", "把最近的后台任务调到前台"]
    ]
  },
  {
    name: "nohup",
    category: "进程与任务管理",
    summary: "让命令在退出终端后继续运行",
    description: "忽略挂断信号，命令在终端关闭后仍持续运行，输出默认写入 nohup.out。",
    syntax: "nohup 命令 [参数] > 输出文件 2>&1 &",
    options: [
      ["&", "把任务放到后台（配合使用）"]
    ],
    examples: [
      ["nohup ./server.sh &", "后台启动服务，退出终端也不中断"],
      ["nohup python app.py > app.log 2>&1 &", "后台运行并把日志写入文件"]
    ]
  },
  {
    name: "watch",
    category: "进程与任务管理",
    summary: "周期性地重复执行命令",
    description: "默认每 2 秒刷新一次并全屏显示命令输出，适合持续观察文件或状态变化。",
    syntax: "watch [选项] 命令",
    options: [
      ["-n N", "每隔 N 秒执行一次"],
      ["-d", "高亮显示两次输出之间的差异"]
    ],
    examples: [
      ["watch -n 1 free -h", "每秒观察一次内存变化"],
      ["watch -d ls -l /var/log", "高亮显示目录内容变化"],
      ["watch 'ps aux | grep nginx'", "周期性检查进程状态"]
    ]
  },
  {
    name: "timeout",
    category: "进程与任务管理",
    summary: "限制命令的运行时间",
    description: "在指定时间后终止命令，防止某个任务无限期挂起。",
    syntax: "timeout [选项] 秒数 命令",
    options: [
      ["-k N", "超时后先发 TERM，等 N 秒再发 KILL"],
      ["-s 信号", "指定发送的信号"]
    ],
    examples: [
      ["timeout 10 ping 8.8.8.8", "ping 最多运行 10 秒"],
      ["timeout -k 5 30 ./slow-task", "30 秒超时，5 秒后仍未退出则强杀"]
    ]
  },
  {
    name: "lsof",
    category: "进程与任务管理",
    summary: "列出打开的文件及相关进程",
    description: "List Open Files，可查看哪些进程占用某文件或端口，是排查“文件被占用”问题的利器。",
    syntax: "lsof [选项]",
    options: [
      ["-i :端口", "查看占用指定端口的进程"],
      ["-u 用户名", "列出该用户打开的文件"],
      ["+D 目录", "列出目录下被打开的文件"],
      ["-p PID", "列出指定进程打开的文件"]
    ],
    examples: [
      ["lsof -i :8080", "查看谁占用了 8080 端口"],
      ["lsof deleted", "找出被删除但仍被进程占用的文件"],
      ["lsof -u alice", "查看 alice 打开的所有文件"]
    ]
  },
  {
    name: "strace",
    category: "进程与任务管理",
    summary: "跟踪进程的系统调用和信号",
    description: "调试利器，可观察程序执行了哪些系统调用、读取了哪些文件，定位启动失败等疑难问题（需安装）。",
    syntax: "strace [选项] 命令",
    options: [
      ["-f", "同时跟踪子进程"],
      ["-e trace=open,read", "只跟踪指定系统调用"],
      ["-o 文件", "把输出写入文件"],
      ["-p PID", "附加到运行中的进程"]
    ],
    examples: [
      ["strace -f ./app", "跟踪程序及其子进程的系统调用"],
      ["strace -e trace=openat ./app 2>&1 | grep config", "找出程序尝试读取的文件"],
      ["sudo strace -p 1234 -o trace.log", "跟踪运行中进程并保存日志"]
    ]
  }
];
