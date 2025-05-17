
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-pregbuddy-light/50">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-pregbuddy-dark mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! This page doesn't exist
        </p>
        <p className="text-gray-500 mb-8">
          The page you're looking for cannot be found
        </p>
        <Link to="/">
          <Button className="pregbuddy-button">
            Return Home
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-pregbuddy-primary/20 p-4 bg-white">
          <p className="text-center text-gray-600 text-sm">
            If you think this is an error, please contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
