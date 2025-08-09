export function useFollowings() {
    function initCursorlight(container: HTMLElement, light: HTMLElement) {
        if (!container || !light) {
            console.error("You need to provide a container and light element");
            return;
        }

        light.style.position = "absolute";
        light.style.opacity = "0";
        light.style.pointerEvents = "none";

        const handleMouseEnter = () => {
            light.style.opacity = "0.1";
        };

        const handleMouseLeave = () => {
            light.style.opacity = "0";
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - light.offsetWidth / 2;
            const y = e.clientY - rect.top - light.offsetHeight / 2;
            light.style.left = `${x}px`;
            light.style.top = `${y}px`;
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }

    return {
        initCursorlight
    };
}