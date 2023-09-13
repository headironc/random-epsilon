export default function Error({ message }: { message: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div>{message}</div>
        </div>
    );
}
