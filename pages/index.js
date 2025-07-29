import React, { useEffect, useState, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import Home from "./home/Home";

const HomePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this runs only on the client
  }, []);

  if (!isClient) return null; // Prevents server-side errors

  return (
    <HelmetProvider>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
