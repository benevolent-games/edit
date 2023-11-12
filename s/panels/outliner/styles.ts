
import {css} from "@benev/slate"
import {standard_panel_styles} from "../standard_panel_styles.js"

export const styles = css`

${standard_panel_styles}

:host {
	overflow-y: auto;
	--line-height: 1.5em;
}

ol {
	width: 100%;
	min-height: 100%;
	list-style: none;
	user-select: none;
	container-type: inline-size;
}

li {
	position: relative;
	z-index: 0;
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;
	width: 100%;
	gap: 0.2em;
	padding: 0 0.5em;
	overflow: hidden;

	&:nth-child(odd) {
		background: #88888808;
	}

	&:hover {
		background: #8881;
	}

	&[data-not-apparent] {
		opacity: 0.3;
	}

	&[data-selected]::before {
		content: "";
		display: block;
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: color-mix(in srgb, var(--alpha) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--alpha) 30%, transparent);
	}

	&[data-selected] + [data-selected]::before {
		border-top: 0;
	}

	> * {
		flex: 0 0 auto;
	}

	& .dropzone {
		z-index: 1;
		opacity: 0.5;
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;

		> * {
			flex: 1 1 auto;
			width: 100%;
			height: 100%;
		}

		--drag-bg: color-mix(in srgb, var(--bravo) 30%, transparent);

		&[data-drag-hover][data-drag-mode="above"] {
			border-top: 2px solid var(--bravo);
			background: linear-gradient(
				to bottom,
				var(--drag-bg),
				transparent
			);
		}

		&[data-drag-hover][data-drag-mode="into"] {
			border: 2px solid var(--bravo);
			background: var(--drag-bg);
		}

		&[data-drag-hover][data-drag-mode="below"] {
			border-bottom: 2px solid var(--bravo);
			background: linear-gradient(
				to bottom,
				transparent,
				var(--drag-bg)
			);
		}
	}

	& .gutter-group {
		flex: 0 0 auto;
		display: flex;
		justify-content: start;
		overflow: hidden;

		& .gutter {
			flex: 0 0 auto;
			width: 0.5em;
			margin-left: 0.5em;
			height: var(--line-height);
			border-left: 1px solid #fff2;
			transition: all 200ms linear;
		}
	}

	& .gripbox {
		flex: 1 1 auto;
		display: flex;
		gap: 0.2em;
		overflow: hidden;
	}

	& :is(button, .icon) {
		flex: 0 0 auto;
		opacity: 0.5;
		display: flex;
		place-content: center;
		place-items: center;

		&:is(button) {
			&:hover { opacity: 0.9; }
			&:active { opacity: 1; }
			&.delete:hover { color: red; }
		}

		> svg {
			display: block;
			width: 1em;
			height: 1em;
		}
	}

	& .name {
		flex: 1 1 auto;
		word-break: break-all;
		line-height: var(--line-height);

		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	& .childcount {
		opacity: 0.5;
		font-size: 0.8em;
		font-family: monospace;
		margin-right: 1em;
	}

	& .id {
		opacity: 0.5;
		font-size: 0.6em;
		font-family: monospace;
	}

	& .spacer {
		width: 1em;
		height: 1em;
	}
}

@container (width < 24em) {
	[data-unnecessary] {
		display: none;
	}

	li {
		& .gutter-group {
			& .gutter {
				width: 0.1em;
				margin-left: 0.1em;
			}
		}
	}
}

`

