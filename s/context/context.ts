
import {Context, prepare_frontend} from "@benev/slate"

import {theme} from "./theme.js"
import {actions} from "./actions.js"
import {State, default_state} from "./state.js"
import {Tactic} from "../tools/tactic/sketch.js"
import {Historian} from "./framework/historian.js"
import {Action} from "./framework/action_namespace.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import {Warehouse} from "./controllers/warehouse/warehouse.js"
import {Instantiator} from "./controllers/instantiator/instantiator.js"
import {Shockdrop} from "./controllers/shockdrop/shockdrop.js"

export class AppContext extends Context {
	theme = theme

	#action_specs = actions
	#app = this.watch.stateTree<State>(default_state())
	#historian = new Historian(
		this.watch,
		this.#app,
		this.#action_specs,
	)

	get state() {
		return this.#app.state
	}

	actions = Action.callers(
		this.#app,
		this.#historian,
		this.#action_specs,
	)

	renderLoop = new Set<() => void>()
	history = this.#historian.history
	babylon = new Babylon(this.renderLoop)
	// catalog = new Catalog(this.tower, this.babylon.scene)
	warehouse = new Warehouse(
		this.tower,
		this.watch,
		this.#app,
		this.babylon.scene,
		this.actions,
	)

	shockdrop = new Shockdrop({
		element: document.documentElement,
		highlight_attribute: "data-drop-highlight",
		handle_file_drop: files => {
			for (const file of files)
				this.warehouse.add_glb_file(file)
		},
	})

	// instantiator = new Instantiator(
	// 	this.watch,
	// 	this.#app,
	// 	this.babylon,
	// 	// this.catalog,
	// )

	tactic = new Tactic({
		tower: this.tower,
		devices: [new Tactic.Keyboard(window)],
		bindings: {
			buttons: {
				select: "LMB",
				forward: "KeyW",
				backward: "KeyS",
				leftward: "KeyA",
				rightward: "KeyD",
			},
			vectors: {
				look: "mouse",
			},
		},
	})
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

