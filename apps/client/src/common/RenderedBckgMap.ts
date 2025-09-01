import { Background } from "./models/Background";

import GradientBckg from "@/components/Backgrounds/variants/GradientBckg.vue";
import NetBckg from "@/components/Backgrounds/variants/NetBckg.vue";

export const renderedBckgMap = [
    new Background('gradient', GradientBckg),
    new Background('dense-net', NetBckg)
]