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
    description: "CommandLine URL 的缩写，支持 HTTP、HTTPS、FTP 等 30 余种协议，凡是能在浏览器里做的事情，几乎都能用 curl 在终端完成：抓网页源码、下载文件、调试接口、带 Cookie 或身份认证请求等。",
    syntax: "curl [选项] URL",
    options: [
      ["-o 文件", "把响应写入指定文件"],
      ["-O", "保留远程文件的原始文件名保存"],
      ["-I", "只获取 HTTP 响应头信息"],
      ["-X 方法", "指定请求方法，如 -X POST、-X DELETE"],
      ["-H '头: 值'", "自定义请求头信息"],
      ["-d 数据", "以 POST 方式发送数据"],
      ["-G", "以 GET 方式传送数据"],
      ["-u 用户:密码", "设置服务器认证的用户名和密码"],
      ["-T 文件", "上传指定文件"],
      ["-C -", "断点续传"],
      ["-A 字符串", "设置用户代理（User-Agent）"],
      ["-b 字符串", "设置 Cookie 信息"],
      ["-e URL", "设置来源网址（Referer）"],
      ["-f", "连接失败时不显示错误信息"],
      ["-D 文件", "把响应头信息写入指定文件"],
      ["-s", "静默模式，不显示进度与错误"],
      ["-L", "自动跟随重定向"],
      ["-K 文件", "读取指定的配置文件"],
      ["--connect-timeout N", "设置连接的最大等待秒数"],
      ["--limit-rate 200k", "限制传输速度"],
      ["--max-redirs N", "设置最大重定向次数"],
      ["--progress-bar", "以进度条显示传输进度"],
      ["--verbose", "显示详细的执行过程"],
      ["--basic / --digest", "使用 HTTP 基本认证 / 摘要认证"]
    ],
    examples: [
      ["curl https://www.example.com", "获取网页源码"],
      ["curl -O https://example.com/docs/book.pdf", "下载文件并保留原始文件名"],
      ["curl -o page.html https://example.com", "下载页面到文件"],
      ["curl -I https://example.com", "只查看 HTTP 响应头"],
      ["curl -s https://api.github.com/repos/octocat/Hello-World", "请求 JSON 接口"],
      ["curl -X POST -H 'Content-Type: application/json' -d '{\"name\":\"tom\"}' https://api.example.com/users", "发送 JSON 请求"],
      ["curl -u linuxprobe:redhat ftp://ftp.example.com/pub/book.pdf", "带用户名密码下载 FTP 文件"],
      ["curl --connect-timeout 5 -O https://example.com/big.iso", "限制连接超时后下载文件"]
    ]
  },
  {
    name: "wget",
    category: "网络通信",
    summary: "非交互式网络下载工具",
    description: "web get 的缩写，从指定网址下载网络文件。即使网络波动也会不断尝试重连直至下载完成，因此在脚本与后台任务中非常稳定。",
    syntax: "wget [选项] URL",
    options: [
      ["-O 文件", "保存为指定文件名"],
      ["-P 目录", "把文件保存到指定前缀目录"],
      ["-c", "断点续传"],
      ["-b", "后台下载，日志写入 wget-log"],
      ["-q", "静默模式，不输出信息"],
      ["-v", "显示执行过程详细信息"],
      ["-r", "递归下载（慎用，可能抓取整个站点）"],
      ["-l N", "设置递归的最大目录深度"],
      ["-nd", "递归下载时不创建目录"],
      ["-N", "只下载比本地更新的文件"],
      ["-t N", "设置最大尝试次数"],
      ["-T N", "设置最长的等待时间（秒）"],
      ["-w N", "设置两次请求之间的等待间隔（秒）"],
      ["-S", "显示服务器响应信息"],
      ["-a 文件", "把日志追加写入指定文件"],
      ["-o 文件", "把日志写入指定文件"],
      ["-i 文件", "下载文件中所列出的所有链接"],
      ["-4 / -6", "使用 IPv4 / IPv6 网络协议"],
      ["--limit-rate=200k", "限制下载速度为 200KB/s"],
      ["--spider", "仅检查文件是否存在，不下载"],
      ["--user / --password", "设置认证的用户名与密码"],
      ["--ask-password", "提示输入密码"],
      ["--no-proxy", "禁止使用代理"],
      ["--random-wait", "下载多个文件时随机等待间隔"]
    ],
    examples: [
      ["wget https://example.com/file.zip", "下载文件"],
      ["wget -c -O latest.tar.gz https://example.com/archive.tar.gz", "断点续传并重命名"],
      ["wget --limit-rate=300k https://example.com/big.iso", "限速 300KB/s 下载"],
      ["wget -b https://example.com/big.iso", "后台下载，日志写入 wget-log"],
      ["wget --spider https://example.com/file.zip", "仅检查文件是否存在"],
      ["wget -i urls.txt", "批量下载文件中列出的所有链接"]
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
    description: "secure copy 的缩写，基于 SSH 协议在本地与远程主机之间加密复制文件或目录，用法类似 cp。目录需加 -r，端口用大写 -P 指定。",
    syntax: "scp [选项] 源路径 目标路径",
    options: [
      ["-r", "递归复制目录"],
      ["-P 端口", "指定 SSH 端口（注意大写 P）"],
      ["-p", "保留文件的修改时间、访问时间和权限属性"],
      ["-i 密钥文件", "指定私钥"],
      ["-C", "传输时启用压缩"],
      ["-l 速率", "限制带宽（Kbit/s）"],
      ["-o 选项", "设置 SSH 选项，如 StrictHostKeyChecking=no"],
      ["-B", "使用批处理模式，不询问口令"],
      ["-q", "静默模式，不显示进度"],
      ["-c 算法", "指定传输加密算法"],
      ["-F 文件", "指定 SSH 配置文件路径"],
      ["-S 程序", "指定加密传输所使用的程序"],
      ["-4 / -6", "使用 IPv4 / IPv6 网络协议"]
    ],
    examples: [
      ["scp File.cfg 192.168.10.10:/Dir", "上传文件到远程主机目录"],
      ["scp 192.168.10.10:/Dir/File.cfg /root", "从远程主机下载文件到本地"],
      ["scp -r Dir 192.168.10.10:/Dir", "递归上传整个目录"],
      ["scp -r 192.168.10.10:/Dir /root", "递归下载远程目录"],
      ["scp -p File.cfg linuxprobe@192.168.10.10:/Dir", "指定用户上传并保留原始权限属性"],
      ["scp -P 2222 file.txt user@host:/tmp/", "通过非默认 SSH 端口上传"]
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
  },
  {
    name: "route",
    category: "网络通信",
    summary: "查看和管理内核 IPv4 路由表",
    description: "传统的路由表管理命令，属于 net-tools 套件。新系统推荐改用 ip route，但很多老脚本和旧发行版仍在用 route。",
    syntax: "route [选项] [add|del] [目标] [gw 网关]",
    options: [
      ["-n", "以数字形式显示地址与端口，不做反向解析"],
      ["-e", "显示更详细的路由信息"],
      ["-C", "查看路由缓存"],
      ["add", "添加一条路由"],
      ["del", "删除一条路由"],
      ["-net / -host", "指定目标为网段 / 单台主机"],
      ["gw 网关", "指定下一跳网关地址"],
      ["-A inet / inet6", "指定地址族为 IPv4 / IPv6"]
    ],
    examples: [
      ["route -n", "以数字形式查看路由表"],
      ["sudo route add -net 192.168.2.0/24 gw 192.168.1.1", "添加网段路由"],
      ["sudo route del default gw 192.168.1.1", "删除默认路由"],
      ["ip route show", "推荐替代方案：用 ip route 查看路由"]
    ]
  },
  {
    name: "nmcli",
    category: "网络通信",
    summary: "NetworkManager 命令行工具（网卡、连接、bond）",
    description: "管理 NetworkManager 中的网络连接与网卡，可以查看设备状态、启停连接、配置静态 IP，也能创建 bond（网卡绑定）等高级网络。日常维护网卡时非常常用。",
    syntax: "nmcli [对象] [子命令] [参数]",
    options: [
      ["device status", "查看所有网卡设备及其连接状态"],
      ["connection show", "列出所有网络连接配置"],
      ["connection up/down 名称", "启用/停用指定连接"],
      ["connection modify", "修改连接的 IP、DNS、网关等参数"],
      ["connection add", "新建连接或 bond 等虚拟设备"],
      ["general status", "查看 NetworkManager 整体状态"],
      ["radio wifi on/off", "开关 Wi-Fi 无线功能"],
      ["-p", "以更易读的表格形式输出（pretty）"]
    ],
    examples: [
      ["nmcli device status", "查看网卡设备状态"],
      ["nmcli connection show", "查看所有网络连接"],
      ["sudo nmcli connection up 'Wired connection 1'", "启用指定连接"],
      ["sudo nmcli connection up ens33", "启用指定网卡"],
      ["sudo nmcli connection modify ens33 ipv4.addresses 192.168.10.20/24 ipv4.gateway 192.168.10.1 ipv4.method manual", "配置静态 IP 地址"],
      ["sudo nmcli connection add type bond con-name bond0 ifname bond0 mode active-backup", "创建 active-backup 模式的 bond 网卡"]
    ]
  }
];
