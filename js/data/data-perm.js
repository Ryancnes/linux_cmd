// 分类：权限与用户管理
const DATA_PERM = [
  {
    name: "chmod",
    category: "权限与用户管理",
    summary: "修改文件或目录的访问权限",
    description: "以符号（u/g/o/a + rwx）或数字（如 755、644）方式设置权限；目录的可执行位表示是否允许进入。",
    syntax: "chmod [选项] 权限 文件或目录...",
    options: [
      ["-R", "递归修改目录下所有文件"],
      ["-v", "显示修改过程"],
      ["-c", "只显示发生变化的文件"]
    ],
    examples: [
      ["chmod 755 script.sh", "属主可读写执行，组和其他人可读执行"],
      ["chmod +x script.sh", "给文件添加执行权限"],
      ["chmod -R g+w ./data", "递归给目录下文件加上组写权限"],
      ["chmod u=rwx,go=rx file", "符号方式：属主全权限，其他人只读执行"]
    ]
  },
  {
    name: "chown",
    category: "权限与用户管理",
    summary: "修改文件或目录的属主和属组",
    description: "格式为“属主:属组”，只有 root 或具有相应权限的用户才能修改归属。",
    syntax: "chown [选项] 属主[:属组] 文件或目录...",
    options: [
      ["-R", "递归修改"],
      ["-v", "显示修改过程"],
      ["-h", "修改符号链接本身而非其指向的目标"]
    ],
    examples: [
      ["chown alice file.txt", "把文件属主改为 alice"],
      ["chown alice:developers app/", "把目录属主和属组一并修改"],
      ["chown -R www-data:www-data /var/www", "递归修改网站目录归属"]
    ]
  },
  {
    name: "chgrp",
    category: "权限与用户管理",
    summary: "修改文件或目录的属组",
    description: "只修改属组，相当于 chown :组名；需要相应权限。",
    syntax: "chgrp [选项] 组名 文件或目录...",
    options: [
      ["-R", "递归修改"],
      ["-v", "显示修改过程"]
    ],
    examples: [
      ["chgrp developers app.jar", "把文件属组改为 developers"]
    ]
  },
  {
    name: "umask",
    category: "权限与用户管理",
    summary: "设置新建文件的默认权限掩码",
    description: "shell 内建命令，决定新建文件/目录的默认权限。如 umask 022 表示新建文件默认 644、目录默认 755。",
    syntax: "umask [掩码]",
    options: [
      ["-S", "以符号形式显示当前掩码"]
    ],
    examples: [
      ["umask", "查看当前掩码"],
      ["umask 077", "设置较严格的掩码，新文件仅属主可读写"],
      ["umask -S", "以 rwx 符号形式显示"]
    ]
  },
  {
    name: "sudo",
    category: "权限与用户管理",
    summary: "以其他用户（默认 root）身份执行命令",
    description: "授权用户执行管理员命令，比直接切到 root 更安全，所有操作可审计。",
    syntax: "sudo [选项] 命令",
    options: [
      ["-i", "以目标用户身份启动登录 shell"],
      ["-u 用户名", "以指定用户身份执行"],
      ["-l", "查看当前用户可执行的 sudo 权限"],
      ["-k", "使缓存的凭证立即失效"]
    ],
    examples: [
      ["sudo apt update", "以管理员权限更新软件源"],
      ["sudo -u www-data id", "以 www-data 用户身份执行命令"],
      ["sudo -i", "切换到 root 登录 shell"]
    ]
  },
  {
    name: "su",
    category: "权限与用户管理",
    summary: "切换用户身份",
    description: "不指定用户名时切换到 root（需要密码），适合在终端中完整切换会话。",
    syntax: "su [选项] [用户名]",
    options: [
      ["-", "切换后同时加载目标用户的完整环境"],
      ["-c 命令", "以目标用户身份执行单条命令"]
    ],
    examples: [
      ["su - alice", "切换到 alice 用户并加载其环境"],
      ["su -c 'systemctl status nginx'", "以 root 身份执行单条命令"]
    ]
  },
  {
    name: "whoami",
    category: "权限与用户管理",
    summary: "显示当前用户名",
    description: "输出当前有效用户的用户名，常用于确认身份。",
    syntax: "whoami",
    options: [],
    examples: [
      ["whoami", "输出当前用户名，如 root"]
    ]
  },
  {
    name: "id",
    category: "权限与用户管理",
    summary: "显示当前用户的 UID、GID 和所属组",
    description: "查看用户身份编号和组信息，排查权限问题时很有用。",
    syntax: "id [选项] [用户名]",
    options: [
      ["-u", "只显示 UID"],
      ["-g", "只显示主组 GID"],
      ["-G", "显示所有组 ID"],
      ["-n", "用名称而非数字显示"]
    ],
    examples: [
      ["id", "查看当前用户身份"],
      ["id www-data", "查看 www-data 用户的 UID 和组"]
    ]
  },
  {
    name: "useradd",
    category: "权限与用户管理",
    summary: "创建新用户",
    description: "创建用户账号，通常配合 -m 同时创建主目录（Debian/Ubuntu 默认加 -m 才会建目录）。",
    syntax: "useradd [选项] 用户名",
    options: [
      ["-m", "创建主目录并复制默认配置"],
      ["-s shell", "指定登录 shell，如 /bin/bash"],
      ["-G 组名", "把用户加入附加组，多个组用逗号分隔"],
      ["-u N", "指定 UID"],
      ["-e 日期", "设置账号过期日期"]
    ],
    examples: [
      ["sudo useradd -m -s /bin/bash alice", "创建用户并生成主目录"],
      ["sudo useradd -m -G docker dev", "创建用户并加入 docker 组"],
      ["sudo passwd alice", "接着为用户设置密码"]
    ]
  },
  {
    name: "userdel",
    category: "权限与用户管理",
    summary: "删除用户账号",
    description: "删除用户；-r 会同时删除其主目录和邮件目录，操作不可恢复，请谨慎。",
    syntax: "userdel [选项] 用户名",
    options: [
      ["-r", "连同主目录和邮件目录一起删除"],
      ["-f", "强制删除，即使该用户还在登录"]
    ],
    examples: [
      ["sudo userdel alice", "仅删除账号，保留主目录"],
      ["sudo userdel -r alice", "删除账号及主目录"]
    ]
  },
  {
    name: "usermod",
    category: "权限与用户管理",
    summary: "修改已有用户账号的属性",
    description: "修改用户的组、shell、主目录、锁定状态等；修改后需用户重新登录生效。",
    syntax: "usermod [选项] 用户名",
    options: [
      ["-aG 组名", "追加用户到附加组（必须带 -a 才能避免覆盖）"],
      ["-s shell", "更改登录 shell"],
      ["-d 目录", "更改主目录"],
      ["-l 新名", "修改用户名"],
      ["-L", "锁定账号"],
      ["-U", "解锁账号"]
    ],
    examples: [
      ["sudo usermod -aG sudo alice", "把 alice 加入 sudo 组"],
      ["sudo usermod -s /bin/zsh alice", "更改用户的登录 shell"],
      ["sudo usermod -L alice", "锁定账号，禁止登录"]
    ]
  },
  {
    name: "passwd",
    category: "权限与用户管理",
    summary: "修改用户密码",
    description: "普通用户只能修改自己的密码；root 可以修改任意用户密码或锁定账号。",
    syntax: "passwd [选项] [用户名]",
    options: [
      ["-l", "锁定用户（root 可用）"],
      ["-u", "解锁用户"],
      ["-d", "删除密码，使账号无需密码登录（危险）"],
      ["-e", "强制用户下次登录时修改密码"]
    ],
    examples: [
      ["passwd", "修改当前用户密码"],
      ["sudo passwd alice", "root 重置 alice 的密码"],
      ["sudo passwd -e alice", "强制 alice 下次登录改密"]
    ]
  },
  {
    name: "groups",
    category: "权限与用户管理",
    summary: "显示用户所属的组",
    description: "列出指定用户（默认当前用户）所属的全部组。",
    syntax: "groups [用户名]",
    options: [],
    examples: [
      ["groups", "查看当前用户所属组"],
      ["groups alice", "查看 alice 所属组"]
    ]
  },
  {
    name: "getent",
    category: "权限与用户管理",
    summary: "查询系统数据库条目（用户、组、主机等）",
    description: "从 NSS 配置的数据库（/etc/passwd、/etc/group、DNS 等）统一查询，比直接读文件更准确。",
    syntax: "getent 数据库 关键词",
    options: [],
    examples: [
      ["getent passwd alice", "按用户名查询账号信息"],
      ["getent group developers", "查询组信息"],
      ["getent hosts example.com", "查询主机名解析结果"]
    ]
  }
];
