
import {ActionRecord} from "./action_record.js"
import {StateTree, ZipAction, ob} from "@benev/slate"

export function history_actualize<S, B extends ZipAction.Blueprint<S>>({
		tree,
		blueprint,
		save_snapshot,
		proceed,
	}: {
		tree: StateTree<S>
		blueprint: B
		save_snapshot: () => void
		proceed: (action: ActionRecord) => void
	}): ZipAction.Callable<B> {

	let action_count = 1

	function recurse(specs: ZipAction.Blueprint<S>, purpose: string[]): any {
		return ob.map(specs, (spec, name) => (

			(typeof spec === "function")

				? (...params: any[]) => {
					const action = {
						id: action_count++,
						purpose: [...purpose, name as string],
						params,
						time: Date.now(),
					} satisfies ActionRecord

					tree.transmute(state => {
						save_snapshot()
						const setState = (newState: S) => { state = newState }
						spec(state, setState)(...params)
						return state
					})

					proceed(action)
				}

				: recurse(spec, [...purpose, name as string])
		))
	}

	return recurse(blueprint, [])
}

