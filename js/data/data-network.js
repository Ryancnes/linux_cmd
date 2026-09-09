// 分类：网络通信
const DATA_NETWORK = [
  {
    name: "ping",
    category: "网络通信",
    summary: "测试主机连通性和网络延迟",
    description: "通过 ICMP 回显请求检测目标主机是否可达，并统计丢包率和往返时间。",
    syntax: "ping [选项] 目标主机",
    options: [
      ["-c N", "只发送 N 个包后停止"],
      ["-i N", "每隔 N 秒发送一个包"],
      ["-s N", "设置数据包大小（字节）"],
      ["-W N", "等待响应的超时秒数"]
    ],
    examples: [
      ["ping -c 4 baidu.com", "发送 4 个包测试连通性"],
      ["ping -c 10 -i 0.5 192.168.1.1", "快速连续测试内网网关"]
    ]
  },
  {
    name: "curl",
    category: "网络通信",
    summary: "命令行 HTTP 客户端，传输 URL 数据",
    description: "支持 HTTP/HTTPS/FTP 等多种协议，常用于接口调试、下载文件、发送请求。",
    syntax: "curl [选项] URL",
    options: [
      ["-o 文件", "把响应写入文件"],
      ["-O", "按 URL 中的文件名保存"],
      ["-I", "只获取响应头"],
      ["-X 方法", "指定请求方法，如 -X POST"],
      ["-H '头: 值'", "添加请求头"],
      ["-d 数据", "发送表单数据（自动转为 POST）"],
      ["-s", "安静模式，不显示进度"],
      ["-L", "跟随重定向"]
    ],
    examples: [
      ["curl -I https://example.com", "只查看响应头"],
      ["curl -o page.html https://example.com", "下载页面到文件"],
      ["curl -s https://api.github.com/repos/octocat/Hello-World", "请求 JSON 接口"],
      ["curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"tom\"}' https://api.example.com/users", "发送 JSON 请求"]
    ]
  },
  {
    name: "wget",
    category: "网络通信",
    summary: "非交互式网络下载工具",
    description: "适合在脚本中下载文件，支持断点续传、递归下载和后台下载。",
    syntax: "wget [选项] URL",
    options: [
      ["-O 文件", "保存为指定文件名"],
      ["-c", "断点续传"],
      ["-b", "后台下载，日志写入 wget-log"],
      ["-q", "安静模式"],
      ["--limit-rate=200k", "限制下载速度为 200KB/s"],
      ["-r", "递归下载（慎用，可能抓取整个站点）"]
    ],
    examples: [
      ["wget https://example.com/file.zip", "下载文件"],
      ["wget -c -O latest.tar.gz https://example.com/archive.tar.gz", "断点续传并重命名"],
      ["wget -b -q https://example.com/big.iso", "后台静默下载"]
    ]
  },
  {
    name: "ssh",
    category: "网络通信",
    summary: "远程登录服务器",
    description: "通过加密通道连接远程主机执行命令；支持密钥认证、端口转发等高级用法。",
    syntax: "ssh [选项] 用户@主机 [命令]",
    options: [
      ["-p 端口", "指定端口（默认 22）"],
      ["-i 密钥文件", "使用指定私钥认证"],
      ["-L 本地端口:目标:远端端口", "本地端口转发"],
      ["-v", "显示调试信息"],
      ["-N", "不执行远程命令，仅建立连接（常用于端口转发）"]
    ],
    examples: [
      ["ssh root@192.168.1.10", "登录远程服务器"],
      ["ssh -p 2222 alice@example.com", "指定端口登录"],
      ["ssh user@host 'uptime'", "远程执行单条命令"],
      ["ssh -L 8080:localhost:80 user@host", "把本地 8080 转发到远端 80 端口"]
    ]
  },
  {
    name: "scp",
    category: "网络通信",
    summary: "基于 SSH 的安全文件复制",
    description: "在本地与远程主机之间加密传输文件，用法类似 cp；目录需加 -r。",
    syntax: "scp [选项] 源路径 目标路径",
    options: [
      ["-r", "递归复制目录"],
      ["-P 端口", "指定 SSH 端口（注意大写 P）"],
      ["-i 密钥文件", "指定私钥"],
      ["-C", "传输时启用压缩"]
    ],
    examples: [
      ["scp file.txt user@host:/tmp/", "上传文件到远程"],
      ["scp user@host:/var/log/app.log ./", "从远程下载文件"],
      ["scp -r project/ user@host:/opt/", "递归上传整个目录"]
    ]
  },
  {
    name: "sftp",
    category: "网络通信",
    summary: "交互式安全文件传输",
    description: "基于 SSH 的文件传输会话，进入后可用 ls/cd/get/put 等命令浏览和传输文件。",
    syntax: "sftp 用户@主机",
    options: [
      ["-P 端口", "指定端口"],
      ["-b 文件", "批处理模式，从文件读取命令"]
    ],
    examples: [
      ["sftp alice@host", "进入交互式文件传输界面"],
      ["echo 'get /tmp/a.txt' | sftp -b - alice@host", "非交互式下载文件"]
    ]
  },
  {
    name: "rsync",
    category: "网络通信",
    summary: "高效同步和镜像文件",
    description: "只传输差异部分，支持本地、SSH 远程同步，是备份与部署的首选工具。",
    syntax: "rsync [选项] 源路径 目标路径",
    options: [
      ["-a", "归档模式，递归并保留属性（最常用）"],
      ["-v", "显示传输过程"],
      ["-z", "传输时压缩"],
      ["--delete", "删除目标端多余文件（镜像同步）"],
      ["--exclude=模式", "排除指定文件"],
      ["-n", "试运行，不真正传输"],
      ["--progress", "显示传输进度"],
      ["-e ssh", "通过 SSH 传输"]
    ],
    examples: [
      ["rsync -avz ./public/ user@host:/var/www/", "把本地目录同步到服务器"],
      ["rsync -av --delete /backup/ /mnt/disk/backup/", "本地镜像同步"],
      ["rsync -avn --exclude='*.tmp' ./src/ ./dst/", "试运行查看将同步哪些文件"]
    ]
  },
  {
    name: "ip",
    category: "网络通信",
    summary: "管理网络接口、地址和路由",
    description: "现代 Linux 的网络管理命令，替代旧的 ifconfig/route，功能更强大。",
    syntax: "ip [对象] [命令] [参数]",
    options: [
      ["addr / a", "查看或配置 IP 地址"],
      ["link", "查看或管理网络接口状态"],
      ["route / r", "查看或管理路由表"],
      ["neigh", "查看 ARP 邻居表"],
      ["-br", "简洁表格模式，如 ip -br addr"]
    ],
    examples: [
      ["ip addr show", "查看所有网卡及 IP"],
      ["ip -br addr", "简洁显示接口和地址"],
      ["sudo ip link set eth0 up", "启用网卡"],
      ["ip route show", "查看路由表"]
    ]
  },
  {
    name: "ss",
    category: "网络通信",
    summary: "查看网络套接字连接状态",
    description: "Socket Statistics，快速查看监听端口和连接，是 netstat 的现代替代品。",
    syntax: "ss [选项]",
    options: [
      ["-t", "只显示 TCP 连接"],
      ["-u", "只显示 UDP 连接"],
      ["-l", "只显示监听中的套接字"],
      ["-n", "显示数字地址和端口，不做反向解析"],
      ["-p", "显示占用进程"],
      ["-s", "显示连接统计摘要"]
    ],
    examples: [
      ["ss -tlnp", "查看所有监听端口及对应进程"],
      ["ss -tn state established", "查看已建立的 TCP 连接"],
      ["ss -s", "查看连接统计"]
    ]
  },
  {
    name: "netstat",
    category: "网络通信",
    summary: "显示网络连接、路由表和接口统计",
    description: "经典网络排查工具，在部分新系统已被 ss/ip 取代，但许多脚本仍在使用。",
    syntax: "netstat [选项]",
    options: [
      ["-t", "TCP 连接"],
      ["-u", "UDP 连接"],
      ["-l", "监听中的端口"],
      ["-n", "数字显示"],
      ["-p", "显示进程"],
      ["-r", "显示路由表"],
      ["-i", "显示接口统计"]
    ],
    examples: [
      ["netstat -tlnp", "查看监听端口"],
      ["netstat -rn", "查看路由表"],
      ["netstat -i", "查看网卡流量统计"]
    ]
  },
  {
    name: "dig",
    category: "网络通信",
    summary: "DNS 查询工具",
    description: "Domain Information Groper，查询域名解析记录，支持 A、MX、NS、CNAME 等类型。",
    syntax: "dig [选项] 域名 [记录类型]",
    options: [
      ["@服务器", "指定 DNS 服务器查询"],
      ["+short", "只输出简洁结果"],
      ["-t 类型", "指定记录类型，如 A、MX、TXT"]
    ],
    examples: [
      ["dig example.com", "查询 A 记录"],
      ["dig example.com MX", "查询邮件交换记录"],
      ["dig @8.8.8.8 example.com +short", "用 Google DNS 查询并简洁输出"]
    ]
  },
  {
    name: "nslookup",
    category: "网络通信",
    summary: "DNS 查询（交互式）",
    description: "老牌 DNS 查询工具，交互式或单次查询域名记录。",
    syntax: "nslookup 域名 [DNS服务器]",
    options: [],
    examples: [
      ["nslookup example.com", "查询域名解析"],
      ["nslookup example.com 8.8.8.8", "指定 DNS 服务器查询"]
    ]
  },
  {
    name: "traceroute",
    category: "网络通信",
    summary: "跟踪数据包到达目标的路由路径",
    description: "显示经过的每一跳路由及延迟，用于排查网络链路故障；部分系统需安装。",
    syntax: "traceroute [选项] 目标主机",
    options: [
      ["-n", "不做反向 DNS 解析，显示 IP"],
      ["-m N", "最大跳数（默认 30）"],
      ["-w N", "等待响应的秒数"]
    ],
    examples: [
      ["traceroute baidu.com", "跟踪到 baidu 的路由"],
      ["traceroute -n 8.8.8.8", "以纯 IP 形式跟踪"]
    ]
  },
  {
    name: "nc",
    category: "网络通信",
    summary: "多功能网络工具（netcat）",
    description: "能建立原始 TCP/UDP 连接，常用于端口探测、简易聊天、传输文件或测试服务（需安装）。",
    syntax: "nc [选项] 主机 端口",
    options: [
      ["-z", "只扫描端口是否开放，不发送数据"],
      ["-v", "显示详细信息"],
      ["-l", "进入监听模式，作为服务端"],
      ["-p 端口", "指定本地端口"],
      ["-u", "使用 UDP"]
    ],
    examples: [
      ["nc -zv 192.168.1.1 22", "探测主机 22 端口是否开放"],
      ["nc -l -p 9000 > received.txt", "监听 9000 端口接收文件"],
      ["echo hello | nc 192.168.1.5 9000", "向监听端发送数据"]
    ]
  },
  {
    name: "hostname",
    category: "网络通信",
    summary: "查看或设置主机名",
    description: "显示当前主机名；临时修改用 -s 或直接设置，永久修改建议用 hostnamectl。",
    syntax: "hostname [选项] [新主机名]",
    options: [
      ["-i", "显示主机的 IP 地址"],
      ["-s", "只显示短主机名"]
    ],
    examples: [
      ["hostname", "查看主机名"],
      ["hostname -i", "查看本机 IP"]
    ]
  }
];
