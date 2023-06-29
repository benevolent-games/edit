
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.js"
import {Context} from "../context.js"
import {OutlinerManager} from "../../tools/outliner-manager.js"
import {recursively_load_folders} from "./utils/recursively_load_folders.js"

export const EditOutliner = (context: Context) => class extends QuickElement {
	static styles = style
	#outliner_manager: OutlinerManager

	constructor() {
		super()
		this.#outliner_manager = new OutlinerManager()
	}

	render() {

		const root_folder = context.folders.value
		const publish = () => context.folders.publish()

		return html`
		<h1>Outliner</h1>
			<div class=folders>
				<div class=root-folder>
					<div
						draggable="true"
						@dragend=${() => this.#outliner_manager.drag_folder_end()}
						@dragover=${(e: DragEvent) => e.preventDefault()}
						@drop=${() => this.#outliner_manager.drag_folder_drop(root_folder, publish)}
						class=root-folder-header>
						<p>${root_folder.name}</p>
						<span @pointerdown=${(e: PointerEvent) => {
							const rootFolder = (e.target as HTMLElement).closest(".root-folder")
							rootFolder?.toggleAttribute("data-opened")
						}}>-
						</span>
						<span @pointerdown=${() => root_folder.create_folder(root_folder, publish)}>
							+
						</span>
					</div>
					<div class=folder-objects>
						${root_folder.instances.map(instance => html`
							<p>${instance.name}</p>
						`)}
					</div>
					${recursively_load_folders(root_folder, publish, this.#outliner_manager)}
				</div>
			</div>
		`
	}
}
