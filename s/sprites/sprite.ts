
import {SVGTemplateResult, svg} from "lit"
import {id} from "./utils/svg_constants.js"
import {process_svg_into_instantiable_blob_url} from "./utils/process_svg.js"

export {svg}

export function sprite(template: SVGTemplateResult) {

	const {viewBox, width, height, url, className} = (
		process_svg_into_instantiable_blob_url(template)
	)

	return svg`
		<svg
			viewBox="${viewBox}"
			class="${className}"
			width="${width}"
			height="${height}">
			<use href="${url}#${id}"></use>
		</svg>
	`
}

// export function sprite(template: SVGTemplateResult) {
// 	return template
// }

