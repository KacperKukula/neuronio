export function useDynamicPositioning() {
    function getElementHeight(selector: string) {

        if(!selector) throw Error('❌💀 Selector not defined')

        const element = document.querySelector(selector)

        if(!element) throw Error('❌ Element quered by selector not found')

        const bRect = element.getBoundingClientRect()
        
        return bRect.height;
    }

    return {
        getElementHeight
    }
}