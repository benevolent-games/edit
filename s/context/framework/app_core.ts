
import {Historian} from "./historian.js"
import {StateTree, ZipAction, watch} from "@benev/slate"

export class AppCore<S, BP extends ZipAction.Blueprint<S>> {
	#tree: StateTree<S>
	#historian: Historian<S, BP>

	get state() { return this.#tree.state }
	get history() { return this.#historian.history }
	get actions() { return this.#historian.actions }

	constructor(params: {
			initial_state: S
			actions_blueprint: BP
			history_limit: number
		}) {

		this.#tree = watch.stateTree(params.initial_state)

		this.#historian = new Historian(
			this.#tree,
			params.actions_blueprint,
			params.history_limit,
		)
	}
}

