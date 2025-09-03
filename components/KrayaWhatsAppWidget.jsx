import { useEffect } from "react";

const KrayaWhatsAppWidget = () => {
  useEffect(() => {
    // Set the widget config
    window.chatWidgetConfig = {
      whatsappNumber: "918889993194",
      welcomeMessage: "Hey 👋,\nHow can we help you?",
      buttonText: "Chat on Whatsapp",
      profileName: "Kraya AI",
      profileImageUrl: "https://api.kraya-ai.com/images/kraya-logo.png",
      appUrl: "https://api.kraya-ai.com"
    };

    // Create and append the script
    const script = document.createElement("script");
    script.src = "https://api.kraya-ai.com/widget/chat.js?v=1755854752104";
    script.async = true;
    document.head.appendChild(script);

    // Cleanup: remove script on unmount
    return () => {
      document.head.removeChild(script);
      // Optionally, remove the widget if it adds DOM nodes
      // e.g., document.getElementById('kraya-whatsapp-widget')?.remove();
    };
  }, []);

  return null; // This widget does not render any visible React elements
};

export default KrayaWhatsAppWidget;