
import {StateTree} from "@benev/slate"

import {Annals} from "./annals.js"
import {Historian} from "../historian.js"

export class History<S> {
	#annals: StateTree<Annals<S>>
	#historian: Historian<S, any>

	constructor(
			annals: StateTree<Annals<S>>,
			historian: Historian<S, any>,
		) {
		this.#annals = annals
		this.#historian = historian
	}

	get annals() {
		return this.#annals.state
	}

	undo() {
		this.#historian.undo()
	}

	redo() {
		this.#historian.redo()
	}
}

