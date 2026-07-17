globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/achievements-CVwoXST4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5d-D2WUt2UxHclKzifpYk7HtmeconI\"",
		"mtime": "2026-07-17T03:58:34.455Z",
		"size": 2653,
		"path": "../public/assets/achievements-CVwoXST4.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"3f64-Tjcmhzz1lKoqmODTmhgLwuhY1zI\"",
		"mtime": "2026-07-13T15:28:40.753Z",
		"size": 16228,
		"path": "../public/favicon.png"
	},
	"/assets/api-CucujLOL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19db-nAq75vqvv5dK57OiHioWdYPeAC8\"",
		"mtime": "2026-07-17T03:58:34.455Z",
		"size": 6619,
		"path": "../public/assets/api-CucujLOL.js"
	},
	"/assets/earn-DE97hWSc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a76-UnhapYX64/Y9s8kLH0Mb2fLsNvM\"",
		"mtime": "2026-07-17T03:58:34.456Z",
		"size": 2678,
		"path": "../public/assets/earn-DE97hWSc.js"
	},
	"/assets/drafts-DHq3Zsdc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a92-jKZrmKDcJH9SSgv/KCdwOQa+g9c\"",
		"mtime": "2026-07-17T03:58:34.456Z",
		"size": 2706,
		"path": "../public/assets/drafts-DHq3Zsdc.js"
	},
	"/assets/FlairChip-BIRwt2I8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-YyviShcLxe93RGFhbBkVCEcyANg\"",
		"mtime": "2026-07-17T03:58:34.454Z",
		"size": 248,
		"path": "../public/assets/FlairChip-BIRwt2I8.js"
	},
	"/assets/forgot-password-iMYiP8il.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a51-jUXt+ivwQ7xywzDtXsSUGXtlfWA\"",
		"mtime": "2026-07-17T03:58:34.457Z",
		"size": 2641,
		"path": "../public/assets/forgot-password-iMYiP8il.js"
	},
	"/assets/premium-BYY2xwwk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6d-nGXP5qKobzpaZNUDEz0aqtDU1Zw\"",
		"mtime": "2026-07-17T03:58:34.457Z",
		"size": 2925,
		"path": "../public/assets/premium-BYY2xwwk.js"
	},
	"/assets/flame-BFLqZ9Hn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-81lbQGiIB54eeSm28zIoeANXFQk\"",
		"mtime": "2026-07-17T03:58:34.456Z",
		"size": 186,
		"path": "../public/assets/flame-BFLqZ9Hn.js"
	},
	"/assets/link-FVTdYe2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"896c-PBbyVh1OYYhMeYZTWKCtLr3OxKg\"",
		"mtime": "2026-07-17T03:58:34.457Z",
		"size": 35180,
		"path": "../public/assets/link-FVTdYe2o.js"
	},
	"/assets/profile-CQk0ZrmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c41-4r+uIEBzt1DxROHkf1vu5WGD27s\"",
		"mtime": "2026-07-17T03:58:34.458Z",
		"size": 3137,
		"path": "../public/assets/profile-CQk0ZrmH.js"
	},
	"/assets/routes-Dh13QMZm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"502c-diBgngi6ceCx86SaMYDCxksPsXk\"",
		"mtime": "2026-07-17T03:58:34.458Z",
		"size": 20524,
		"path": "../public/assets/routes-Dh13QMZm.js"
	},
	"/assets/settings-CEjLKqso.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b98-91ptM1eX2xfS4jZSEL+3BsKwtFA\"",
		"mtime": "2026-07-17T03:58:34.459Z",
		"size": 2968,
		"path": "../public/assets/settings-CEjLKqso.js"
	},
	"/assets/SiteHeader-DZQu2IVt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16996-5GeVtBvWVBzzJbSBLYA5mPmrJeM\"",
		"mtime": "2026-07-17T03:58:34.455Z",
		"size": 92566,
		"path": "../public/assets/SiteHeader-DZQu2IVt.js"
	},
	"/assets/square-pen-uRtmyfcs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"133-0QAIOohqoM95LV+yE0XHuvOtX5E\"",
		"mtime": "2026-07-17T03:58:34.459Z",
		"size": 307,
		"path": "../public/assets/square-pen-uRtmyfcs.js"
	},
	"/public/favicon.png": {
		"type": "image/png",
		"etag": "\"3f64-Tjcmhzz1lKoqmODTmhgLwuhY1zI\"",
		"mtime": "2026-07-13T15:28:40.753Z",
		"size": 16228,
		"path": "../public/public/favicon.png"
	},
	"/assets/styles-DK0q4NR8.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13543-vWqV0fp8p/34pOyv5OZKpsWmR1E\"",
		"mtime": "2026-07-17T03:58:34.459Z",
		"size": 79171,
		"path": "../public/assets/styles-DK0q4NR8.css"
	},
	"/assets/index-iFMq2jSd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c1a4-PtE7cpKaOMIVpNqbE5mX93LqQP8\"",
		"mtime": "2026-07-17T03:58:34.454Z",
		"size": 311716,
		"path": "../public/assets/index-iFMq2jSd.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_NHe2l6 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_NHe2l6
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
