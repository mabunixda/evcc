<template>
	<svg :style="svgStyle" viewBox="-40 -40 400 400">
		<g>
			<path
				fill="currentColor"
				d="M7.1,180.6v117.1c0,8.4,6.8,15.3,15.3,15.3H142C141,239.8,80.9,180.7,7.1,180.6z"
			/>
			<path
				fill="currentColor"
				d="M7.1,84.1v49.8c99,0.9,179.4,80.7,180.4,179.1h51.7C238.2,186.6,134.5,84.2,7.1,84.1z"
			/>
			<path
				fill="currentColor"
				d="M312.9,297.6V193.5C278.1,107.2,207.3,38.9,119,7.1H22.4c-8.4,0-15.3,6.8-15.3,15.3v15
			c152.6,0.9,276.6,124,277.6,275.6h13C306.1,312.9,312.9,306.1,312.9,297.6z"
			/>
			<path
				fill="currentColor"
				d="M272.6,49.8c14.5,14.4,28.6,31.7,40.4,47.8V22.4c0-8.4-6.8-15.3-15.3-15.3h-77.3
			C238.4,19.7,256.6,33.9,272.6,49.8z"
			/>
		</g>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import icon from "@/mixins/icon";

export default defineComponent({
	name: "Mqtt",
	mixins: [icon],
});
</script>
