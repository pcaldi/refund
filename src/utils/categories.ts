import foodSvg from "../assets/food.svg"
import othersSvg from "../assets/others.svg"
import transportSvg from "../assets/transport.svg"
import accommodationSvg from "../assets/accommodation.svg"
import servicesSvg from "../assets/services.svg"


export const CATEGORIES = {
    food: {
        icon: foodSvg,
        name: "Alimentação",
    },
    others: {
        icon: othersSvg,
        name: "Outros",
    },
    transport: {
        icon: transportSvg,
        name: "Transporte",
    },
    accommodation: {
        icon: accommodationSvg,
        name: "Hospedagem",
    },
    services: {
        icon: servicesSvg,
        name: "Serviços",
    },
}


export const CATEGORIES_KEY = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>
