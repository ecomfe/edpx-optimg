edpx-optimg
===========

### Usage

```
edp optimg                # 当前目录
edp optimg <dir> <file>   # 指定的文件或者目录
```

Windows平台下可以直接使用，*Nix需要安装optipng和jpegtran。

### Description

默认是不会对文件进行修改的，如果需要修改话，请添加`--force`参数。

背后使用的工具是：

1. <http://jpegclub.org/jpegtran/>
2. <http://optipng.sourceforge.net/>
3. <http://pngquant.org/>