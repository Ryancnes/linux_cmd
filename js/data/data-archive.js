// 分类：压缩与打包
const DATA_ARCHIVE = [
  {
    name: "tar",
    category: "压缩与打包",
    summary: "打包或解包文件（常配合 gzip/xz 压缩）",
    description: "Linux 最常用的归档工具。tar 本身只负责打包，加上 -z/-j/-J 参数可同时调用 gzip/bzip2/xz 压缩。",
    syntax: "tar [选项] 归档文件 [要处理的文件...]",
    options: [
      ["-c", "创建归档（打包）"],
      ["-x", "解包"],
      ["-t", "查看归档内容列表"],
      ["-z", "通过 gzip 压缩/解压（.tar.gz）"],
      ["-j", "通过 bzip2 压缩/解压（.tar.bz2）"],
      ["-J", "通过 xz 压缩/解压（.tar.xz）"],
      ["-v", "显示处理的文件"],
      ["-f", "指定归档文件名，通常放最后"],
      ["-C 目录", "解包到指定目录"],
      ["--exclude=模式", "打包时排除匹配文件"]
    ],
    examples: [
      ["tar -czvf app.tar.gz ./app", "打包 app 目录并 gzip 压缩"],
      ["tar -xzvf app.tar.gz", "解压 .tar.gz 包"],
      ["tar -tf app.tar.gz", "不解包，直接查看包内文件列表"],
      ["tar -xzf app.tar.gz -C /opt", "解压到 /opt 目录"]
    ]
  },
  {
    name: "gzip",
    category: "压缩与打包",
    summary: "以 gzip 格式压缩单个文件",
    description: "压缩后生成 .gz 文件并删除原文件，适合压缩单个大文件；多个文件先用 tar 打包。",
    syntax: "gzip [选项] 文件...",
    options: [
      ["-d", "解压（等价于 gunzip）"],
      ["-k", "保留原文件"],
      ["-r", "递归压缩目录中的文件"],
      ["-N", "压缩级别 1-9，数字越大压缩率越高、速度越慢"]
    ],
    examples: [
      ["gzip backup.sql", "压缩成 backup.sql.gz"],
      ["gzip -dk backup.sql.gz", "解压并保留原压缩文件"],
      ["gzip -9 large.log", "以最高压缩率压缩"]
    ]
  },
  {
    name: "gunzip",
    category: "压缩与打包",
    summary: "解压 .gz 文件",
    description: "gzip -d 的等价命令，解压后默认删除 .gz 文件。",
    syntax: "gunzip [选项] 文件.gz...",
    options: [
      ["-k", "解压后保留原 .gz 文件"],
      ["-c", "解压结果输出到标准输出而不写文件"]
    ],
    examples: [
      ["gunzip access.log.gz", "解压日志文件"],
      ["gunzip -c file.gz | less", "不解压直接分页查看内容"]
    ]
  },
  {
    name: "bzip2",
    category: "压缩与打包",
    summary: "以 bzip2 格式压缩（压缩率高于 gzip）",
    description: "生成 .bz2 文件，压缩率通常比 gzip 更高，但速度较慢。",
    syntax: "bzip2 [选项] 文件...",
    options: [
      ["-d", "解压"],
      ["-k", "保留原文件"],
      ["-N", "压缩级别 1-9"]
    ],
    examples: [
      ["bzip2 dump.sql", "压缩为 dump.sql.bz2"],
      ["bzip2 -d dump.sql.bz2", "解压"]
    ]
  },
  {
    name: "xz",
    category: "压缩与打包",
    summary: "以 xz 格式压缩（高压缩率）",
    description: "生成 .xz 文件，压缩率通常高于 gzip 和 bzip2，现代发行版常用它发布软件包。",
    syntax: "xz [选项] 文件...",
    options: [
      ["-d", "解压"],
      ["-k", "保留原文件"],
      ["-N", "压缩级别 0-9，级别越高压缩率越高"],
      ["-T N", "使用 N 个线程并行压缩"]
    ],
    examples: [
      ["xz kernel.tar", "压缩为 kernel.tar.xz"],
      ["xz -dk archive.tar.xz", "解压并保留原文件"],
      ["xz -9T 4 big.db", "用 4 线程最高压缩率压缩"]
    ]
  },
  {
    name: "zip",
    category: "压缩与打包",
    summary: "创建 zip 格式压缩包",
    description: "跨平台通用的压缩格式，可直接压缩多个文件或整个目录（需加 -r）。",
    syntax: "zip [选项] 压缩包.zip 文件或目录...",
    options: [
      ["-r", "递归包含目录"],
      ["-q", "安静模式，减少输出"],
      ["-e", "加密压缩"],
      ["-m", "压缩后删除原文件"]
    ],
    examples: [
      ["zip -r project.zip project/", "把目录压缩为 zip 包"],
      ["zip notes.zip a.txt b.txt", "压缩多个文件"],
      ["zip -r -e secret.zip docs/", "创建加密压缩包"]
    ]
  },
  {
    name: "unzip",
    category: "压缩与打包",
    summary: "解压 zip 格式压缩包",
    description: "解压 .zip 文件；也能只提取其中部分文件或查看压缩包列表。",
    syntax: "unzip [选项] 压缩包.zip [要提取的文件...]",
    options: [
      ["-l", "查看压缩包内文件列表，不解压"],
      ["-d 目录", "解压到指定目录"],
      ["-o", "覆盖已存在文件不提示"],
      ["-P 密码", "用密码解压加密包"]
    ],
    examples: [
      ["unzip app.zip", "解压到当前目录"],
      ["unzip app.zip -d /opt/app", "解压到指定目录"],
      ["unzip -l app.zip", "查看压缩包内容"]
    ]
  },
  {
    name: "zcat",
    category: "压缩与打包",
    summary: "直接查看 .gz 压缩文件内容",
    description: "把 gzip 压缩文件解压后输出到终端，不解压到磁盘，适合快速查看压缩日志。",
    syntax: "zcat 文件.gz",
    options: [],
    examples: [
      ["zcat app.log.gz | grep error", "在压缩日志中直接搜索 error"],
      ["zcat data.gz | head -5", "查看压缩文件前几行"]
    ]
  }
];
