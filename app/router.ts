import { Application } from 'egg';
import { HwRouter } from './lib/hwRouter';

export default (app: Application) => {
	const { router, controller, config } = app;

	router.get(`/${config.third.ValidityFile}`, controller.wx.vaildateFile);

	// 自动注入路由
	HwRouter(app);
};
