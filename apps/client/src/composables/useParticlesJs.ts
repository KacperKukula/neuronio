export function useParticleJs() {

    /**
     * Gets main function for particleJS from window
     * @returns Function particlesJs - if there is so
     * @returns null - if something went wrong
     */
    function getParticlesJsFunction(): Function|null {
        return (typeof window !== 'undefined' && (window as any).particlesJS) ? (window as any).particlesJS : null;
    }

    return { getParticlesJsFunction }
}