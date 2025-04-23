import foodSvg from "../assets/food.svg"
import othersSvg from "../assets/others.svg"
import transportSvg from "../assets/transport.svg"
import accommodationSvg from "../assets/accommodation.svg"
import servicesSvg from "../assets/services.svg"


export const CATEGORIES = {
    FOOD: {
        icon: foodSvg,
        name: "Alimentação",
    },
    OTHERS: {
        icon: othersSvg,
        name: "Outros",
    },
    TRANSPORT: {
        icon: transportSvg,
        name: "Transporte",
    },
    ACCOMMODATION: {
        icon: accommodationSvg,
        name: "Hospedagem",
    },
    SERVICES: {
        icon: servicesSvg,
        name: "Serviços",
    },
}


export const CATEGORIES_KEY = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>
