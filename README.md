# bilibili-mac

Bilibili 官方桌面版 macOS 移植

### 生成步骤

1. 下载官方windows版（https://app.bilibili.com/）
2. 只提取app.asar文件（手工完成）
3. 解压app.asar到app文件夹下（自动完成）
    1. app文件夹刚好是electron-builder打包工具默认的目录结构
    2. 解压时对源码进行了小小的修改，主要针对目前代码不允许在Mac下运行的无奈之举
        1. [main] 使程序误以为自己运行的系统是windows
        2. [render] 将前端判断是否为windows或macOS的逻辑调换，使UI更友好
           > 之所以这么做，是因为main端没有macOS相关逻辑，而render端有
4. 使用electron-builder重新打包（指令：`yarn run build`）
5. 配置github actions来实现自动发布功能（预发布，需人工审核）
    1. 注意：未签名

## 参考:

- https://github.com/HongyuS/Bilibili-Mac
- https://mac.macsc.com/macosicons
- https://app.bilibili.com/
- https://www.electron.build/tutorials/two-package-structure
- https://www.electron.build/icons
- https://github.com/marketplace/actions/electron-builder-action
