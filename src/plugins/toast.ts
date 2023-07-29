import { createApp } from "vue";
import Toast, {useToast} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const options = {
    // You can set your default options here
};

export default function initToast (app) {
    app.use(Toast, options);

    const toast = useToast();
    app.config.globalProperties.$toast = toast;
}