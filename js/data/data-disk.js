// 分类：磁盘与文件系统
const DATA_DISK = [
  {
    name: "df",
    category: "磁盘与文件系统",
    summary: "查看文件系统的磁盘空间使用情况",
    description: "Disk Free，显示各挂载点总容量、已用、可用空间及使用率。",
    syntax: "df [选项] [挂载点或目录]",
    options: [
      ["-h", "以 K/M/G 人类可读格式显示"],
      ["-T", "同时显示文件系统类型"],
      ["-i", "显示 inode 使用情况"],
      ["-t 类型", "只显示指定类型的文件系统"]
    ],
    examples: [
      ["df -h", "查看磁盘空间使用"],
      ["df -h /var/log", "查看指定目录所在分区空间"],
      ["df -i", "检查 inode 是否耗尽"]
    ]
  },
  {
    name: "du",
    category: "磁盘与文件系统",
    summary: "统计文件或目录占用磁盘大小",
    description: "Disk Usage，递归统计目录下各文件/子目录占用的磁盘空间，常用于找大文件。",
    syntax: "du [选项] [目录或文件]",
    options: [
      ["-h", "人类可读显示"],
      ["-s", "只显示总计"],
      ["-a", "显示每个文件的大小"],
      ["-d N", "只统计到 N 层子目录"],
      ["--max-depth=N", "同上（GNU 写法）"],
      ["-x", "不跨文件系统统计"]
    ],
    examples: [
      ["du -sh /var/log", "查看目录总占用"],
      ["du -h --max-depth=1 /home | sort -h", "按大小排序查看各子目录占用"],
      ["du -ah /tmp | sort -h | tail", "找出最大的几个文件"]
    ]
  },
  {
    name: "mount",
    category: "磁盘与文件系统",
    summary: "挂载文件系统",
    description: "把设备、分区或镜像挂载到目录，访问前需挂载；修改挂载需要 root。",
    syntax: "mount [选项] 设备 挂载点",
    options: [
      ["-t 类型", "指定文件系统类型，如 ext4、ntfs"],
      ["-o 选项", "挂载选项，如 ro（只读）、noexec"],
      ["-a", "挂载 /etc/fstab 中所有条目"],
      ["-r", "只读挂载"],
      ["-v", "显示详细信息"]
    ],
    examples: [
      ["mount -t ext4 /dev/sdb1 /mnt/data", "挂载分区到目录"],
      ["mount -o ro /dev/sdc1 /mnt/backup", "只读挂载"],
      ["mount -a", "按 fstab 挂载全部设备"]
    ]
  },
  {
    name: "umount",
    category: "磁盘与文件系统",
    summary: "卸载文件系统",
    description: "安全卸载挂载点；若提示 busy，说明有进程正在使用，可用 lsof 或 fuser 定位。",
    syntax: "umount [选项] 挂载点或设备",
    options: [
      ["-l", "懒惰卸载：立即解除挂载，待无占用后彻底释放"],
      ["-f", "强制卸载"],
      ["-a", "卸载所有挂载（谨慎）"]
    ],
    examples: [
      ["umount /mnt/data", "卸载目录挂载"],
      ["umount -l /mnt/usb", "USB 被占用时懒惰卸载"]
    ]
  },
  {
    name: "fdisk",
    category: "磁盘与文件系统",
    summary: "磁盘分区管理工具",
    description: "交互式查看和修改分区表，支持 MBR 和 GPT（操作风险高，请先备份数据）。",
    syntax: "sudo fdisk [选项] 设备",
    options: [
      ["-l", "列出所有磁盘的分区表"],
      ["-u", "以扇区为单位显示"]
    ],
    examples: [
      ["sudo fdisk -l", "查看所有磁盘分区"],
      ["sudo fdisk /dev/sdb", "对 /dev/sdb 进行分区操作"]
    ]
  },
  {
    name: "lsblk",
    category: "磁盘与文件系统",
    summary: "以树状列出块设备",
    description: "List Block Devices，清晰展示磁盘、分区、挂载点之间的层次关系，是最安全的磁盘查看方式。",
    syntax: "lsblk [选项]",
    options: [
      ["-f", "同时显示文件系统类型和 UUID"],
      ["-p", "显示完整设备路径"],
      ["-o 字段", "自定义输出列，如 NAME,SIZE,MOUNTPOINT"],
      ["-m", "显示属主和权限"]
    ],
    examples: [
      ["lsblk", "查看磁盘和分区结构"],
      ["lsblk -f", "查看文件系统类型和 UUID"],
      ["lsblk -o NAME,SIZE,TYPE,MOUNTPOINT", "只看关心的字段"]
    ]
  },
  {
    name: "blkid",
    category: "磁盘与文件系统",
    summary: "查看块设备的 UUID 和文件系统类型",
    description: "显示分区的 UUID、类型和标签，写 /etc/fstab 时用 UUID 挂载更可靠。",
    syntax: "sudo blkid [设备]",
    options: [
      ["-s UUID", "只输出指定字段"],
      ["-o value", "只输出值，便于脚本处理"]
    ],
    examples: [
      ["sudo blkid", "查看所有设备的 UUID"],
      ["sudo blkid -s UUID -o value /dev/sda1", "只取 /dev/sda1 的 UUID"]
    ]
  },
  {
    name: "mkfs",
    category: "磁盘与文件系统",
    summary: "在分区上创建文件系统（格式化）",
    description: "格式化会清空分区数据，操作前务必确认设备和备份。mkfs.ext4 等是其子命令。",
    syntax: "sudo mkfs -t 类型 设备",
    options: [
      ["-t 类型", "指定文件系统类型，如 ext4、xfs、vfat"]
    ],
    examples: [
      ["sudo mkfs.ext4 /dev/sdb1", "格式化为 ext4"],
      ["sudo mkfs -t xfs /dev/sdc1", "格式化为 xfs"]
    ]
  },
  {
    name: "dd",
    category: "磁盘与文件系统",
    summary: "低级别复制数据（磁盘、镜像、文件）",
    description: "按块复制数据，可制作启动盘、备份分区、生成指定大小文件；方向写错会毁灭数据，务必小心。",
    syntax: "dd if=输入 of=输出 [选项]",
    options: [
      ["if=设备或文件", "指定输入源"],
      ["of=设备或文件", "指定输出目标"],
      ["bs=N", "块大小，如 bs=4M"],
      ["count=N", "只复制 N 个块"],
      ["status=progress", "显示复制进度"],
      ["conv=fsync", "写完后强制同步到磁盘"]
    ],
    examples: [
      ["sudo dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress", "制作 U 盘启动盘"],
      ["dd if=/dev/zero of=test.bin bs=1M count=100", "生成 100MB 测试文件"],
      ["sudo dd if=/dev/sda1 of=part.img bs=4M", "备份整个分区"]
    ]
  },
  {
    name: "sync",
    category: "磁盘与文件系统",
    summary: "把缓存中的脏数据写入磁盘",
    description: "强制将内存中尚未落盘的数据刷写（卸载磁盘前或拔盘前执行更安全）。",
    syntax: "sync",
    options: [],
    examples: [
      ["sync", "立即把所有待写数据同步到磁盘"]
    ]
  },
  {
    name: "fsck",
    category: "磁盘与文件系统",
    summary: "检查并修复文件系统错误",
    description: "File System Check，在卸载状态下检查分区一致性；运行中的分区一般不允许检查。",
    syntax: "sudo fsck [选项] 设备",
    options: [
      ["-f", "强制检查，即使看起来正常"],
      ["-y", "对修复提示自动回答 yes"],
      ["-N", "只显示将要执行的动作，不真正检查"]
    ],
    examples: [
      ["sudo fsck /dev/sdb1", "检查分区"],
      ["sudo fsck -fy /dev/sdb1", "强制检查并自动修复"]
    ]
  },
  {
    name: "parted",
    category: "磁盘与文件系统",
    summary: "GPT 分区管理工具",
    description: "支持 GPT 分区表的现代分区工具，可创建、调整和删除分区（风险高）。",
    syntax: "sudo parted [选项] 设备 [命令]",
    options: [
      ["print", "显示分区表"],
      ["mklabel gpt", "建立 GPT 分区表"],
      ["mkpart 名称 起始 结束", "创建分区"],
      ["-s", "脚本模式，不交互"]
    ],
    examples: [
      ["sudo parted /dev/sdb print", "查看磁盘分区表"],
      ["sudo parted -s /dev/sdb mklabel gpt", "把磁盘初始化为 GPT"]
    ]
  }
];
