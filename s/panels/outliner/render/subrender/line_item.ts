
import {TemplateResult, html} from "@benev/slate"

import {Dropzone} from "./utils/dropzone.js"
import {ItemMeta} from "../../utils/metas.js"
import {delete_item} from "../../behaviors/delete_item.js"
import {icon_feather_x} from "../../../../icons/groups/feather/x.js"

export function render_line_item(meta: ItemMeta, content: TemplateResult) {
	const {item, parents, isRoot, tools, drops} = meta
	const {dnd} = drops
	const isApparent = tools.isApparent(item.id)

	const is_deleteable = !isRoot

	return html`
		<li
			data-id="${item.id}"
			data-kind="${item.kind}"
			?data-visible="${item.visible}"
			?data-not-apparent="${!isApparent}"
			?data-selected="${item.selected}"
			@dragleave=${dnd.dropzone.dragleave()}>

			${Dropzone(meta, drops, item)}

			<div class=gutter-group>
				${parents.map(() => html`
					<span class=gutter></span>
				`)}
			</div>

			${content}

			${is_deleteable
				? html`
					<button class=delete @click=${() => delete_item(meta)}>
						${icon_feather_x}
					</button>
				`
				: html`
					<div class=spacer></div>
				`}
		</li>
	`
}

