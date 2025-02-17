rollup里面的配置
// html2canvas 只有极少数的页面使用了 所以要单独处理一下 第三方库分类打包
if (id.includes('html2canvas')) {
return 'html2canvas';
}

// 打包入口文件 根目录下的 index.html
// 也就是项目从哪个文件开始打包
input: {
index: fileURLToPath(new URL('./index.html', import.meta.url))
},
// external: ['moment', 'video.js', 'jspdf', 'xlsx', 'echart'],
// plugins: [visualizer({ open: true })], //globals
treeshake: {
preset: 'recommended',
manualPureFunctions: ['console.log']
},
// experimentalLogSideEffects: true,
output: {
experimentalMinChunkSize: 20 \* 1024
// manualChunks: (id: string) => {
// html2canvas 只有极少数的页面使用了 所以要单独处理一下 第三方库分类打包
if (id.includes('html2canvas')) {
return 'html2canvas';
}
// if (id.includes('node_modules')) {
// return 'vendor';
// }
// return 'index';
// }
}
// experimentalLogSideEffects: true,
treeshake: {
preset: 'recommended',
manualPureFunctions: ['console.log']
},
