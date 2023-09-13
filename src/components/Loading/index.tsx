import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div>
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        </div>
    );
}

Loading.displayName = "Loading";
