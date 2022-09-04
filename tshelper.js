const sequelizeModelContent = `
interface Model {
    query(sql: string, options?: object): Promise;
    transaction(autoCallback: (t: any) => Promise<any>): Promise;
}
`
function selfGenerator2(config) {
  if (!config.modelMap) {
    throw 'modelMap must not be undefined'
  }

  const modelMap = {};
  Object.entries(config.modelMap).forEach(item => {
    modelMap[item[0]] = {
      name: item[1],
      pathList: []
    }
  })
  const modelList = config.fileList.map(item => ({
    name: item.split('/')[0],
    path: item
  }));
  console.log(modelMap, modelList)
  for (let i = 0; i < modelList.length; ++i) {
    const map = modelMap[modelList[i].name];
    if (!map) {
      throw 'modelName must not be null';
    }
    map.pathList.push(modelList[i].path);
  }
  const importContent = [];
  const modelInterface = [];
  const modelContent = [];
  Object.entries(modelMap).forEach(([k, v]) => {
    const item = {
      name: v.name,
      contentList: []
    };
    modelContent.push(item);
    v.pathList.forEach(path => {
      const name = path[0].toUpperCase() + path.replace('/', '').slice(1, -3);
      importContent.push(`import Export${name} from '../../../${config.directory}/${path.slice(0, -3)}'`);
      item.contentList.push(`        ${path.split('/')[1].slice(0, -3)}: ReturnType<typeof Export${name}>;`);
    })
    modelInterface.push(`            ${v.name}: T_${v.name} & Model;`)
  })
  const content = `
${importContent.join('\n')}
${sequelizeModelContent}
declare module 'egg' {
    interface Context {
        model: {
${modelInterface.join('\n')}
        }
    }
${modelContent.map(item => {
    return `    interface T_${item.name} {
${item.contentList.join('\n')}
    }`
  }).join('\n')}
}
`;

  return {
    dist: config.dtsDir + '/index.d.ts',
    content
  }
}

module.exports = {
  watchDirs: {
    model: {
      directory: 'app/model',
      modelMap: {
        weixinThirdPlatform: "weixinThirdPlatformModel"
      },
      generator: selfGenerator2
    }
  }
}
