# Agenda
  - 为什么选择vim
  - vim现状
  - 编辑窗口简介
  - 模式编辑
  - dot与宏
  - 插件简介

<!--
  Note:
  刚学几个月, 有些内容可能不大准确^.^
  -->
  
  ---
  
# 为什么选择vim
  - 高度可定制化
  - 平台通用
  - 多语言支持
  - 可脚本化

  ---

# vim现状
  - vim 8.X（8.0发布于2016年9月）
    + 包管理
    + job control
  - neovim
    + 社区驱动，新的协作机制
    + 去除旧系统支持
    + 新的插件机制
<!--
  Note:
  大体上开发活跃，项目较健康，值的投资学一下。
  -->

  ---
  
  # 安装
  brew install vim --with-override-system-vi
  or
  brew install neovim
  
  ---

# 编辑窗口简介
  - buffer
  - window
  - tab

<!--
  Note:
  buffer文件在内存中的表示
  window是buffer的窗口/viewport, 一个buffer可以被多个window view
  tab是一种管理window的方式
  -->

  ---

# 模式编辑
  - insert mode
  - normal mode
  - visual mode
  - cmdline mode
    + : ex命令
    + /？搜索
    + !过滤
  - terminal mode
  - ex mode
    + Q进入，visual退出
    + 一般用来做批处理
  - select mode
    + 鼠标

<!--
  Note:
  ex是vi之前的行编辑器，是对ed的改进
  @: 重复ex命令
  -->

  ---

# normal mode
  - 移动光标
    + h,j,k,l
    + 行首0, 行尾$
    + 屏幕上(H)中(M)下(L)
    + gg文件头, G文件尾
    + 滚动 \<c-e\>, \<c-y\>
    + 翻页 \<c-f\>, \<c-b\>, \<c-d\>, \<c-u\>

  ---

  - 操作模式
    + {operator}{number}{motion}
  - operator
    + 删除 d
    + 修改 c
    + 复制 y

  ---

  - 搜索
    + 行内搜索 f/F
    + /|?

  ---

  - 文本对象
    用法: daw/diw, a, 包含space. i, 不包含space
    + w: 单词
    + p: 段落
    + s: 句子
    + t: html tag
    + "|'|`|(|[|{|<
    + 文本对象扩展
      + l: 行
      + a: 方法参数
      + i: indent
      + e: 整个文件
      + e.g.
        onoremap in( :\<c-u\>normal! f(vi(\<cr\>
<!--
  Note:
  重复的操作符表示对当前行操作，dd/cc/yy
  -->

  ---

# visual mode
  - 区别: 先选中再通过operator操作，选中文本
  - 三种可视模式
    + v: 面向字符的可视模式
    + V: 面向行的可视模式
    + \<C-v\>: 面向列的可视模式
<!--
  Note:
  o: 切换选区的活动端
  gv: 重选上次高亮选区
  只要可能最好用操作符命令，而不是可视模式
  -->

  ---

# cmdline mode 
  - ex命令
    + :q/:q!/:w/:wa
    + 快捷键
      * Ctrl-w/Ctrl-a/Ctrl-e/Ctrl-u/Ctrl-h/Ctrl-D/Alt-b/Alt-f
      * cnoremap
    + 历史记录 q:
    + 命令介绍
      * :normal 在指定范围上执行普通模式命令
      * :substitute
      
  ---
      
  - 搜索
    + /正向查找
    + ?反向查找
    + 历史记录 q/

---

  - filter 获取文本，传送到外部程序处理，再输出
    + sort

<!--
  Note:
  搜索
  1. 正则magic, nomagic, very magic
  指定范围
  1. 可视模式选择
  2. :{start},{end} e.g.  :.,5p  .代表当前行，$代表行尾，%代表整个文件
  -->

  ---

# terminal mode
  - :terminal
  - go to normal mode
    + \<c-\\>\<c-n\>
  - terminal buffer

---

# dot
  - 能重复哪些命令
    + 普通模式下的一次操作 (x, dd, \>\>)
    + 进入普通模式那一刻至退出普通模式
  - 试着让命令可被重复
  - dot + normal

---

# macro
  - q{register}, q开始/结束录制, @a 执行宏, @@重复上次执行的宏
  - 重放宏，10@q, 当动作指令失败时宏将终止执行
  - 串与并行执行, :.,.+2normal @q
  - 给宏追加命令，qq vs qQ
  - 编辑宏的内容, 寄存器

<!--
  Note:
  无名寄存器 "
  复制专用寄存器 0
  系统剪贴版 +
  表达式寄存器
-->

---

# plugin
  - plugin-manager, vim-plug
  - 配置
  	+ ~/.vimrc or ~/.config/nvim/init.vim
      * mapleader
      * autocmd/augroup
      * nnoremap
  - 编写插件
    + vimscript
    <!--
      * 变量
        1. let a=0
        2. 选项 let &textwidth = 100
        3. 本地选项 let &l:number = 1
        4. 作为变量的寄存器 let &a = 1
        5. 变量类型：Number/Float/String/列表
	  * 变量作用域
        1. 局部变量（字母冒号开头） let b:hello = "world"
	  * 流程控制
	  * 比较 （== ==？ ==#）
	  * 函数
        1. 函数名首字母大写
        2. 函数默认返回值为0
        3. 调用方式， call Foo(), 或者用在表达式中：echom Foo()  
        4. 函数参数 a:name
        5. 可变参数 a:000
        6. 函数参数不能赋值  
        7. 内置函数-->
    + 插件结构
    <!--
      * colors
      * plugin
      * ftdetect -- filetype相关的autocmd
      * ftplugin -- filetype相关
      * indent -- filetype indent相关
      * compiler
      * after
      * autoload -- 延迟插件
      * doc -->
    + node插件(nvim only)







  
