import Alert from "sweetalert2";

export const triggerAlert = (title, description, alertType) => { 
    Alert.fire(title, description, alertType);
};


