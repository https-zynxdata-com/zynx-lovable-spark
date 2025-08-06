
import React from 'react';
import ZynxDeejaPlatform from "@/components/ZynxDeejaPlatform";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

const Index: React.FC = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="h-8 w-px bg-border opacity-50"></div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Zynx
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">AGI Platform</p>
              </div>
            </div>
            {user && (
              <span className="text-sm text-muted-foreground ml-4">
                Welcome, {user.email}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <ZynxDeejaPlatform />
    </div>
  );
};

export default Index;
