module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度（网页3、网页5方案）
      unitPrecision: 5, // 转换精度（网页4推荐）
      viewportUnit: 'vw', // 目标单位
      selectorBlackList: ['.ignore', '.van-'], // 忽略转换的选择器（网页3方案）
      minPixelValue: 1, // 最小转换值（网页1参数）
      mediaQuery: false, // 媒体查询不转换（网页5建议）
      exclude: /node_modules/, // 排除第三方库（网页3实践）
    },
  },
}
