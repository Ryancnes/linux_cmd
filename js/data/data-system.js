// 分类：系统与硬件信息
const DATA_SYSTEM = [
  {
    name: "uname",
    category: "系统与硬件信息",
    summary: "显示系统内核与架构信息",
    description: "输出内核名称、主机名、内核版本、硬件架构等系统基本信息。",
    syntax: "uname [选项]",
    options: [
      ["-a", "显示全部信息"],
      ["-r", "显示内核版本"],
      ["-m", "显示硬件架构（如 x86_64、aarch64）"],
      ["-s", "显示内核名称"]
    ],
    examples: [
      ["uname -a", "查看完整系统信息"],
      ["uname -m", "确认 CPU 架构"],
      ["uname -r", "查看内核版本"]
    ]
  },
  {
    name: "hostnamectl",
    category: "系统与硬件信息",
    summary: "查看或修改主机名",
    description: "systemd 系统上的主机名管理工具，可查看当前主机名、系统版本等。",
    syntax: "hostnamectl [选项]",
    options: [
      ["set-hostname 名称", "修改主机名"],
      ["status", "显示主机名和系统信息（默认动作）"]
    ],
    examples: [
      ["hostnamectl", "查看主机名与系统信息"],
      ["sudo hostnamectl set-hostname web-01", "修改主机名"]
    ]
  },
  {
    name: "uptime",
    category: "系统与硬件信息",
    summary: "显示系统运行时间和负载",
    description: "显示当前时间、系统已运行时长、登录用户数以及 1/5/15 分钟平均负载。",
    syntax: "uptime",
    options: [
      ["-p", "以更友好的格式显示运行时长"]
    ],
    examples: [
      ["uptime", "查看系统负载"],
      ["uptime -p", "查看已运行时长"]
    ]
  },
  {
    name: "date",
    category: "系统与硬件信息",
    summary: "显示或设置系统日期时间",
    description: "显示当前时间，也支持按格式字符串输出自定义格式，如 %Y-%m-%d。",
    syntax: "date [选项] [+格式]",
    options: [
      ["-u", "显示 UTC 时间"],
      ["-d 字符串", "显示指定时间，如 'tomorrow'、'2026-01-01'"],
      ["+%Y-%m-%d", "自定义输出格式（见 man date）"],
      ["-s 时间", "设置系统时间（需 root）"]
    ],
    examples: [
      ["date", "查看当前时间"],
      ["date +'%Y-%m-%d %H:%M:%S'", "按指定格式输出"],
      ["date -d '2026-09-09 12:00' +%s", "转换为 Unix 时间戳"],
      ["date -u", "查看 UTC 时间"]
    ]
  },
  {
    name: "cal",
    category: "系统与硬件信息",
    summary: "在终端显示日历",
    description: "以文本形式显示当前月或指定年月的日历。",
    syntax: "cal [选项] [月份] [年份]",
    options: [
      ["-y", "显示整年日历"],
      ["-3", "显示上月、本月和下月"]
    ],
    examples: [
      ["cal", "显示当月日历"],
      ["cal -y 2026", "显示 2026 年全年日历"],
      ["cal 12 2026", "显示 2026 年 12 月"]
    ]
  },
  {
    name: "free",
    category: "系统与硬件信息",
    summary: "查看内存使用情况",
    description: "显示物理内存和交换分区的总量、已用、可用情况，-h 以人类可读单位显示。",
    syntax: "free [选项]",
    options: [
      ["-h", "以 K/M/G 人类可读格式显示"],
      ["-s N", "每隔 N 秒刷新一次"],
      ["-m", "以 MB 为单位显示"]
    ],
    examples: [
      ["free -h", "以易读格式查看内存"],
      ["watch -n 2 free -h", "持续观察内存变化"]
    ]
  },
  {
    name: "who",
    category: "系统与硬件信息",
    summary: "显示当前登录系统的用户",
    description: "列出已登录用户、登录终端和时间；-b 可查看系统最近一次启动时间。",
    syntax: "who [选项]",
    options: [
      ["-b", "显示系统最近启动时间"],
      ["-q", "只显示用户名和数量"],
      ["-H", "带表头显示"]
    ],
    examples: [
      ["who", "查看谁在登录系统"],
      ["who -b", "查看系统启动时间"]
    ]
  },
  {
    name: "w",
    category: "系统与硬件信息",
    summary: "显示登录用户及其正在执行的命令",
    description: "比 who 更详细：同时显示系统负载、每个用户登录时长和当前活动。",
    syntax: "w [选项] [用户名]",
    options: [
      ["-h", "不显示表头"],
      ["-f", "不显示登录来源主机"]
    ],
    examples: [
      ["w", "查看所有登录用户的活动"]
    ]
  },
  {
    name: "dmesg",
    category: "系统与硬件信息",
    summary: "查看内核环形缓冲区日志",
    description: "显示内核启动及运行期间的信息，排查硬件识别、驱动加载等问题时使用。",
    syntax: "dmesg [选项]",
    options: [
      ["-H", "分页彩色显示，便于阅读"],
      ["-T", "把时间显示为人类可读格式"],
      ["-w", "持续跟踪新日志"],
      ["-l 级别", "按日志级别过滤，如 err、warn"]
    ],
    examples: [
      ["dmesg | tail", "查看最近的内核日志"],
      ["dmesg -T | grep -i usb", "查看 USB 设备相关日志"],
      ["sudo dmesg -w", "实时跟踪内核日志"]
    ]
  },
  {
    name: "journalctl",
    category: "系统与硬件信息",
    summary: "查询 systemd 日志",
    description: "集中查看 systemd 管理的服务日志，支持按服务、时间、优先级过滤。",
    syntax: "journalctl [选项]",
    options: [
      ["-u 服务名", "查看指定 systemd 服务日志"],
      ["-f", "实时跟踪新日志"],
      ["-b", "只看本次启动以来的日志"],
      ["-p err", "只看 err 及以上级别日志"],
      ["--since '1 hour ago'", "查看最近 1 小时的日志"],
      ["-n 50", "只显示最后 50 行"]
    ],
    examples: [
      ["journalctl -u nginx -n 100", "查看 nginx 服务最近 100 行日志"],
      ["journalctl -f", "实时跟踪系统日志"],
      ["journalctl -p err -b", "查看本次启动以来的错误日志"],
      ["journalctl --since yesterday -u sshd", "查看昨天 sshd 的日志"]
    ]
  },
  {
    name: "systemctl",
    category: "系统与硬件信息",
    summary: "管理 systemd 服务与系统状态",
    description: "现代 Linux 发行版的服务管理入口：启动、停止、查看服务，以及管理开机自启。",
    syntax: "systemctl [子命令] [服务名]",
    options: [
      ["start/stop/restart", "启动/停止/重启服务"],
      ["enable/disable", "设置/取消开机自启"],
      ["status", "查看服务状态与最近日志"],
      ["list-units", "列出已加载的服务单元"],
      ["daemon-reload", "重新加载服务配置文件"],
      ["is-active 服务", "检查服务是否运行中"]
    ],
    examples: [
      ["sudo systemctl start nginx", "启动 nginx 服务"],
      ["sudo systemctl enable --now nginx", "设置开机自启并立即启动"],
      ["systemctl status nginx", "查看服务状态"],
      ["sudo systemctl restart docker", "重启 docker 服务"]
    ]
  },
  {
    name: "lscpu",
    category: "系统与硬件信息",
    summary: "显示 CPU 架构信息",
    description: "从 /proc/cpuinfo 等来源汇总 CPU 型号、核心数、线程数、架构等详细信息。",
    syntax: "lscpu",
    options: [
      ["-e", "以表格显示每个 CPU 的详细信息"],
      ["-p", "输出便于脚本解析的格式"]
    ],
    examples: [
      ["lscpu", "查看 CPU 信息"],
      ["lscpu | grep '^CPU(s)'", "快速查看核心数量"]
    ]
  },
  {
    name: "arch",
    category: "系统与硬件信息",
    summary: "显示系统硬件架构",
    description: "输出机器架构名称，与 uname -m 等价。",
    syntax: "arch",
    options: [],
    examples: [
      ["arch", "输出如 x86_64 或 aarch64"]
    ]
  },
  {
    name: "tty",
    category: "系统与硬件信息",
    summary: "显示当前终端设备路径",
    description: "输出当前终端对应的设备文件，如 /dev/pts/0。",
    syntax: "tty",
    options: [
      ["-s", "安静模式，只返回退出码"]
    ],
    examples: [
      ["tty", "查看当前终端设备"]
    ]
  },
  {
    name: "lsusb",
    category: "系统与硬件信息",
    summary: "列出 USB 设备",
    description: "显示连接到系统的 USB 设备（部分版本需安装 usbutils）。",
    syntax: "lsusb [选项]",
    options: [
      ["-t", "以树状显示 USB 总线结构"],
      ["-v", "显示详细信息"]
    ],
    examples: [
      ["lsusb", "列出 USB 设备"],
      ["lsusb -t", "查看 USB 拓扑"]
    ]
  }
];
