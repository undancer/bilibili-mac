# bilibili-mac
 Bilibili 官方桌面版 macOS 移植
### 生成步骤
  1. 下载官方windows版（https://app.bilibili.com/）
  2. 只提取app.asar文件（手工完成）
  3. 解压app.asar到app文件夹下（自动完成）
     1. app文件夹刚好是electron-builder打包工具默认的目录结构
  4. 使用electron-builder重新打包（指令：`yarn run build`）
  5. 配置github actions来实现自动发布功能（预发布，需人工审核）
     1. 注意：未签名

## 参考:
  - https://github.com/HongyuS/Bilibili-Mac
  - https://app.bilibili.com/
  - https://www.electron.build/tutorials/two-package-structure
  - https://www.electron.build/icons
  - https://github.com/marketplace/actions/electron-builder-action