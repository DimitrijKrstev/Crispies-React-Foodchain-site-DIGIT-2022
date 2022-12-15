import { getDoc, doc } from "firebase/firestore";
import { db } from "./index";

export async function getFromFS(rawCartObj, setCart) {
    const newCart = {};
    for(let menuItemId in rawCartObj) {
        const item = await getDoc(doc(db,"menuItems",menuItemId));
        const cartEntry = item.data();
        // console.log(cartEntry);
        newCart[menuItemId] = {
            name: cartEntry.name,
            quantity: rawCartObj[menuItemId],
            picture: cartEntry.picture,
            priceEach: cartEntry.price
        }
        // console.log("New cart: ", newCart);
    }
    setCart(newCart);
}
