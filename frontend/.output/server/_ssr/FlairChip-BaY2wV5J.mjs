import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as flairById } from "./SiteHeader-ZlucwNc6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FlairChip-BaY2wV5J.js
var import_jsx_runtime = require_jsx_runtime();
function FlairChip({ id }) {
	const f = flairById(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flair-chip text-white",
		style: { backgroundColor: f.color },
		children: f.label
	});
}
//#endregion
export { FlairChip as t };
