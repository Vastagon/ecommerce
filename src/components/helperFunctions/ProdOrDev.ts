export function prodOrDev() {
    const env = process.env.NODE_ENV;

    if (env == "development") {
        return "http://localhost:3000";
    }
    else if (env == "production") {
        return "https://ecommerce-rho-wine.vercel.app";
    }
}